import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";
import EmptyState from "@/components/empty/EmptyState";

const GroupChatList = () => {
    const { conversations } = useChatStore()
    if (!conversations) return null;
    const groupChats = conversations.filter(convo => convo.type === 'group')
    if (groupChats?.length === 0) {
        return <EmptyState message="No group chats yet" />
    }
    return (
        <>
            {groupChats.map((convo) => (
                <GroupChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default GroupChatList;