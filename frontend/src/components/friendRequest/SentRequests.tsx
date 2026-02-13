import FriendRequestItem from "@/components/friendRequest/FriendRequestItem";
import { useFriendStore } from "@/stores/useFriendStore";
import EmptyState from "../empty/EmptyState";

const SentRequests = () => {
    const sentList = useFriendStore(state => state.sentList);

    if (!sentList || sentList.length === 0) {
        return <EmptyState message="No friend requests sent yet" image />
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