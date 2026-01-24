import api from "@/lib/axios";
import type { ConversationResponse, MessageResponse, SendDirectMessage, SendGroupMessage } from "@/types/chat";

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

  async sendDirectMessage(data: SendDirectMessage) {
    const res = await api.post('/messages/direct', data)
      return res.data.message;
  },

  async sendGroupMessage(data: SendGroupMessage) {
    const res = await api.post('/messages/group', data);
    return res.data.message;
  }
};

