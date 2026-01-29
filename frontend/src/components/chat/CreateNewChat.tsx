import { MessageSquareMore } from "lucide-react";

const CreateNewChat = () => {
    return (
        <div className="flex items-center mt-3 gap-1 p-3 cursor-pointer font-semibold border rounded-2xl">
            <MessageSquareMore />
            Create new meesager
        </div>
    );
};

export default CreateNewChat;