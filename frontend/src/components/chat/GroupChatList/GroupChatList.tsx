import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
    const { conversations } = useChatStore()
    if (!conversations) return null;
    const groupChats = conversations.filter(convo => convo.type === 'group')
    return (
        <>
            {groupChats.map((convo) => (
                <GroupChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default GroupChatList;