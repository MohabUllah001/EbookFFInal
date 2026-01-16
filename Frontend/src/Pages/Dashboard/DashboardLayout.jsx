import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AuthorDashboard from "./AuthorDashboard";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!data.success) throw new Error();

        setUser(data.user);
      } catch {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "author") return <AuthorDashboard />;
  return <UserDashboard />;
};

export default DashboardLayout;
