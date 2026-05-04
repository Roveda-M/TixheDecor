import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleSubmit = (e) => {
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

    alert("Login i suksesshëm ✅");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <br />
          <br />
          <br />
          <h2 className="text-2xl font-light text-center mb-6 tracking-[2px]">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm">Email</label>
              <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm">Password</label>
              <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* BUTTON */}
            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
            >
              Login
            </button>

            <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </p>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="space-y-2">
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              Login with Apple
            </button>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              🌐 Login with Google
            </button>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
              🪟 Login with Microsoft
            </button>
          </div>

        </div>
      </div>
  );
}