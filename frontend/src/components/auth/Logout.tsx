import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Logout = () => {
    const { logout } = useAuthStore()
    const navigate = useNavigate()
    const handleLougout = async () => {
        await logout()
        navigate('/login')
    }
    return <Button type="button" className="cursor-pointer" onClick={handleLougout}>Log out</Button>
};

export default Logout;