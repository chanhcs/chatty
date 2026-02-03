import { useEffect, useMemo, useRef, useCallback, useLayoutEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomScreen from "./ChatWelcomScreen";
import MessageItem from "./components/MessageItem";

const ChatContent = () => {
    const { activeConversationId, conversations, messages: chats, fetchMessages, messageLoading: isLoading } = useChatStore();

    const selectedConvo = conversations.find(convo => convo._id === activeConversationId);
    const messages = chats[activeConversationId!]?.items || [];
    const reversedMessages = [...messages].reverse();
    const hasMore = chats[activeConversationId!]?.hasMore ?? false;
    const key = `chat-scroll-${activeConversationId}`

    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ block: "end" });
        }
    }, [activeConversationId, messages.length]);

    const fetchMoreMessage = useCallback(() => {
        if (!activeConversationId || !hasMore) return;
        fetchMessages(activeConversationId);
    }, [activeConversationId, hasMore, fetchMessages]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore) {
                    fetchMoreMessage();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = loadMoreRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [fetchMoreMessage, hasMore, messages.length]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const item = sessionStorage.getItem(key);

        if (item) {
            const { scrollTop } = JSON.parse(item);
            requestAnimationFrame(() => {
                container.scrollTop = scrollTop;
            });
        }
    }, [messages.length, key])

    const lastMessageStatus = useMemo<"sent" | "seen">(() => {
        const lastMessage = selectedConvo?.lastMessage;
        if (!lastMessage) return "sent";

        const seenBy = selectedConvo?.seenBy ?? [];
        return seenBy.length > 0 ? "seen" : "sent";
    }, [selectedConvo?.lastMessage, selectedConvo?.seenBy]);

    const handleScrollSave = () => {
        if (!containerRef.current || !activeConversationId) return;
        sessionStorage.setItem(key,
            JSON.stringify({
                scrollTop: containerRef.current.scrollTop,
                scrollHeight: containerRef.current.scrollHeight
            }))
    }

    if (!selectedConvo) {
        return <ChatWelcomScreen />;
    }

    if (!chats[activeConversationId!]?.initialized || isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
                <img src="/empty-inbox.png" width={400} />
                <p>No messages yet, start the conversation!</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
            <div
                id="scrollableDiv"
                className="flex flex-1 flex-col-reverse overflow-y-auto overflow-x-hidden"
                ref={containerRef}
                onScroll={handleScrollSave}
            >
                <div ref={messageEndRef} />
                {reversedMessages.map((message, index) => (
                    <MessageItem
                        key={message._id}
                        message={message}
                        index={index}
                        messages={reversedMessages}
                        selectedConvo={selectedConvo}
                        lastMessageStatus={lastMessageStatus}
                    />
                ))}

                <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
                    {hasMore && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatContent;