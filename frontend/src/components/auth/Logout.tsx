import { LogOut } from "lucide-react";

const Logout = () => {
    return (
        <div className="flex items-center gap-2">
            <LogOut className="text-destructive" />
            <span className="text-destructive">Logout</span>
        </div>
    )
};

export default Logout;