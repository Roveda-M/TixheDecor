import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, formatApiError } from "./api";
import { useConfirmModal } from "./ConfirmModal";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const { alertDialog, ConfirmModal } = useConfirmModal();

  useEffect(() => {
    window.history.pushState({ authBackGuard: true }, "");
    const handleBack = () => window.location.replace("/login");
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      await alertDialog("Ju lutem shkruani emailin");
      return;
    }

    setLoading(true);
    try {
      const data = await api.forgotPassword(email.trim());
      if (data.resetUrl) {
        try {
          const u = new URL(data.resetUrl);
          setResetLink(`${u.pathname}${u.search}`);
        } catch {
          setResetLink("/reset-password");
        }
      }
      setSubmitted(true);
    } catch (error) {
      await alertDialog(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
          <ConfirmModal />
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-light text-center mb-2 tracking-[2px]">
              Token u gjenerua me sukses!
            </h2>
            {resetLink && (
                <div className="mt-2 mb-6 p-3 bg-[#f6f1e8] rounded-lg border border-[#c9c1b5] text-sm">
                  <p className="text-gray-600 mb-2">(Demo) Klikoni linkun për të vazhduar:</p>
                  <Link to={resetLink} replace className="text-blue-600 underline break-all">
                    Rivendos fjalëkalimin
                  </Link>
                </div>
            )}
            <p className="text-sm text-center mt-4">
              <Link to="/login" replace className="underline">
                Kthehu te login
              </Link>
            </p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
        <ConfirmModal />
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-light text-center mb-2 tracking-[2px]">
            Rivendos fjalëkalimin
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Shkruani emailin e llogarisë suaj
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm">Email</label>
              <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition disabled:opacity-60"
            >
              {loading ? "Duke dërguar..." : "Dërgo emailin"}
            </button>
          </form>
          <p className="text-sm text-center mt-6">
            <Link to="/login" replace className="underline">
              Kthehu te login
            </Link>
          </p>
        </div>
      </div>
  );
}
