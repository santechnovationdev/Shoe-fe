import React, { useState, useContext } from "react";
import { DContext } from "../../context/Datacontext";

const Login = () => {
    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const HandleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch(`${BeURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                setIsAuth(true);
                setCurrentUser(data.user);
                window.location.href = "/";
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Server error. Try again!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-slate-100 px-4 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.2),_transparent_24%)]" />
            <div className="relative w-full max-w-2xl">
                <div className="grid gap-8">
                    <div className="rounded-[2rem] bg-white text-slate-900 border border-slate-200/80 shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg text-2xl font-black text-white">SM</div>
                            <h2 className="text-3xl font-bold">Sign in</h2>
                            <p className="mt-2 text-sm text-slate-500">Enter your account details to continue.</p>
                        </div>

                        <form onSubmit={HandleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {error && (
                                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-3">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">or</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <p className="text-sm text-center text-slate-500">
                            Do not have an account?{' '}
                            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Create one
                            </a>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-400">
                    Protected by enterprise security standards
                </p>
            </div>
        </div>
    );
};

export default Login;
