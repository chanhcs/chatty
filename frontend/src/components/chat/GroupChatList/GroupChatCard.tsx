import type { Conversation } from "@/types/chat";
import ChatCard from "../components/ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import UnreadCountBadge from "../components/UnreadCountBadge";
import ChatAvatar from "../components/ChatAvatar";

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore()
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore()
    if (!user) return null;
    const name = convo.group?.name ?? "";
    const unreadCount = convo.unreadCounts[user._id];
    const handleSelectConvo = async (id: string) => {
        setActiveConversation(id)
        if (!messages[id]) {
            await fetchMessages()
        }
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
                <>
                    {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
                    <ChatAvatar
                        mode="sidebar"
                        type="group"
                        participants={convo.participants}
                    />
                </>
            }
            subtitle={
                <p className="text-sm truncate text-muted-foreground">{convo.participants.length} members</p>
            }
        />
    );
};

export default GroupChatCard;