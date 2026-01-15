import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "../components/ChatCard";
import { cn } from "@/lib/utils";
import CoreAvatar from "../components/CoreAvatar";
import { StatusBadge } from "../components/StatusBadge";
import UnreadCountBadge from "../components/UnreadCountBadge";

const DirectChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore()
    const { activeConversationId, setActiveConversation, messages } = useChatStore()
    if (!user) return null;
    const otherUser = convo.participants.find(p => p._id !== user._id)
    if (!otherUser) return null;
    const unreadCount = convo.unreadCounts[user._id]
    const lastMessage = convo.lastMessage?.content ?? ""

    const handleSelectConvo = async (id: string) => {
        setActiveConversation(id)
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
                    <CoreAvatar
                        name={otherUser.displayName}
                        avatarUrl=""
                        type="sidebar"
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