import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatApiError, hasRole } from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  const emailValid = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Ju lutem shtoni emailin");
      return;
    }

    if (!emailValid(email)) {
      alert("Ju lutem shtoni një email të vlefshëm");
      return;
    }

    if (password.trim() === "") {
      alert("Fjalëkalimi është i zbrazët");
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
      alert(formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
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
              <input
                  type="password"
                  name="tixhe-login-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  autoComplete="new-password"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute("readonly")}
              />
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

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="space-y-2">
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              Login with Apple
            </button>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              Login with Google
            </button>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              Login with Microsoft
            </button>
          </div>
        </div>
      </div>
  );
}