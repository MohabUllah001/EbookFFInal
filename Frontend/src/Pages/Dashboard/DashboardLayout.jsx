import { Navigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AuthorDashboard from "./AuthorDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  // 🔐 login required
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🎯 role based dashboard
  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  if (user.role === "author") {
    return <AuthorDashboard />;
  }

  return <UserDashboard />;
};

export default DashboardLayout;
