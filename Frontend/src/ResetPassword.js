import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "./api";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Passwords nuk përputhen");
            return;
        }

        await api.resetPassword(token, password);

        alert("Password u ndryshua");
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow w-96">
                <h2 className="text-xl mb-4">Reset Password</h2>

                <input
                    type="password"
                    placeholder="New password"
                    className="border p-2 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    className="border p-2 w-full mt-2"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                <button className="mt-4 bg-black text-white w-full py-2">
                    Reset
                </button>
            </form>
        </div>
    );
}