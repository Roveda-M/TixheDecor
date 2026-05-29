import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatApiError } from "./api";

const usernameFromEmail = (email) => {
  const local = (email.split("@")[0] || "").trim();
  return local.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 30);
};

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setForm((prev) => {
        const next = { ...prev, email: value };
        const previousAuto = usernameFromEmail(prev.email);
        if (!prev.username.trim() || prev.username === previousAuto) {
          next.username = usernameFromEmail(value);
        }
        return next;
      });
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const fullname = form.fullname.trim();
    const username = (form.username.trim() || usernameFromEmail(form.email)).trim();
    const email = form.email.trim();

    if (!fullname) return alert("Shto emrin e plotë");
    if (!email) return alert("Shto email");
    if (!emailValid(email)) return alert("Email i pavlefshëm");
    if (!username) return alert("Username nuk mund të jetë bosh");
    if (!form.password.trim()) return alert("Shto fjalëkalimin");
    if (form.password !== form.confirm) return alert("Fjalëkalimet nuk përputhen");
    if (form.password.length < 6) return alert("Fjalëkalimi duhet të ketë të paktën 6 karaktere");

    setLoading(true);
    try {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("role");

      await api.register(email, form.password, fullname, username);
      setMessage("Llogaria u krijua. Të dhënat (emër, username, email) ruhen në profil pas login-it.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setMessage(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center mb-2 tracking-[2px] font-light">Create Your Account</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Username plotësohet automatikisht nga emaili (mund ta ndryshosh).
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="name"
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="username"
          />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="email"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="new-password"
          />
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="new-password"
          />

          {message && (
            <p className="text-sm text-center text-[#5c4030] bg-[#f6f1e8] border border-[#e6dfd3] rounded-lg px-3 py-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition disabled:opacity-60"
          >
            {loading ? "Duke u regjistruar..." : "Register"}
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
