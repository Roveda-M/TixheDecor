import { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");

  const user = {
    fullname: "Tixhe User",
    username: "user",
    email: "user@example.com",
    phone: "",
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] flex flex-col md:flex-row pt-24">

      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white shadow-md p-6 flex-shrink-0">

        {/* USER INFO */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <h3 className="mt-3 font-medium break-words">{user.username}</h3>
          <p className="text-xs text-gray-500">Member since 2012</p>
        </div>

        {/* NAV - gjithmonë vertikale */}
        <div className="flex flex-col space-y-2 text-sm">
          {["account","orders","addresses","wishlist","security"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left py-2 px-3 rounded transition ${
                activeTab === tab ? "bg-gray-200 text-black font-medium" : "hover:bg-gray-100"
              }`}
            >
              {tab === "account" && "Account Details"}
              {tab === "orders" && "Order History"}
              {tab === "addresses" && "Addresses"}
              {tab === "wishlist" && "Wishlist"}
              {tab === "security" && "Security"}
            </button>
          ))}

          <button className="w-full text-left py-2 px-3 text-red-500 hover:bg-red-50 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-4 md:p-10">

        {/* ACCOUNT */}
        {activeTab === "account" && (
          <div>
            <h2 className="text-2xl mb-6">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 border rounded w-full" defaultValue={user.fullname} placeholder="Full Name" />
              <input className="p-3 border rounded w-full" defaultValue={user.username} placeholder="Username" />
              <input className="p-3 border rounded w-full md:col-span-2" defaultValue={user.email} placeholder="Email" />
              <input className="p-3 border rounded w-full md:col-span-2" defaultValue={user.phone} placeholder="Phone" />
            </div>

            <button className="mt-6 bg-black text-white px-6 py-2 rounded w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl mb-4">Order History</h2>
            <div className="bg-white p-4 rounded shadow space-y-2">
              <p>Delivered</p>
              <p>Processing</p>
            </div>
          </div>
        )}

        {/* ADDRESSES */}
        {activeTab === "addresses" && (
          <div>
            <h2 className="text-2xl mb-4">Addresses</h2>
            <div className="bg-white p-4 rounded shadow mb-3">
              Home Address - Ferizaj
            </div>
            <button className="border px-4 py-2 rounded w-full sm:w-auto">
              + Add New Address
            </button>
          </div>
        )}

        {/* WISHLIST */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-2xl mb-4">Wishlist</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-white p-4 rounded shadow">Dekor - €20</div>
              <div className="bg-white p-4 rounded shadow">Dekor - €85</div>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-2xl mb-4">Security</h2>
            <input className="p-3 border rounded w-full mb-2" placeholder="Current Password" />
            <input className="p-3 border rounded w-full mb-2" placeholder="New Password" />
            <input className="p-3 border rounded w-full mb-4" placeholder="Confirm Password" />
            <button className="bg-black text-white px-6 py-2 rounded w-full sm:w-auto">
              Update Password
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
