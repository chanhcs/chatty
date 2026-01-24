export interface Participant {
  _id: string;
  displayName: string;
  avatarUrl?: string | null;
  joinedAt: string;
}

export interface SeenUser {
  _id: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface Group {
  name: string;
  createdBy: string;
}

export interface LastMessage {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  group: Group;
  participants: Participant[];
  lastMessageAt: string;
  seenBy: SeenUser[];
  lastMessage: LastMessage | null;
  unreadCounts: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  conversations: Conversation[];
}

export interface MessageResponse {
  messages: Message[];
  cursor?: string;
}


export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  imgUrl?: string | null;
  updatedAt?: string | null;
  createdAt: string;
  isOwn?: boolean;
}

export interface EmojiSelect {
    native: string;
}

export interface SendGroupMessage {
  conversationId?: string;
  content?: string;
  imgUrl?: string;
}

export interface SendDirectMessage extends SendGroupMessage {
  recipientId: string;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean; 
      nextCursor?: string | null;
    }
  >;
  activeConversationId: string | null;
  convoloading: boolean;
  messageLoading: boolean;
  reset: () => void;
  setActiveConversation: (id: string | null) => void;
  fetchConversation: () => Promise<void>;
  fetchMessages: (conversationId?: string) => Promise<void>;
  sendDirectMessage: (data: SendDirectMessage) => Promise<void>;
  sendGroupMessage: (data: SendGroupMessage) => Promise<void>;
}
