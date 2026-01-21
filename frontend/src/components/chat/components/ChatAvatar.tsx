import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Participant } from "@/types/chat";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("bg-blue-500", {
    variants: {
        mode: {
            sidebar: "size-12 text-base",
            chat: "size-8 text-sm",
            profile: "size-24 text-3xl shadow-md",
        },
    },
    defaultVariants: {
        mode: "sidebar",
    },
});

interface ChatAvatarProps
    extends VariantProps<typeof avatarVariants> {
    type: "direct" | "group";
    name?: string;
    avatarUrl?: string;
    participants?: Participant[];
    className?: string;
}

const LIMIT = 3;

const ChatAvatar = ({
    mode,
    name = "",
    avatarUrl = "",
    participants = [],
    type,
    className,
}: ChatAvatarProps) => {
    const hasAvatar = Boolean(avatarUrl);

    // =========================
    // DIRECT CHAT
    // =========================
    if (type === "direct") {
        return (
            <Avatar className={cn(avatarVariants({ mode }), className)}>
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback
                    className={cn(
                        "font-semibold uppercase text-white",
                        !hasAvatar && "bg-indigo-400"
                    )}
                >
                    {name.charAt(0)}
                </AvatarFallback>
            </Avatar>
        );
    }

    // =========================
    // GROUP CHAT
    // =========================
    const items = participants.slice(0, LIMIT);
    const isStacked = items.length === LIMIT;
    return (
        <div
            className={cn(
                "relative",
                isStacked ? "h-12 w-12" : "flex -space-x-2"
            )}
        >
            {items.map((member, index) => (
                <div
                    key={member._id}
                    className={cn(
                        "absolute",
                        !isStacked && "static",
                        isStacked && index === 0 && "top-0 left-1/2 -translate-x-1/2 z-20",
                        isStacked && index === 1 && "bottom-0 left-0 z-10",
                        isStacked && index === 2 && "bottom-0 right-0 z-10"
                    )}
                >
                    <Avatar
                        className={cn(
                            avatarVariants({ mode }),
                            "ring-1 ring-background",
                            isStacked ? "size-7" : "size-8"
                        )}
                    >
                        <AvatarImage
                            src={member.avatarUrl || ""}
                            alt={member.displayName}
                        />
                        <AvatarFallback className="font-semibold uppercase text-white bg-indigo-400">
                            {member.displayName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ))}
        </div>
    );
};

export default ChatAvatar;
