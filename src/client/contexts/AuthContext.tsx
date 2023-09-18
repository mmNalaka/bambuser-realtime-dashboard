import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    email: string;
};

type AuthContextType = {
    loading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    loading: false,
    user: null,
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
});



type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // check if user is logged in
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/check", {
                method: "GET",
            });
            const data = await res.json();
            if (data.success) {
                setUser({
                    id: data.id,
                    email: data.email,
                });
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    // login user
    const login = async (email: string, password: string) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setUser({
                    id: data.id,
                    email: data.email,
                });
            }
            setLoading(false);
        } catch (err) {
            setUser(null);
            setLoading(false);
        }
    };

    // register user
    const register = async (email: string, password: string) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setUser({
                    id: data.id,
                    email: data.email,
                });
            }
            setLoading(false);
        } catch (err) {
            setUser(null);
            setLoading(false);
        }
    };

    // logout user
    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "GET",
            });
            setLoading(false);
            setUser(null);
            window.location.href = "/login";
        } catch (err) {
            setLoading(false);
            setUser(null);
            window.location.href = "/login";
        }
    };

    const value = { user, login, logout, register, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

const useAuth = () => {
    if (!AuthContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return useContext(AuthContext);
}

export {
    useAuth,
    AuthProvider,
}





