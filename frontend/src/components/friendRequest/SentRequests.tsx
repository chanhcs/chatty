import FriendRequestItem from "@/components/friendRequest/FriendRequestItem";
import { useFriendStore } from "@/stores/useFriendStore";
import EmptyRequest from "./EmptyRequest";

const SentRequests = () => {
    const sentList = useFriendStore(state => state.sentList);

    if (!sentList || sentList.length === 0) {
        return <EmptyRequest message="No friend requests sent yet" />
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