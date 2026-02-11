import { useAuthStore } from "@/stores/useAuthStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileCard from "./ProfileCard";
import AccountForm from "./AccountForm";
import SettingsForm from "./SettingsForm";

interface ProfileDialogProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfileDialog = ({ isOpen, setIsOpen }: ProfileDialogProps) => {
    const user = useAuthStore(state => state.user)
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogContent className="overflow-y-auto max-h-[95vh] p-0 bg-transparent border-0 shadow-2xl">
                <div className="bg-gradient-glass">
                    <div className="max-w-4xl mx-auto p-4">
                        {/* heading */}
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                Account & Settings
                            </DialogTitle>
                        </DialogHeader>

                        <ProfileCard user={user} />

                        <Tabs
                            defaultValue="account"
                            className="my-4"
                        >
                            <TabsList className="grid w-full grid-cols-2 glass-light">
                                <TabsTrigger
                                    value="account"
                                    className="data-[state=active]:glass-strong"
                                >
                                    Account
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="data-[state=active]:glass-strong"
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="account">
                                <AccountForm userInfo={user} />
                            </TabsContent>

                            <TabsContent value="settings">
                                <SettingsForm />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDialog;