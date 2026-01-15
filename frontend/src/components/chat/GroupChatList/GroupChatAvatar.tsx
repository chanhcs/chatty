import type { Participant } from "@/types/chat";
import { cn } from "@/lib/utils";
import CoreAvatar from "../components/CoreAvatar";

interface GroupChatAvatarProps {
    type: "sidebar" | "chat",
    participants: Participant[]
}

const LIMIT = 3

const GroupChatAvatar = ({ participants, type }: GroupChatAvatarProps) => {
    const items = participants.slice(0, LIMIT);
    const isStacked = items.length === LIMIT;

    return (
        <div
            className={cn(
                "relative",
                isStacked
                    ? "h-12 w-12"
                    : "flex -space-x-2"
            )}
        >
            {items.map((member, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute",
                        !isStacked && "static",
                        isStacked && index === 0 && "top-0 left-1/2 -translate-x-1/2 z-20",
                        isStacked && index === 1 && "bottom-0 left-0 z-10",
                        isStacked && index === 2 && "bottom-0 right-0 z-10"
                    )}
                >
                    <CoreAvatar
                        type={type}
                        name={member.displayName}
                        avatarUrl={member.avatarUrl ?? ""}
                        className={cn(
                            "ring-1 ring-background",
                            isStacked ? "size-7" : "size-8"
                        )}
                    />
                </div>
            ))}
        </div>
    );
};

export default GroupChatAvatar;