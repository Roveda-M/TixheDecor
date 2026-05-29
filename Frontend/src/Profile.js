import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";

export default function Profile() {
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

  const displayName = user?.fullname || user?.username || "Perdoruesi";

  if (loading) return <div className="min-h-screen flex items-center justify-center">Duke ngarkuar...</div>;

  return (
      <div className="min-h-screen bg-[#f6f1e8] flex flex-col md:flex-row pt-24">

        {/* SIDEBAR */}
        <aside className="w-full md:w-72 bg-white shadow-md p-6 flex-shrink-0">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-[#e6dfd3] rounded-full flex items-center justify-center text-3xl">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <h3 className="mt-3 font-medium">{displayName}</h3>
            <p className="text-xs text-gray-500">{user?.statusi || "Aktiv"}</p>
          </div>

          <div className="flex flex-col space-y-2 text-sm">
            <button
                type="button"
                className="w-full text-left py-2 px-3 rounded bg-[#e6dfd3] text-black font-medium"
            >
              Account Details
            </button>

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

          <div>
            <h2 className="text-2xl mb-6 font-light tracking-wide">Account Details</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="text-lg font-medium">{user?.fullname || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <p className="text-lg font-medium">{user?.username || "-"}</p>
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

        </main>
      </div>
  );
}
