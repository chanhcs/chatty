import { useChatStore } from "@/stores/useChatStore";
import DirectChatCard from "./DirectChatCard";

const DirectChatList = () => {
    const { conversations } = useChatStore()
    if (!conversations) return null;
    const directChats = conversations.filter(convo => convo.type === 'direct')
    return (
        <div className="flex-1 p-2 space-y-2">
            {
                directChats.map((convo) => (
                    <DirectChatCard key={convo._id} convo={convo} />
                ))
            }
        </div>
    );
};

export default DirectChatList;