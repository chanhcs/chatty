import ChatLayout from "@/components/chat/ChatLayout";
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const ChatApp = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full">
                <ChatLayout />
            </div>
        </SidebarProvider>
    );
};

export default ChatApp;