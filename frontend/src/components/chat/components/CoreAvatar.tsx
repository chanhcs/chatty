import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
    "bg-blue-500",
    {
        variants: {
            type: {
                sidebar: "size-12 text-base",
                chat: "size-8 text-sm",
                profile: "size-24 text-3xl shadow-md",
            },
        },
        defaultVariants: {
            type: "sidebar",
        },
    }
);

interface CoreAvatarProps
    extends VariantProps<typeof avatarVariants> {
    name: string;
    avatarUrl: string;
    className?: string;
}

const CoreAvatar = ({
    name,
    avatarUrl,
    type,
    className,
}: CoreAvatarProps) => {
    const hasAvatar = Boolean(avatarUrl)
    return (
        <Avatar className={cn(avatarVariants({ type }), className)}>
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className={cn(
                "font-semibold uppercase text-white",
                !hasAvatar && "bg-indigo-400")}
            >
                {name.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};

export default CoreAvatar;
