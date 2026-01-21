import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "../components/ChatCard";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../components/StatusBadge";
import UnreadCountBadge from "../components/UnreadCountBadge";
import ChatAvatar from "../components/ChatAvatar";

const DirectChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore()
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore()
    if (!user) return null;
    const otherUser = convo.participants.find(p => p._id !== user._id)
    if (!otherUser) return null;
    const unreadCount = convo.unreadCounts[user._id]
    const lastMessage = convo.lastMessage?.content ?? ""
    const handleSelectConvo = async (id: string) => {
        setActiveConversation(id)
        if (!messages[id]) {
            await fetchMessages()
        }
    }

    return (
        <ChatCard
            convoId={convo._id}
            name={otherUser.displayName}
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
                    <ChatAvatar
                        mode="sidebar"
                        type="direct"
                        name={otherUser.displayName}
                        avatarUrl=""
                    />
                    <StatusBadge status="online" />
                    {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
                </>
            }
            subtitle={
                <p className={cn("text-sm truncate",
                    unreadCount > 0
                        ? "font-medium text-foreground"
                        : "text-muted-foreground")}
                >
                    {lastMessage}
                </p>
            }
        />
    );
};

export default DirectChatCard;