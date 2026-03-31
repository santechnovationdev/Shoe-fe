import React, { useState, useContext } from "react";
import { DContext } from "../../context/Datacontext";

const Register = () => {
    const { setIsAuth, setCurrentUser, BeURL } = useContext(DContext);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !contact || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`${BeURL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fullname: name, email, contact, password }),
            });

            const data = await res.json();
            if (data.success) {
                setIsAuth(true);
                setCurrentUser(data.user);
                window.location.href = "/";
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Server error. Try again!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  text-slate-100 px-4 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.16),_transparent_24%)]" />
            <div className="relative w-full max-w-2xl">
                <div className="grid gap-8">
                    <div className="rounded-[2rem] bg-white text-slate-900 border border-slate-200/80 shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg text-2xl font-black text-white">SM</div>
                            <h2 className="text-3xl font-bold">Create Account</h2>
                            <p className="mt-2 text-sm text-slate-500">Sign up to monitor shoe fleet health and metrics.</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                                <input
                                    type="tel"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

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
                                    placeholder="��������"
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="��������"
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
                                Create Account
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-3">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">or</span>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        <p className="text-sm text-center text-slate-500">
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-400">
                    Your data is secure and encrypted
                </p>
            </div>
        </div>
    );
};

export default Register;
