import type { Conversation } from "@/types/chat";
import DirectChatCard from "./DirectChatCard";

interface DirectChatListProps {
    directChats: Conversation[];
}

const DirectChatList = ({ directChats }: DirectChatListProps) => {
    return (
        <>
            {directChats.map((convo) => (
                <DirectChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default DirectChatList;