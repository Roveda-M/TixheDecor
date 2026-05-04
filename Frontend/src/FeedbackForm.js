import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Shkruaj emrin");
    if (!text.trim()) return alert("Shkruaj feedback");
    if (rating === 0) return alert("Zgjedh rating");

    const old = JSON.parse(localStorage.getItem("feedbacks")) || [];

    const newFeedback = {
      id: Date.now(),
      name,
      text,
      rating,
    };

    localStorage.setItem(
      "feedbacks",
      JSON.stringify([newFeedback, ...old])
    );

    setName("");
    setText("");
    setRating(0);

 
    
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold text-center mb-4">
        Leave Feedback
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="p-3 border rounded-lg"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Feedback"
          className="p-3 border rounded-lg h-28"
        />

        {/* STARS */}
        <div className="flex gap-2 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <button className="bg-black text-white py-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}