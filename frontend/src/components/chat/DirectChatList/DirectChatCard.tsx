import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "../components/ChatCard";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../components/StatusBadge";
import UnreadCountBadge from "../components/UnreadCountBadge";
import ChatAvatar from "../components/ChatAvatar";
import { useSocketStore } from "@/stores/useSocketStore";

const DirectChatCard = ({ convo }: { convo: Conversation }) => {
    const user = useAuthStore(state => state.user)
    const onlineUsers = useSocketStore(state => state.onlineUsers);
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore()
    if (!user) return null;
    const otherUser = convo.participants.find(p => p._id !== user._id)
    if (!otherUser) return null;
    const unreadCount = convo.unreadCounts[user._id]
    const lastMessage = convo.lastMessage?.content ?? ""
    const handleSelectConvo = (id: string) => {
        setActiveConversation(id)
        if (!messages[id]) {
            fetchMessages()
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
                        avatarUrl={otherUser.avatarUrl ?? ""}
                    />
                    <StatusBadge status={onlineUsers.includes(otherUser?._id ?? "") ? "online" : "offline"} />
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