import { useNavigate } from "react-router-dom";
import { API_BASE_URL, authHeader } from "../../config/api";

const UserDashboard = () => {
  const navigate = useNavigate();

  // 🔐 logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 REAL APPLY AS AUTHOR
  const applyAuthor = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/author-requests/apply`,
        {
          method: "POST",
          headers: authHeader(),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Author application submitted! Waiting for admin approval."
        );
      } else {
        alert(data.message || "Already applied");
      }
    } catch (error) {
      alert("Failed to apply as author");
      console.log(
        error
      );

    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* ===== USER HEADER ===== */}
      <div className="relative mb-10 rounded-2xl p-6 bg-gradient-to-r from-[#3059b8] to-[#5b8cff] text-white shadow-lg overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

        <h1 className="text-3xl font-extrabold">
          Welcome Back, <span className="font-bold uppercase">{user.name}</span>
        </h1>

        {user && (
          <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
            <Info label="Name" value={user.name} />
            <Info label="Email" value={user.email} />
            <Info label="Role" value={user.role} />
          </div>
        )}
      </div>

      {/* ===== DASHBOARD CARDS ===== */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* 📚 My Library */}
        <DashboardCard>
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-bold mb-2">
            My Library
          </h2>
          <p className="text-gray-600 mb-6">
            Access all the books you have purchased in one place.
          </p>
          <ActionButton
            onClick={() => navigate("/dashboard/user/library")}
          >
            View Books →
          </ActionButton>
        </DashboardCard>

        {/* ✍️ Apply as Author */}
        <DashboardCard>
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-xl font-bold mb-2">
            Become an Author
          </h2>
          <p className="text-gray-600 mb-6">
            Share your knowledge, publish books, and inspire readers.
          </p>
          <ActionButton onClick={applyAuthor}>
            Apply Now →
          </ActionButton>
        </DashboardCard>
        {/* 👤 Update Profile */}
        <DashboardCard>
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-xl font-bold mb-2">
            Update Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Update your personal information, password, and profile details.
          </p>
          <ActionButton
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update Profile →
          </ActionButton>
        </DashboardCard>

      </div>
    </div>
  );
};

/* ===== REUSABLE UI COMPONENTS ===== */

const Info = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
    <p className="text-xs uppercase text-white/70">
      {label}
    </p>
    <p className="font-semibold">
      {value}
    </p>
  </div>
);

const DashboardCard = ({ children }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl 
                  transition transform hover:-translate-y-1">
    <div className="group-hover:scale-105 transition">
      {children}
    </div>
  </div>
);

const ActionButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 text-[#3059b8] 
               font-semibold hover:text-[#1e3a8a] transition"
  >
    {children}
  </button>
);

export default UserDashboard;
