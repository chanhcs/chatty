import type { Conversation } from "@/types/chat";
import GroupChatCard from "./GroupChatCard";

interface GroupChatListProps {
    groupChats: Conversation[];
}

const GroupChatList = ({ groupChats }: GroupChatListProps) => {
    return (
        <>
            {groupChats.map((convo) => (
                <GroupChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default GroupChatList;