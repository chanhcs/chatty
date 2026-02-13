import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/store";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";

type EditableField = {
    key: keyof Pick<User, "displayName" | "username" | "email">;
    label: string;
    type?: string;
};

const PERSONAL_FIELDS: EditableField[] = [
    { key: "displayName", label: "Full name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email", type: "email" },
];

type Props = {
    userInfo: User | null;
};

const AccountForm = ({ userInfo }: Props) => {
    const { setUser } = useAuthStore();

    const [form, setForm] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo) setForm(userInfo);
    }, [userInfo]);

    if (!userInfo) return null;

    const handleChange = (key: keyof User, value: any) => {
        setForm((s) => ({ ...(s as object), [key]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const payload = {
                displayName: form.displayName,
                username: form.username,
                email: form.email,
                bio: form.bio,
            };

            const res = await userService.updateProfile(payload);
            if (res && res.user) {
                setUser(res.user);
                toast.success("Profile updated");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="glass-strong border-border/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CircleUser className="size-5 text-primary" />
                    Profile
                </CardTitle>
                <CardDescription>
                    Your personal details and profile information
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {PERSONAL_FIELDS.map(({ key, label, type }) => (
                        <div
                            key={key}
                            className="space-y-2"
                        >
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={String(key)}
                                type={type ?? "text"}
                                value={(form as any)[key] ?? ""}
                                onChange={(e) => handleChange(key as keyof User, e.target.value)}
                                className="glass-light border-border/30"
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        rows={3}
                        value={form.bio ?? ""}
                        onChange={(e) => handleChange("bio" as keyof User, e.target.value)}
                        className="glass-light border-border/30 resize-none"
                    />
                </div>

                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="cursor-pointer w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default AccountForm;