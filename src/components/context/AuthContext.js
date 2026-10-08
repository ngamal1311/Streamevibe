import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(null);

    // هل لسه بنحاول نعرف حالة تسجيل الدخول؟
    const [loading, setLoading] = useState(true);

    // تستخدم بعد Login
    const login = (token) => {
        setAccessToken(token);
    };

    // تجيب Access Token جديد باستخدام Refresh Token
    const refreshAccessToken = async () => {

        try {

            const response = await fetch(
                "http://localhost:8000/api/token/refresh/",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setAccessToken(null);
                return false;
            }

            setAccessToken(data.access);

            return true;

        } catch (error) {

            setAccessToken(null);
            return false;

        }
    };

    // Logout من ناحية React
    const logout = async () => {
    try {
        await fetch(
            "http://localhost:8000/api/logout/",
            {
                method: "POST",
                credentials: "include",
            }
        );
    } catch (error) {
        console.log("Logout error:", error);
    } finally {
        setAccessToken(null);
    }
};

    // عند فتح / Refresh الموقع
    useEffect(() => {

        const restoreLogin = async () => {

            await refreshAccessToken();

            setLoading(false);
        };

        restoreLogin();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                loading,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}