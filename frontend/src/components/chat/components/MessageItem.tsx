import { cn, formatOnlineTime } from "@/lib/utils";
import type { Conversation, Message } from "@/types/chat";
import ChatAvatar from "./ChatAvatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FIVE_MINUTES = 5 * 60 * 1000;

interface MessageItemProps {
    message: Message;
    index: number;
    messages: Message[];
    selectedConvo: Conversation;
    lastMessageStatus: "sent" | "seen";
}

const MessageItem = ({ message, index, messages, selectedConvo, lastMessageStatus }: MessageItemProps) => {
    const prev = messages[index - 1];
    const isFirstMessage = index === 0;
    const isTimeGap = prev && Date.parse(message.createdAt) - Date.parse(prev.createdAt) > FIVE_MINUTES;
    const isDifferentSender = message.senderId !== prev?.senderId
    const isGroupBreak = isFirstMessage || isTimeGap || isDifferentSender;
    const participant = selectedConvo.participants.find(participant => participant._id === message.senderId)
    return (
        <div className={cn(
            "flex gap-2 message-bounce mt-1",
            message.isOwn ? "justify-end" : "justify-start"
        )}>
            {!message.isOwn && (
                <div className="w-8">
                    {isGroupBreak && (
                        <ChatAvatar
                            type="direct"
                            mode="chat"
                            name={participant?.displayName}
                            avatarUrl={participant?.avatarUrl || ""}
                        />
                    )}
                </div>
            )}
            <div
                className={cn(
                    "max-w-xs lg:max-w-md space-y-1 flex flex-col",
                    message.isOwn ? "items-end" : "items-start"
                )}
            >
                <Card
                    className={cn(
                        "p-3",
                        message.isOwn ? "chat-bubble-sent border-0" : "chat-bubble-received"
                    )}
                >
                    <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
                </Card>

                {
                    isGroupBreak && (
                        <span className="text-xs text-muted-foreground px-1">
                            {formatOnlineTime(new Date(message.createdAt))}
                        </span>
                    )
                }

                {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
                    <Badge
                        variant="outline"
                        className={cn(
                            "text-xs px-1.5 py-0.5 h-4 border-0",
                            lastMessageStatus === "seen"
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {lastMessageStatus}
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default MessageItem;