import api from "@/lib/axios";
import type { ConversationResponse, MessageResponse } from "@/types/chat";

const PAGE_LIMIT = 50;


export const chatService = {
  async fetchConversations(): Promise<ConversationResponse> {
    const res = await api.get<ConversationResponse>("/conversations");
    return res.data;
  },

  async fetchMessages(id: string, cursor?: string): Promise<MessageResponse> {
    const res = await api.get(
      `/conversations/${id}/messages?limit=${PAGE_LIMIT}&cursor=${cursor}`
    );
    return { messages: res.data.messages, cursor: res.data.nextCursor };
  },
};

