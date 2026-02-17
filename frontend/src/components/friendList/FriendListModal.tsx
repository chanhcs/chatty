import { useFriendStore } from "@/stores/useFriendStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Users } from "lucide-react";
import { Card } from "../ui/card";
import { useChatStore } from "@/stores/useChatStore";
import ChatAvatar from "@/components/chat/components/ChatAvatar";

interface FriendListModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FriendListModal = ({ setIsOpen }: FriendListModalProps) => {
    const { friends } = useFriendStore();
    const { onlineUsers } = useSocketStore();
    const { createConversation } = useChatStore();

    const handleAddConversation = async (friendId: string) => {
        await createConversation("direct", "", [friendId]);
        setIsOpen(false)
    };

    return (
        <DialogContent className="glass max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center text-xl gap-2">
                    <img src="/conversation.svg" alt="conversation" width={25} height={25} />
                    <span>Start a new conversation</span>
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
                {friends.length > 0 &&
                    (<div className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        Friends
                    </div>)}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {friends.map((friend) => (
                        <Card
                            onClick={() => handleAddConversation(friend._id)}
                            key={friend._id}
                            className="p-3 cursor-pointer transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <ChatAvatar
                                        mode="sidebar"
                                        type="direct"
                                        name={friend.displayName}
                                        avatarUrl={friend.avatarUrl}
                                    />
                                    {/* online indicator */}
                                    {onlineUsers && onlineUsers.includes(friend._id) ? (
                                        <span className="absolute bottom-0 right-0 size-3 rounded-full ring-1 ring-white bg-green-500 animate-pulse" />
                                    ) : (
                                        <span className="absolute bottom-0 right-0 size-3 rounded-full ring-1 ring-white bg-slate-400" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col">
                                    <h2 className="font-semibold text-sm truncate">
                                        {friend.displayName}
                                    </h2>
                                    <span className="text-sm text-muted-foreground">
                                        @{friend.username}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {friends.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <Users className="size-12 mx-auto mb-3 opacity-50" />
                            No friends yet. Add some friends!
                        </div>
                    )}
                </div>
            </div>
        </DialogContent>
    );
};

export default FriendListModal;