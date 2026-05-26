import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setUser(data);
      } catch (error) {
        console.error("Gabim:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Duke ngarkuar...</div>;

  return (
      <div className="min-h-screen bg-[#f6f1e8] flex flex-col md:flex-row pt-24">

        {/* SIDEBAR */}
        <aside className="w-full md:w-72 bg-white shadow-md p-6 flex-shrink-0">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-[#e6dfd3] rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <h3 className="mt-3 font-medium">{user?.emri || "Përdoruesi"}</h3>
            <p className="text-xs text-gray-500">{user?.statusi || "Aktiv"}</p>
          </div>

          <div className="flex flex-col space-y-2 text-sm">
            {["account", "wishlist"].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left py-2 px-3 rounded transition ${
                        activeTab === tab ? "bg-[#e6dfd3] text-black font-medium" : "hover:bg-gray-100"
                    }`}
                >
                  {tab === "account" && "Account Details"}
                  {tab === "wishlist" && "Wishlist"}
                </button>
            ))}

            <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 text-red-500 hover:bg-red-50 rounded"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-10">

          {activeTab === "account" && (
              <div>
                <h2 className="text-2xl mb-6 font-light tracking-wide">Account Details</h2>
                <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="text-lg font-medium">{user?.emri || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Emri</label>
                    <p className="text-lg font-medium">{user?.emri || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-lg font-medium">{user?.email || "-"}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Statusi</label>
                    <p className="text-lg font-medium">{user?.statusi || "Aktiv"}</p>
                  </div>
                </div>
              </div>
          )}

          {activeTab === "wishlist" && (
              <div>
                <h2 className="text-2xl mb-6 font-light tracking-wide">Wishlist</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {["Wedding", "Birthday", "Baby Shower", "Engagement"].map(event => (
                      <div key={event} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="w-full h-32 bg-[#e6dfd3] rounded-xl mb-3 flex items-center justify-center text-2xl">
                          🌸
                        </div>
                        <p className="font-medium">{event}</p>
                        <p className="text-sm text-gray-500">Dekorim special</p>
                      </div>
                  ))}
                </div>
              </div>
          )}

        </main>
      </div>
  );
}
