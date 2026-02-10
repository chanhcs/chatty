import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            convoloading: false,
            messageLoading: false,
            loading: false,
            setActiveConversation: (id) => set({ activeConversationId: id }),

            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    convoloading: false,
                    messageLoading: false,
                });
            },

            fetchConversations: async () => {
                try {
                    set({ convoloading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversations });
                } catch (error) {
                    console.error(error);
                } finally {
                    set({ convoloading: false });
                }
            },

            fetchMessages: async (conversationId?: string) => {
                const { activeConversationId, messages } = get();
                const { user } = useAuthStore.getState();

                const convoId = conversationId ?? activeConversationId;
                if (!convoId) return;

                const current = messages[convoId];

                const nextCursor =
                    current?.nextCursor === undefined ? "" : current?.nextCursor;

                if (nextCursor === null) return;

                if (!current) {
                    set((state) => ({
                        messages: {
                            ...state.messages,
                            [convoId]: {
                                items: [],
                                nextCursor: "",
                                hasMore: true,
                            },
                        },
                    }));
                }

                set({ messageLoading: true });

                try {
                    const { messages: fetched, cursor } =
                        await chatService.fetchMessages(convoId, nextCursor);

                    const processed = fetched.map((m) => ({
                        ...m,
                        isOwn: m.senderId === user?._id,
                    }));

                    set((state) => {
                        const prevItems = state.messages[convoId]?.items ?? [];

                        return {
                            messages: {
                                ...state.messages,
                                [convoId]: {
                                    items: [...processed, ...prevItems],
                                    nextCursor: cursor ?? null,
                                    hasMore: Boolean(cursor),
                                },
                            },
                        };
                    });
                } catch (error) {
                    console.error("Error fetch messages:", error);
                    set((state) => ({
                        messages: {
                            ...state.messages,
                            [convoId]: {
                                ...state.messages[convoId],
                            },
                        },
                    }));
                } finally {
                    set({ messageLoading: false });
                }
            },

            sendDirectMessage: async (data) => {
                try {
                    const { activeConversationId } = get();
                    await chatService.sendDirectMessage({
                        ...data,
                        conversationId: activeConversationId || undefined,
                    });

                    set((state) => ({
                        conversations: state.conversations.map((convo) =>
                            convo._id === activeConversationId
                                ? { ...convo, seenBy: [] }
                                : convo
                        ),
                    }));
                } catch (error) {
                    console.error("Error send direct message:", error);
                }
            },

            sendGroupMessage: async (data) => {
                try {
                    const { activeConversationId } = get();
                    await chatService.sendGroupMessage(data);

                    set((state) => ({
                        conversations: state.conversations.map((convo) =>
                            convo._id === activeConversationId
                                ? { ...convo, seenBy: [] }
                                : convo
                        ),
                    }));
                } catch (error) {
                    console.error("Error send group message:", error);
                }
            },

            addMessage: async (message) => {
                try {
                    const { user } = useAuthStore.getState();
                    const { fetchMessages } = get();

                    message.isOwn = message.senderId === user?._id;
                    const convoId = message.conversationId;

                    let prevItems = get().messages[convoId]?.items ?? [];

                    if (prevItems.length === 0) {
                        await fetchMessages(convoId);
                        prevItems = get().messages[convoId]?.items ?? [];
                    }

                    set((state) => {
                        if (prevItems.some((m) => m._id === message._id)) {
                            return state;
                        }

                        return {
                            messages: {
                                ...state.messages,
                                [convoId]: {
                                    items: [...prevItems, message],
                                    hasMore: state.messages[convoId]?.hasMore ?? false,
                                    nextCursor:
                                        state.messages[convoId]?.nextCursor ?? undefined,
                                },
                            },
                        };
                    });
                } catch (error) {
                    console.error("Error add message:", error);
                }
            },

            updateConversation: (conversation) => {
                set((state) => ({
                    conversations: state.conversations.map((c) =>
                        c._id === conversation._id ? { ...c, ...conversation } : c
                    ),
                }));
            },

            markAsSeen: async () => {
                try {
                    const { user } = useAuthStore.getState();
                    const { activeConversationId, conversations } = get();

                    if (!activeConversationId || !user) return;

                    const convo = conversations.find(
                        (c) => c._id === activeConversationId
                    );

                    if (!convo) return;

                    if ((convo.unreadCounts?.[user._id] ?? 0) === 0) return;

                    await chatService.markAsSeen(activeConversationId);

                    set((state) => ({
                        conversations: state.conversations.map((c) =>
                            c._id === activeConversationId && c.lastMessage
                                ? {
                                    ...c,
                                    unreadCounts: {
                                        ...c.unreadCounts,
                                        [user._id]: 0,
                                    },
                                }
                                : c
                        ),
                    }));
                } catch (error) {
                    console.error(
                        "Failed to call markAsSeen in the store",
                        error
                    );
                }
            },

            addConvo: (convo) => {
                set((state) => {
                    const exists = state.conversations.some(
                        (c) => c._id.toString() === convo._id.toString()
                    );

                    return {
                        conversations: exists
                            ? state.conversations
                            : [convo, ...state.conversations],
                        activeConversationId: convo._id,
                    };
                });
            },
            createConversation: async (type, name, memberIds) => {
                try {
                    set({loading: true})
                    const conversation = await chatService.createConversation(
                        type,
                        name,
                        memberIds
                    );

                    get().addConvo(conversation);

                    useSocketStore
                        .getState()
                        .socket?.emit("join-conversation", conversation._id);
                } catch (error) {
                    console.error("Error create conversation", error);
                } finally {
                    set({loading: false})
                }
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        }
    )
);
