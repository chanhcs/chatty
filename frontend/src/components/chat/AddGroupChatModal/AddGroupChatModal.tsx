import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFriendStore } from '@/stores/useFriendStore';
import { Users, Search, X, UserPlus } from 'lucide-react';
import { useState } from 'react';
import type { Friend } from '@/types/store';
import IniviteSuggestionList from '@/components/chat/AddGroupChatModal/IniviteSuggestionList';
import SelectedUsersList from '@/components/chat/AddGroupChatModal/SelectedUsersList';
import { useChatStore } from '@/stores/useChatStore';
import { toast } from 'sonner';

const AddGroupChatModal = () => {
    const { friends, getFriends } = useFriendStore();
    const { loading, createConversation } = useChatStore();
    const [groupName, setGroupName] = useState("");
    const [search, setSearch] = useState("");
    const [invitedUsers, setInvitedUsers] = useState<Friend[]>([]);

    const filteredFriends = friends.filter(friend => {
        const isMatchedName = friend.displayName
            .toLowerCase()
            .includes(search.toLowerCase());

        const isInvited = invitedUsers.some(
            user => user._id === friend._id
        );

        return isMatchedName && !isInvited;
    });

    const handleGetFriends = async () => {
        await getFriends();
    };

    const handleSelectFriend = (friend: Friend) => {
        setInvitedUsers([...invitedUsers, friend]);
        setSearch("");
    };

    const handleRemoveFriend = (friend: Friend) => {
        const filteredInvitedUsers = invitedUsers.filter(user => user._id !== friend._id);
        setInvitedUsers(filteredInvitedUsers)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (invitedUsers.length === 0) {
                toast.warning("You must invite at least 1 member to the group");
                return;
            }

            await createConversation(
                "group",
                groupName,
                invitedUsers.map(user => user._id)
            );

            setSearch("");
            setInvitedUsers([]);
        } catch (error) {
            console.error("error create new group chat modal:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    onClick={handleGetFriends}
                    className="flex z-10 justify-center items-center size-5 rounded-full hover:bg-sidebar-accent transition cursor-pointer"
                >
                    <Users className="size-4" />
                    <span className="sr-only">Tạo nhóm</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="capitalize">Create new chat group</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-2">
                        <Label
                            htmlFor="groupName"
                            className="text-sm font-semibold"
                        >
                            Group name
                        </Label>
                        <Input
                            id="groupName"
                            placeholder="Type the group name here..."
                            className="glass border-border/50 focus:border-primary/50 transition-smooth"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="invite"
                            className="text-sm font-semibold"
                        >
                            Invite members
                        </Label>

                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                            />
                            <Input
                                id="invite"
                                placeholder="Search by display name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-9"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>

                        {search && filteredFriends.length > 0 &&
                            <IniviteSuggestionList
                                filteredFriends={filteredFriends}
                                onSelect={handleSelectFriend}
                            />}
                        {invitedUsers.length > 0 &&
                            <SelectedUsersList
                                invitedUsers={invitedUsers}
                                onRemove={handleRemoveFriend}
                            />}
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
                        >
                            {loading ? (
                                <span>Creating your group...</span>
                            ) : (
                                <>
                                    <UserPlus className="size-4 mr-2" />
                                    Create group
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddGroupChatModal;