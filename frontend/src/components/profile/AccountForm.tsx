import { CircleUser, Heart } from "lucide-react";
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

type EditableField = {
    key: keyof Pick<User, "displayName" | "username" | "email" | "phone">;
    label: string;
    type?: string;
};

const PERSONAL_FIELDS: EditableField[] = [
    { key: "displayName", label: "Full name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone" },
];

type Props = {
    userInfo: User | null;
};

const AccountForm = ({ userInfo }: Props) => {
    if (!userInfo) return null;

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PERSONAL_FIELDS.map(({ key, label, type }) => (
                        <div
                            key={key}
                            className="space-y-2"
                        >
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={key}
                                type={type ?? "text"}
                                value={userInfo[key] ?? ""}
                                onChange={() => { }}
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
                        value={userInfo.bio ?? ""}
                        onChange={() => { }}
                        className="glass-light border-border/30 resize-none"
                    />
                </div>

                <Button className="cursor-pointer w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-opacity">
                    Save
                </Button>
            </CardContent>
        </Card>
    );
};

export default AccountForm;