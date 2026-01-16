import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 fetch all users (admin)
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/users`,
        {
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        alert(data.message || "Failed to load users");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔄 activate / deactivate user
  const toggleStatus = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to change this user's status?"
    );
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${id}/toggle-status`,
        {
          method: "PATCH",
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchUsers(); // refresh list
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">
        👥 All Users
      </h2>

      {users.length === 0 && (
        <p className="text-gray-500">
          No users found
        </p>
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600">
                {user.email}
              </p>
              <p className="text-sm">
                Role:{" "}
                <span className="font-medium">
                  {user.role}
                </span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    user.isActive
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>

            <button
              onClick={() => toggleStatus(user._id)}
              className={`px-4 py-2 rounded text-white ${
                user.isActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {user.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
