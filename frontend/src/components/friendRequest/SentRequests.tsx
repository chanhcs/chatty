import FriendRequestItem from "@/components/friendRequest/FriendRequestItem";
import { useFriendStore } from "@/stores/useFriendStore";

const SentRequests = () => {
    const sentList = useFriendStore(state => state.sentList);

    if (!sentList || sentList.length === 0) {
        return (
            <p className="text-center text-sm text-muted-foreground">
                No friend requests yet.
            </p>
        );
    }

    return (
        <div className="space-y-3 mt-4">
            <>
                {sentList.map((req) => (
                    <FriendRequestItem
                        key={req._id}
                        requestInfo={req}
                        type="sent"
                        actions={
                            <p className="text-muted-foreground text-sm">Waiting for response...</p>
                        }
                    />
                ))}
            </>
        </div>
    );
};

export default SentRequests;