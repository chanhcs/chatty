import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useThemeStore } from "@/stores/useThemeStore";
import { LogOut } from "lucide-react";

const Logout = () => {
    const { logout } = useAuthStore()
    const { setTheme } = useThemeStore()
    const navigate = useNavigate()

    const handleLougout = async () => {
        await logout()
        setTheme(false)
        navigate('/login')
    }

    return <Button
        type="button"
        variant="transparent"
        className="cursor-pointer"
        onClick={handleLougout}
    >
        <LogOut className="text-destructive" />
        <span className="text-destructive">Logout</span>
    </Button>
};

export default Logout;