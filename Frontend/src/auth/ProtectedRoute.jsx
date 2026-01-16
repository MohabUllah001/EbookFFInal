import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();
        setAllowed(true);
      } catch {
        localStorage.clear();
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return allowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
