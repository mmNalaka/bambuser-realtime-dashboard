import { Button } from "../components/Button"
import { Logo } from "../components/Logo"
import { TextInput } from "../components/TextInput"

export const LoginPage = () => {
    return (

        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo height={42} />
                <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
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
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
