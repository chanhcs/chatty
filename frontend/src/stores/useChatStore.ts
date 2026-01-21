import { chatService } from "@/services/chatServices";
import type { ChatState } from "@/types/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            convoloading: false,
            messageLoading: false,
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
            fetchConversation: async () => {
                try {
                    set({ convoloading: true })
                    const { conversations } = await chatService.fetchConversations()
                    set({ conversations })
                } catch (error) {
                    console.error(error)
                } finally {
                    set({ convoloading: false })
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
                } finally {
                    set({ messageLoading: false });
                }
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        }
    )
);
