import ChatAvatar from "@/components/chat/components/ChatAvatar";
import type { Friend } from "@/types/store";

interface IniviteSuggestionListProps {
    filteredFriends: Friend[],
    onSelect: (friend: Friend) => void;
}

const IniviteSuggestionList = ({ filteredFriends, onSelect }: IniviteSuggestionListProps) => {
    return (
        <div className="border rounded-lg mt-2 max-h-45 overflow-y-auto divide-y">
            {filteredFriends.map((friend) => (
                <div
                    key={friend._id}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-muted transition"
                    onClick={() => onSelect(friend)}
                >
                    <ChatAvatar
                        type="direct"
                        mode="chat"
                        name={friend.displayName}
                        avatarUrl={friend.avatarUrl}
                    />

                    <span className="font-medium">{friend.displayName}</span>
                </div>
            ))}
        </div>
    );
};

export default IniviteSuggestionList;