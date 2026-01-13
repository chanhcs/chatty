import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
    const { conversations } = useChatStore()
    if (!conversations) return null;
    const groupChats = conversations.filter(convo => convo.type === 'group')
    return (
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {
                groupChats.map((convo) => (
                    <GroupChatCard
                        key={convo._id}
                        convo={convo}
                    />
                ))
            }
        </div>
    );
};

export default GroupChatList;