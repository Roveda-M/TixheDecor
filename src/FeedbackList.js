import { useEffect, useState } from "react";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(data);
  }, []);

  return (
    <div className="max-w-3xl w-full">

      <h2 className="text-2xl font-semibold text-center mb-6">
        Customer Reviews
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">

          {feedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              {/* NAME */}
              <h3 className="font-semibold">{item.name}</h3>

              {/* STARS */}
              <div className="text-yellow-400">
                {"★".repeat(item.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - item.rating)}
                </span>
              </div>

              {/* TEXT */}
              <p className="text-gray-700 mt-2">{item.text}</p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}