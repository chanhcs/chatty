import type { Conversation } from "@/types/chat";
import ChatCard from "../components/ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore()
    const { activeConversationId, setActiveConversation, messages } = useChatStore()
    if (!user) return null;
    const name = convo.group?.name ?? "";
    const unreadCount = convo.unreadCounts[user._id];
    const handleSelectConvo = (id: string) => {
        setActiveConversation(id)
    }
    return (
        <ChatCard
            convoId={convo._id}
            name={name}
            timestamp={
                convo.lastMessage?.createdAt
                    ? new Date(convo.lastMessage.createdAt)
                    : undefined
            }
            isActive={activeConversationId === convo._id}
            unreadCount={unreadCount}
            onSelect={handleSelectConvo}
            leftSection={
                <div>Avatar</div>
            }
            subtitle={
                <p className="text-sm truncate text-muted-foreground">{convo.participants.length} members</p>
            }
        />
    );
};

export default GroupChatCard;