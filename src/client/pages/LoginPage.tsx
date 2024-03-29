import { useNavigate } from "react-router-dom"

import { Button } from "../components/Button"
import { Logo } from "../components/Logo"
import { TextInput } from "../components/TextInput"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"

export const LoginPage = () => {
    const { loading, login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        await login(email, password);
    };

    // redirect if user is logged in
    useEffect(() => {
        if (!loading && user) {
            navigate("/");
        }
    }, [loading, user])

    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo height={42} />
                <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                defaultValue="admin@bambuser.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-slate-800 hover:text-late-600">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                defaultValue="admin"
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" disabled={loading}>
                            Sign in
                        </Button>
                    </div>
                </form>
                <p className="mt-10 text-sm text-center text-gray-500">
                    Not a member?{' '}
                    <a href="/register" className="font-semibold leading-6 text-slate-800 hover:text-slate-600">
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    )
}
