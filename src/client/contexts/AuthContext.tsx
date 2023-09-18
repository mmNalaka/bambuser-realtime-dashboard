import { createContext, useEffect, useState } from "react";

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
        // check if user is logged in
        setLoading(false);
    }, []);

    // login user
    const login = async (email: string, password: string) => {
        // login user
    };

    // register user
    const register = async (email: string, password: string) => {
        // register user
    };

    // logout user
    const logout = () => {
        // logout user
    };

    const value = { user, login, logout, register, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

const useAuth = () => {
    if (!AuthContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return AuthContext;
}

export {
    useAuth,
    AuthProvider,
}





