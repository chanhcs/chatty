import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import Loading from "../loading/Loading";

const ProtectedRoute = () => {
    const { accessToken, loading, refresh } = useAuthStore();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                if (!accessToken) {
                    await refresh();
                }
            } catch (error) {
                console.error("Auth initialization failed:", error);
            } finally {
                setInitialized(true);
            }
        };

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!initialized || loading) {
        return <Loading />;
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;