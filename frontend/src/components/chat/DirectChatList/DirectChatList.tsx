import { useChatStore } from "@/stores/useChatStore";
import DirectChatCard from "./DirectChatCard";

const DirectChatList = () => {
    const { conversations } = useChatStore()
    if (!conversations) return null;
    const directChats = conversations.filter(convo => convo.type === 'direct')

    return (
        <>
            {directChats.map((convo) => (
                <DirectChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default DirectChatList;