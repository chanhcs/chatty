import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomScreen from "./ChatWelcomScreen";
// import ChatSkeleton from "./ChatSkeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

const ChatLayout = () => {
    const { activeConversationId, conversations, messageLoading: loading } = useChatStore()
    const selectedConvo = conversations.find(convo => convo._id === activeConversationId)
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
            <ChatInput />
        </SidebarInset>
    );
};

export default ChatLayout;