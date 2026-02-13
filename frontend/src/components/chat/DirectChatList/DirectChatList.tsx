import { useChatStore } from "@/stores/useChatStore";
import DirectChatCard from "./DirectChatCard";
import EmptyState from "@/components/empty/EmptyState";

const DirectChatList = () => {
    const conversations = useChatStore(state => state.conversations)
    if (!conversations) return null;
    const directChats = conversations.filter(convo => convo.type === 'direct')
    if (directChats?.length === 0) {
        return <EmptyState message="No conversations yet" />
    }

    return (
        <>
            {directChats.map((convo) => (
                <DirectChatCard key={convo._id} convo={convo} />
            ))}
        </>
    );
};

export default DirectChatList;