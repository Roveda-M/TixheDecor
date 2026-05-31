import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { api, formatApiError, hasRole } from "./api";
import { useConfirmModal } from "./ConfirmModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { alertDialog, ConfirmModal } = useConfirmModal();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");
    if (token) {
      if (hasRole(role, "ROLE_WORKER")) {
        navigate("/worker-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  const emailValid = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      await alertDialog("Ju lutem shtoni emailin");
      return;
    }

    if (!emailValid(email)) {
      await alertDialog("Ju lutem shtoni një email të vlefshëm");
      return;
    }

    if (password.trim() === "") {
      await alertDialog("Fjalëkalimi është i zbrazët");
      return;
    }

    setLoading(true);
    try {
      const data = await api.login(email, password);

      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("role", data.role);

      if (hasRole(data.role, "ROLE_WORKER")) {
        navigate("/worker-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      await alertDialog(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4 py-6 relative">
        <ConfirmModal />
        <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go back"
            className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FaArrowLeft aria-hidden="true" />
        </button>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <br />
          <br />
          <h2 className="text-2xl font-light text-center mb-6 tracking-[2px]">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label className="text-sm">Email</label>
              <input
                  type="email"
                  name="tixhe-login-email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  autoComplete="off"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute("readonly")}
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <div className="relative mt-1">
                <input
                    type={showPassword ? "text" : "password"}
                    name="tixhe-login-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-visibility-input w-full p-3 pr-11 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    autoComplete="new-password"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute("readonly")}
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
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm underline">
                Forgot password?
              </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
            >
              {loading ? "Duke u kyçur..." : "Login"}
            </button>

            <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
  );
}
