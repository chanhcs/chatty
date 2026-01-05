import Logout from "@/components/auth/Logout";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatApp = () => {
    const user = useAuthStore(s => s.user)
    return (
        <div>
            <div>{user?.username}</div>
            <Logout />
        </div>
    );
};

export default ChatApp;