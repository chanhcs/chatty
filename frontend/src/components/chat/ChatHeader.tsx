import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import { SidebarTrigger } from "../ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { Separator } from "../ui/separator";
import { StatusBadge } from "./components/StatusBadge";
import ChatAvatar from "./components/ChatAvatar";
import { useSocketStore } from "@/stores/useSocketStore";

const ChatHeader = ({ chat }: { chat?: Conversation }) => {
    const { conversations, activeConversationId } = useChatStore();
    const user = useAuthStore(state => state.user);
    const onlineUsers = useSocketStore(state => state.onlineUsers);

    let otherUser;

    chat = chat ?? conversations.find(convo => convo._id === activeConversationId);

    if (!chat) {
        return (
            <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1 text-foreground" />
            </header>
        );
    }

    if (chat.type === "direct") {
        const otherUsers = chat.participants.filter(participant => participant._id !== user?._id);
        otherUser = otherUsers.length > 0 ? otherUsers[0] : null;

        if (!user || !otherUser) return;
    }

    return (
        <header className="sticky top-0 z-10 px-4 flex items-center bg-background h-18">
            <div className="flex items-center gap-2 w-full">
                <SidebarTrigger className="-ml-1 text-foreground" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />

                <div className="p-2 w-full flex items-center gap-3">
                    <div className="relative">
                        <ChatAvatar
                            mode="sidebar"
                            name={otherUser?.displayName || ""}
                            avatarUrl={otherUser?.avatarUrl || ""}
                            participants={chat.participants}
                            type={chat.type === "direct" ? "direct" : "group"}
                        />
                        {chat.type === "direct" && <StatusBadge status={onlineUsers.includes(otherUser?._id ?? "") ? "online" : "offline"} />}
                    </div>

                    <div className="font-semibold text-foreground">
                        {chat.type === "direct" ? otherUser?.displayName : chat.group?.name}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;