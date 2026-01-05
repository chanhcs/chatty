import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import Loading from "../loading/Loading";

const ProtectedRoute = () => {
    const { accessToken, loading, refresh } = useAuthStore();
    const [initialized, setInitialized] = useState(false);

    const init = async () => {
        if (!accessToken) {
            await refresh();
        }
        setInitialized(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!initialized || loading) {
        return <Loading />
    }

    if (!accessToken) {
        return (
            <Navigate to="/login" replace />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;