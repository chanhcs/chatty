import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomScreen from "./ChatWelcomScreen";
// import ChatSkeleton from "./ChatSkeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";
import { useEffect } from "react";

const ChatLayout = () => {
    const { activeConversationId, conversations, messageLoading: loading, markAsSeen } = useChatStore()
    const selectedConvo = conversations.find(convo => convo._id === activeConversationId)

    useEffect(() => {
        if (!selectedConvo) return;
        markAsSeen();
    }, [markAsSeen, selectedConvo]);

    if (!selectedConvo) {
        return <ChatWelcomScreen />
    }
    // if (loading) {
    //     return <ChatSkeleton />
    // }
    return (
        <SidebarInset className="flex flex-col flex-1 h-full shadow-md overflow-hidden">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto bg-primary-foreground">
                <ChatContent />
            </div>
            <ChatInput selectedConvo={selectedConvo} />
        </SidebarInset>
    );
};

export default ChatLayout;