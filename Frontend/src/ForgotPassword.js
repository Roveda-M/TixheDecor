import { useState } from "react";
import { api } from "./api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.forgotPassword(email);
        setMsg("Check email për reset link");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow w-96">
                <h2 className="text-xl mb-4">Forgot Password</h2>

                <input
                    className="border p-2 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="mt-4 bg-black text-white w-full py-2">
                    Send
                </button>

                {msg && <p className="text-green-600 mt-3">{msg}</p>}
            </form>
        </div>
    );
}