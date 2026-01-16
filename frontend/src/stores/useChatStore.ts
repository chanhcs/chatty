import { chatService } from "@/services/chatServices";
import type { ChatState } from "@/types/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,
            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    loading: false,
                });
            },
            fetchConversation: async () => {
                try {
                    set({loading: true})
                    const { conversations } = await chatService.fetchConversations()
                    set({ conversations })
                } catch (error) {
                    console.error(error)
                } finally {
                    set({loading: false})
                }
            },
            fetchMessage: async () => {
                
            }
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        }
    )
);
