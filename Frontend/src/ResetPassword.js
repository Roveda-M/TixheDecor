import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { api, formatApiError } from "./api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Linku i pavlefshëm. Kërkoni një link të ri.");
      return;
    }

    if (password.length < 6) {
      alert("Fjalëkalimi duhet të ketë të paktën 6 karaktere");
      return;
    }

    if (password !== confirm) {
      alert("Fjalëkalimet nuk përputhen");
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(token, password);
      alert("Fjalëkalimi u ndryshua me sukses!");
      navigate("/login", { replace: true });
    } catch (error) {
      alert(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-xl mb-4">Link i pavlefshëm</h2>
          <p className="text-sm text-gray-600 mb-4">
            Token mungon ose linku ka skaduar.
          </p>
          <Link to="/forgot-password" className="underline">
            Kërko link të ri
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-light text-center mb-6 tracking-[2px]">
          Fjalëkalim i ri
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Fjalëkalimi i ri</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Min. 6 karaktere"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm">Përsërit fjalëkalimin</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Përsërit"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition disabled:opacity-60"
          >
            {loading ? "Duke ruajtur..." : "Ruaj fjalëkalimin"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          <Link to="/login" className="underline">
            Kthehu te login
          </Link>
        </p>
      </div>
    </div>
  );
}
