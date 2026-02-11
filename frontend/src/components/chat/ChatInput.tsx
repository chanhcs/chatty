import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/chat";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Send } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker from "./components/EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { toast } from "sonner";
import api from "@/lib/axios";

const ChatInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
    const user = useAuthStore(state => state.user)
    const { sendDirectMessage, sendGroupMessage } = useChatStore();
    const [value, setValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!user) return;

    const sendMessage = async (file?: File) => {
        if ((!(value.trim() || file)) || isSending) return;
        setIsSending(true);
        try {
            let imgUrl = null;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                try {
                    const res = await api.post("/messages/upload", formData);
                    imgUrl = res.data.url;
                } catch (error) {
                    throw new Error("Upload failed");
                }
            }
            if (selectedConvo.type === 'direct') {
                const participants = selectedConvo.participants;
                const otherUser = participants.filter(participant => participant._id !== user._id)[0];
                await sendDirectMessage({
                    recipientId: otherUser._id,
                    content: value,
                    imgUrl: imgUrl || undefined
                })
            } else {
                await sendGroupMessage({
                    conversationId: selectedConvo._id,
                    content: value,
                    imgUrl: imgUrl || undefined
                })
            }
            setValue("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error(error)
            toast.error("Failed to send message. Please try again!")
        } finally {
            setIsSending(false)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            sendMessage(file);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="flex items-center gap-2 p-3 min-h-14 bg-background">
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-smoot cursor-pointer"
                onClick={handleImageClick}
            >
                <ImagePlus className="size-5" />
            </Button>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className="flex flex-1 relative gap-1">
                <Input
                    onKeyDown={handleKeyDown}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    placeholder="Type a message..."
                    className="h-10 bg-white border border-border/50 pr-12 
                               focus-visible:ring-0 focus-visible:ring-offset-0
                               focus:border-primary/50 transition-colors"
                />
                <div className="absolute right-15 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="size-20 hover:bg-primary/10 transition-smooth"
                    >
                        <EmojiPicker onChange={(emoji: string) => setValue(value => value + emoji)} />
                    </Button>
                </div>
                <Button
                    className="cursor-pointer bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105"
                    disabled={!value.trim()}
                    onClick={() => sendMessage()}
                >
                    <Send className="size-4 text-white" />
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;