import { Card } from "@/components/ui/card";
import { formatOnlineTime, cn } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react";

interface ChatCardProps {
    convoId: string;
    name: string;
    timestamp?: Date;
    isActive: boolean;
    onSelect: (id: string) => void;
    unreadCount?: number;
    leftSection: React.ReactNode;
    subtitle: React.ReactNode;
}

const ChatCard = ({
    convoId,
    name,
    timestamp,
    isActive,
    onSelect,
    unreadCount,
    leftSection,
    subtitle,
}: ChatCardProps) => {
    return (
        <Card
            key={convoId}
            className={cn("px-4 py-2.5 border-none border-b-0 shadow-none mb-0 cursor-pointer transition-smooth hover:bg-muted/30",
                isActive && "bg-card-hover"
            )}
            onClick={() => onSelect(convoId)}
        >
            <div className="flex items-center gap-3">
                <div className="relative">{leftSection}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <p className={cn(
                            "text-sm font-semibold truncate",
                            unreadCount && unreadCount > 0 && "text-foreground"
                        )}>
                            {name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                            {timestamp ? formatOnlineTime(timestamp) : ""}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-1 min-w-0">{subtitle}</div>
                        <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 hover:size-5 transition-smooth" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ChatCard;