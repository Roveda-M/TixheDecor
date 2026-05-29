import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthGuard() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const requireAuth = useCallback(() => {
        if (!sessionStorage.getItem("accessToken")) {
            setVisible(true);
            // Fshihet automatikisht pas 3 sekondash
            setTimeout(() => setVisible(false), 3000);
            return false;
        }
        return true;
    }, []);

    const goToLogin = () => {
        setVisible(false);
        navigate("/login");
    };

    const AuthToast = () =>
        visible ? (
            <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4
                   bg-[#2b2b2b] text-white px-6 py-4 rounded-2xl shadow-2xl
                   animate-fade-in-up"
                style={{ minWidth: "300px" }}
            >
        <span className="text-sm tracking-wide flex-1">
           Duhet të jesh i kyçur për këtë veprim
        </span>
                <button
                    onClick={goToLogin}
                    className="text-xs bg-white text-black px-3 py-1.5 rounded-lg hover:bg-gray-200 transition font-medium whitespace-nowrap"
                >
                    Kyçu
                </button>
                <button
                    onClick={() => setVisible(false)}
                    className="text-gray-400 hover:text-white text-lg leading-none"
                >
                    ✕
                </button>
            </div>
        ) : null;

    return { requireAuth, AuthToast };
}