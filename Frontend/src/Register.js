import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api, formatApiError } from "./api";
import { useConfirmModal } from "./ConfirmModal";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { alertDialog, ConfirmModal } = useConfirmModal();

  const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const fullname = form.fullname.trim();
    const phoneNumber = form.phoneNumber.trim();
    const email = form.email.trim();

    if (!fullname) return alertDialog("Shto emrin e plotë");
    if (!phoneNumber) return alertDialog("Shto numrin e telefonit");
    if (!email) return alertDialog("Shto email");
    if (!emailValid(email)) return alertDialog("Email i pavlefshëm");
    if (!form.password.trim()) return alertDialog("Shto fjalëkalimin");
    if (form.password !== form.confirm) return alertDialog("Fjalëkalimet nuk përputhen");
    if (form.password.length < 6) return alertDialog("Fjalëkalimi duhet të ketë të paktën 6 karaktere");

    setLoading(true);
    try {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("role");

      await api.register(email, form.password, fullname, phoneNumber);
      setMessage("Llogaria u krijua. Hyni me email dhe fjalëkalimin tuaj.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setMessage(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
      <ConfirmModal />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center mb-6 tracking-[2px] font-light">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
          <input
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="off"
          />
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="tel"
          />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            autoComplete="off"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="password-visibility-input w-full p-3 pr-11 border rounded-lg"
              autoComplete="new-password"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-3 flex items-center text-black hover:text-gray-600 transition"
            >
              {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
            </button>
          </div>
          <div className="relative">
            <input
              name="confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              className="password-visibility-input w-full p-3 pr-11 border rounded-lg"
              autoComplete="new-password"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              className="absolute inset-y-0 right-3 flex items-center text-black hover:text-gray-600 transition"
            >
              {showConfirmPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
            </button>
          </div>

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
