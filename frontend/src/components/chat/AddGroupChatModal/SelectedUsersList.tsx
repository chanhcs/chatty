import ChatAvatar from "@/components/chat/components/ChatAvatar";
import type { Friend } from "@/types/store";
import { X } from "lucide-react";

interface SelectedUsersListProps {
    invitedUsers: Friend[];
    onRemove: (user: Friend) => void;
}

const SelectedUsersList = ({ invitedUsers, onRemove }: SelectedUsersListProps) => {
    return (
        <div className="flex flex-wrap gap-2 pt-2">
            {invitedUsers.map((user) => (
                <div
                    key={user._id}
                    className="flex items-center gap-1 bg-muted text-sm rounded-full px-3 py-1"
                >
                    <ChatAvatar
                        type="direct"
                        mode="chat"
                        name={user.displayName}
                        avatarUrl={user.avatarUrl}
                    />
                    <span>{user.displayName}</span>
                    <X
                        className="size-3 cursor-pointer hover:text-destructive"
                        onClick={() => onRemove(user)}
                    />
                </div>
            ))}
        </div>
    )
};

export default SelectedUsersList;