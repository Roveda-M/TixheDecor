import { useEffect, useState } from "react";
import { api, formatApiError } from "./api";
import { useConfirmModal } from "./ConfirmModal";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { alertDialog, ConfirmModal } = useConfirmModal();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.getProfile();
        setName(profile.fullname || profile.username || "");
      } catch (error) {
        // Forma mbetet e plotesueshme edhe nese profili nuk ngarkohet.
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alertDialog("Shkruaj emrin");
    if (!text.trim()) return alertDialog("Shkruaj feedback");
    if (rating === 0) return alertDialog("Zgjedh rating");

    setLoading(true);
    try {
      await api.createFeedback({
        piket: Number(rating),
        komenti: text,
        rekomandimi: name,
      });

      setText("");
      setRating(0);
      await alertDialog("Feedback u ruajt me sukses!");
    } catch (error) {
      await alertDialog("Feedback nuk u ruajt: " + formatApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-2xl shadow-xl">
      <ConfirmModal />
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

        <div className="flex gap-2 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "text-yellow-400" : "text-gray-300"}
              aria-label={`Rating ${star}`}
            >
              ★
            </button>
          ))}
        </div>

        <button disabled={loading} className="bg-black text-white py-2 rounded-lg disabled:opacity-60">
          {loading ? "Duke ruajtur..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
