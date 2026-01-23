import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useThemeStore } from "@/stores/useThemeStore";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import type { EmojiSelect } from "@/types/chat";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const isDark = useThemeStore(state => state.isDark);
    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <Smile className="size-4" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-11.5"
            >
                <Picker
                    theme={isDark ? "dark" : "light"}
                    data={data}
                    onEmojiSelect={(emoji: EmojiSelect) => onChange(emoji.native)}
                    emojiSize={24}
                />
            </PopoverContent>
        </Popover>
    );
};

export default EmojiPicker;