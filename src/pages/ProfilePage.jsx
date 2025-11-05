import { useContext, useState } from "react";
import { AuthContext } from "./authentication/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    provider: user?.provider || "",
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    //should update user data with the url
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      provider: user.provider,
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b pb-6 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {formData.name}
              </h2>
              <p className="text-gray-500 text-sm">{formData.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="hover:text-yellow-400 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="hover:text-yellow-400 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Edit
            </button>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full rounded-lg px-4 py-3 text-gray-700 border ${
                isEditing
                  ? "bg-white border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full rounded-lg px-4 py-3 text-gray-700 border ${
                isEditing
                  ? "bg-white border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
          </div>

          {/* Provider */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Provider
            </label>
            <input
              type="text"
              value={formData.provider}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Joined
            </label>
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString("en-US")}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              value={user.isAdmin ? "Admin" : "User"}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 flex justify-between">
          <button
            onClick={() => navigate(user.isAdmin ? "/admin/dashboard" : "/")}
            className="hover:text-yellow-400 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
          >
            {user.isAdmin ? "Go to Dashboard" : "Back Home"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
