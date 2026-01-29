import { useEffect, useMemo, useRef } from "react";
import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomScreen from "./ChatWelcomScreen";
import MessageItem from "./components/MessageItem";

const ChatContent = () => {
    const { activeConversationId, conversations, messages: chats } = useChatStore()
    const selectedConvo = conversations.find(convo => convo._id === activeConversationId);
    const messages = chats[activeConversationId!]?.items || []
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!messageEndRef.current) return;
        messageEndRef.current?.scrollIntoView({
            block: "end"
        })
    }, [activeConversationId, messages.length])

    const lastMessageStatus = useMemo<"sent" | "seen">(() => {
        const lastMessage = selectedConvo?.lastMessage;
        if (!lastMessage) {
            return "sent";
        }

        const seenBy = selectedConvo?.seenBy ?? [];
        return seenBy.length > 0 ? "seen" : "sent";
    }, [selectedConvo?.lastMessage, selectedConvo?.seenBy]);

    if (!selectedConvo) {
        return <ChatWelcomScreen />
    }

    if (!messages?.length) {
        return <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
            <img src="/empty-inbox.png" alt="inbox-empty.png" width={400} height={400} />
            <p>No messages yet, start the convesation!</p>
        </div>
    }

    return (
        <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {messages.map((message, index) => (
                    <MessageItem
                        key={message._id}
                        message={message}
                        index={index}
                        messages={messages}
                        selectedConvo={selectedConvo}
                        lastMessageStatus={lastMessageStatus}
                    />
                ))}
                <div ref={messageEndRef} />
            </div>
        </div>
    );
};

export default ChatContent;