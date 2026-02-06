import { useFriendStore } from "@/stores/useFriendStore";
import { Card } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";

const FriendList = () => {
    const { getFriends } = useFriendStore();

    const handleGetFriends = async () => {
        await getFriends();
    };

    return (
        <div className="flex gap-2 mt-4">
            <Card
                className="flex-1 p-2.5 glass hover:shadow-soft transition-smooth cursor-pointer group/card"
                onClick={handleGetFriends}
            >
                <Dialog>
                    <DialogTrigger>
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className="size-8 bg-gradient-chat rounded-full flex items-center justify-center group-hover/card:scale-110 transition-bounce">
                                <img src="/friends.svg" alt='friends' width={20} height={20} />
                            </div>
                            <span className="text-sm font-medium capitalize">
                                Friends
                            </span>
                        </div>
                    </DialogTrigger>
                </Dialog>
            </Card>
        </div>
    );
};

export default FriendList;