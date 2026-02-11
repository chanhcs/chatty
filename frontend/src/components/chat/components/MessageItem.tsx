import { cn, formatMessageTime } from "@/lib/utils";
import type { Conversation, Message } from "@/types/chat";
import ChatAvatar from "./ChatAvatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";

const FIVE_MINUTES = 5 * 60 * 1000;

interface MessageItemProps {
    message: Message;
    index: number;
    messages: Message[];
    selectedConvo: Conversation;
    lastMessageStatus: "sent" | "seen";
}

const MessageItem = ({ message, index, messages, selectedConvo, lastMessageStatus }: MessageItemProps) => {
    const prev = index > 0 ? messages[index + 1] : undefined;
    const isFirstMessage = index === 0;
    const isTimeGap = prev && Date.parse(message.createdAt) - Date.parse(prev.createdAt) > FIVE_MINUTES;
    const isDifferentSender = message.senderId !== prev?.senderId
    const isGroupBreak = isFirstMessage || isTimeGap || isDifferentSender;
    const participant = selectedConvo.participants.find(participant => participant._id === message.senderId)
    return (
        <>
            {isTimeGap && (
                <span className="text-center text-xs text-muted-foreground px-1">
                    {formatMessageTime(new Date(message.createdAt))}
                </span>
            )}
            <div className={cn(
                "flex gap-2 message-bounce my-1",
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
                    {message.imgUrl && !message.content ? (
                        <img
                            src={message.imgUrl}
                            alt="chat-img"
                            className="max-h-60 max-w-[320px] rounded border"
                        />
                    ) : (
                        <Card
                            className={cn(
                                "p-3",
                                message.isOwn ? "chat-bubble-sent border-0" : "chat-bubble-received"
                            )}
                        >
                            {message.imgUrl && (
                                <img
                                    src={message.imgUrl}
                                    alt="chat-img"
                                    className="max-h-60 max-w-[320px] rounded mb-2 border"
                                />
                            )}
                            {message.content && (
                                <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
                            )}
                        </Card>
                    )}

                    {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
                        <Badge
                            className={cn(
                                "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border-0",
                                lastMessageStatus === "seen"
                                    ? "bg-primary/15 text-primary"
                                    : "bg-transparent text-muted-foreground"
                            )}
                        >
                            {lastMessageStatus === "seen" && (
                                <CheckCheck className="h-3.5 w-3.5" />
                            )}
                            <span>{lastMessageStatus}</span>
                        </Badge>
                    )}
                </div>
            </div>
        </>
    );
};

export default MessageItem;