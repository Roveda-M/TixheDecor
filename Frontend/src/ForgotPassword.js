import { useState } from "react";
import { Link } from "react-router-dom";
import { api, formatApiError } from "./api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetLink("");

    if (!email.trim()) {
      alert("Ju lutem shkruani emailin");
      return;
    }

    setLoading(true);
    try {
      const data = await api.forgotPassword(email.trim());
      setMessage(data.message || "Kontrolloni emailin për udhëzime.");
      if (data.resetUrl) {
        try {
          const u = new URL(data.resetUrl);
          setResetLink(`${u.pathname}${u.search}`);
        } catch {
          setResetLink("/reset-password");
        }
      }
    } catch (error) {
      alert(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
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
            {loading ? "Duke dërguar..." : "Dërgo linkun"}
          </button>
        </form>

        {message && (
          <p className="text-sm text-green-700 mt-4 text-center">{message}</p>
        )}

        {resetLink && (
          <div className="mt-4 p-3 bg-[#f6f1e8] rounded-lg border border-[#c9c1b5] text-sm">
            <p className="text-gray-600 mb-2">
              (Demo) Klikoni linkun për të vazhduar:
            </p>
            <Link to={resetLink} className="text-blue-600 underline break-all">
              Rivendos fjalëkalimin
            </Link>
          </div>
        )}

        <p className="text-sm text-center mt-6">
          <Link to="/login" className="underline">
            Kthehu te login
          </Link>
        </p>
      </div>
    </div>
  );
}
