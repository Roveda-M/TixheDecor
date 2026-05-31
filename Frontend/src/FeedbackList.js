import { useEffect, useMemo, useState } from "react";
import { api, formatApiError } from "./api";

const getReviewerName = (item) =>
  item.rekomandimi ||
  item.user?.fullname ||
  item.user?.username ||
  item.user?.emri ||
  item.user?.email ||
  "Klient";

const formatDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setIsLoading(true);
        const data = await api.getVleresimet();
        setFeedbacks(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        setError(formatApiError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  const averageRating = useMemo(() => {
    const rated = feedbacks.filter((item) => item.piket != null);
    if (!rated.length) return "0.0";
    const total = rated.reduce((sum, item) => sum + Number(item.piket || 0), 0);
    return (total / rated.length).toFixed(1);
  }, [feedbacks]);

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a67c52]">
          Reviews
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[#2b2b2b]">
          Customer Reviews
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#e2d8c8] bg-[#f7f3ec] p-4">
            <p className="text-3xl font-semibold text-[#2b2b2b]">{averageRating}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7a6b5d]">
              Rating
            </p>
          </div>
          <div className="rounded-xl border border-[#e2d8c8] bg-[#f7f3ec] p-4">
            <p className="text-3xl font-semibold text-[#2b2b2b]">{feedbacks.length}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7a6b5d]">
              Reviews
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-[#e2d8c8] bg-[#f7f3ec] p-8 text-center text-[#7a6b5d]">
          Duke ngarkuar reviews...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Reviews nuk u ngarkuan: {error}
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9c1b5] bg-[#f7f3ec] p-8 text-center">
          <p className="text-lg font-semibold text-[#2b2b2b]">Ende nuk ka reviews.</p>
          <p className="mt-2 text-sm text-[#7a6b5d]">
            Feedback-et qe dergohen nga forma do te shfaqen ketu.
          </p>
        </div>
      ) : (
        <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
          {feedbacks.map((item) => {
            const rating = Math.max(0, Math.min(5, Number(item.piket || 0)));
            return (
              <article
                key={item.vleresimiId}
                className="rounded-2xl border border-[#e2d8c8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2b2b2b]">
                      {getReviewerName(item)}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9b8a77]">
                      {formatDate(item.dataVleresimit) || "Review"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xl leading-none">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= rating ? "text-[#d4a017]" : "text-[#dfd7cc]"}
                      >
                        *
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-[#5f554b]">
                  {item.komenti || "Pa koment."}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
