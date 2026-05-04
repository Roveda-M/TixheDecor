import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const emailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.fullname.trim() === "") return alert("Shto emrin e plotë");
    if (form.email.trim() === "") return alert("Shto email");
    if (!emailValid(form.email)) return alert("Email i pavlefshëm");
    if (form.username.trim() === "") return alert("Shto username");
    if (form.password.trim() === "") return alert("Shto password");
    if (form.confirm.trim() === "") return alert("Konfirmo password");
    if (form.password !== form.confirm)
      return alert("Password nuk përputhen");
    if (form.password.length < 6)
      return alert("Password duhet me pas të paktën 6 karaktere");

    alert("Register i suksesshëm ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1e8] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl text-center mb-6 tracking-[2px] font-light">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* FULL NAME */}
          <input
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* USERNAME */}
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* CONFIRM PASSWORD */}
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>

        {/* SOCIAL */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="space-y-2">
          <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
             Register with Apple
          </button>
          <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
            🌐 Register with Google
          </button>
          <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
            🪟 Register with Microsoft
          </button>
        </div>

      </div>
    </div>
  );
}