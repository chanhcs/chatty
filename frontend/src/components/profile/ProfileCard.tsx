import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useSocketStore } from "@/stores/useSocketStore";
import ChatAvatar from "../chat/components/ChatAvatar";
import type { User } from "@/types/store";
import AvatarUpload from "./AvatarUpload";

interface ProfileCardProps {
    user: User | null;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
    const { onlineUsers } = useSocketStore();
    if (!user) return;

    if (!user) return null;

    const bio = user.bio ?? "☕ Coffee → 💻 Code → Repeat ";

    const isOnline = onlineUsers.includes(user._id) ? true : false;

    return (
        <Card className="overflow-hidden p-0 h-48 bg-linear-to-r from-green-500 via-emerald-500 to-pink-500">
            <CardContent className="mt-15 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <div className="relative">
                    <ChatAvatar
                        type="direct"
                        mode="profile"
                        name={user.displayName}
                        avatarUrl={user.avatarUrl ?? undefined}
                        className="ring-4 ring-white shadow-lg"
                    />
                    <AvatarUpload />
                </div>

                {/* user info */}
                <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        {user.displayName}
                    </h1>

                    {bio && (
                        <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">
                            {bio}
                        </p>
                    )}
                </div>

                {/* status */}
                <Badge
                    className={cn(
                        "flex items-center gap-1 capitalize",
                        isOnline ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                    )}
                >
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            isOnline ? "bg-green-500 animate-pulse" : "bg-slate-500"
                        )}
                    />

                    {isOnline ? "online" : "offline"}
                </Badge>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;