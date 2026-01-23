import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/chat";
import { useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Send } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker from "./components/EmojiPicker";

const ChatInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
    const user = useAuthStore(state => state.user)
    const [value, setValue] = useState("")
    if (!user) return;
    return (
        <div className="flex items-center gap-2 p-3 min-h-14 bg-background">
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-smooth"
            >
                <ImagePlus className="size-4" />
            </Button>
            <div className="flex flex-1 relative gap-1">
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
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
                        className="size-8 hover:bg-primary/10 transition-smooth"
                    >
                        <EmojiPicker onChange={(emoji: string) => setValue(value => value + emoji)} />
                    </Button>
                </div>
                <Button
                    className="cursor-pointer bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105"
                    disabled={!value.trim()}
                >
                    <Send className="size-4 text-white" />
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;