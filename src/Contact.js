import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

export default function Contact() {
  const [view, setView] = useState("contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const emailValid = (email) => {
    const emailRegex =
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.trim() === "") return alert("Shkruaj emrin");
    if (form.email.trim() === "") return alert("Shkruaj emailin");
    if (!emailValid(form.email)) return alert("Email jo valid");
    if (form.subject.trim() === "") return alert("Shkruaj subjectin");
    if (form.message.trim() === "") return alert("Shkruaj mesazhin");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#f7f3ec] to-[#eae6df] py-12 px-5 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col min-h-screen">

        {/* TITLE */}
        <br/>
        <br/>
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-[#2b2b2b]">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          Na kontaktoni ose leni feedback
        </p>

        {/* MAIN CONTENT */}
        <div
          className={`flex-1 ${
            view === "contact"
              ? "grid grid-cols-1 md:grid-cols-2 gap-8"
              : "flex justify-center"
          }`}
        >
          {/* LEFT SIDE */}
          <div className="bg-white p-6 rounded-2xl shadow-xl min-h-[420px] w-full md:w-[500px]">
            {view === "contact" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Send Message
                </button>
              </form>
            )}

            {view === "feedback" && <FeedbackForm />}
            {view === "reviews" && <FeedbackList />}
          </div>

          {/* RIGHT SIDE MAP */}
          {view === "contact" && (
            <div className="rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[420px]">
              <iframe
                title="Google Maps Ferizaj"
                className="w-full h-full border-0"
                src="https://www.google.com/maps?q=Ferizaj,Kosovo&output=embed"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* BUTTONS BOTTOM */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => {
              setView("contact");
              window.scrollTo(0, 0);
            }}
            className={`px-5 py-2 rounded-lg w-full sm:w-auto transition ${
              view === "contact"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => {
              setView("feedback");
              window.scrollTo(0, 0);
            }}
            className={`px-5 py-2 rounded-lg w-full sm:w-auto transition ${
              view === "feedback"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Feedback
          </button>

          <button
            onClick={() => {
              setView("reviews");
              window.scrollTo(0, 0);
            }}
            className={`px-5 py-2 rounded-lg w-full sm:w-auto transition ${
              view === "reviews"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
