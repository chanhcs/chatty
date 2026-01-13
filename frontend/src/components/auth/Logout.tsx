import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useThemeStore } from "@/stores/useThemeStore";

const Logout = () => {
    const { logout } = useAuthStore()
    const { setTheme } = useThemeStore()
    const navigate = useNavigate()

    const handleLougout = async () => {
        await logout()
        setTheme(false)
        navigate('/login')
    }

    return <Button type="button" className="cursor-pointer" onClick={handleLougout}>Log out</Button>
};

export default Logout;