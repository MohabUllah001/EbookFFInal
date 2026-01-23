import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const navigate = useNavigate();

  // 🔐 logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* ===== AUTHOR HEADER ===== */}
      <div className="relative mb-10 rounded-2xl p-6 
                      bg-gradient-to-r from-[#0f766e] to-[#14b8a6] 
                      text-white shadow-lg overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 
                        bg-white/10 rounded-full blur-2xl"></div>

        <h1 className="text-3xl font-extrabold">
          ✍️ Author Dashboard
        </h1>

        {user && (
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
            <Info label="Name" value={user.name} />
            <Info label="Email" value={user.email} />
          </div>
        )}
      </div>

      {/* ===== DASHBOARD CARDS ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <AuthorCard
          icon="📚"
          title="My Library"
          desc="Books you have purchased"
          action="View Library →"
          onClick={() => navigate("/dashboard/author/library")}
        />

        <AuthorCard
          icon="📖"
          title="My Books"
          desc="Books you published (Pending / Active)"
          action="Manage Books →"
          onClick={() => navigate("/dashboard/author/books")}
        />

        <AuthorCard
          icon="➕"
          title="Add New Book"
          desc="Create and publish a new book"
          action="Add Book →"
          onClick={() => navigate("/dashboard/author/books/new")}
        />

        <AuthorCard
          icon="📝"
          title="My Blogs"
          desc="Blogs you have created"
          action="View Blogs →"
          onClick={() => navigate("/dashboard/author/blogs")}
        />

        {/* 👤 UPDATE PROFILE */}
        <AuthorCard
          icon="👤"
          title="Update Profile"
          desc="Change your name or password"
          action="Update Profile →"
          onClick={() => navigate("/dashboard/author/profile")}
        />

      </div>
    </div>
  );
};

/* ===== REUSABLE UI COMPONENTS ===== */

const Info = ({ label, value }) => (
  <div className="bg-white/15 backdrop-blur-md rounded-lg p-3">
    <p className="text-xs uppercase text-white/70">
      {label}
    </p>
    <p className="font-semibold truncate">
      {value}
    </p>
  </div>
);

const AuthorCard = ({ icon, title, desc, action, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer rounded-2xl p-8 bg-white
               shadow-md hover:shadow-xl transition
               transform hover:-translate-y-1 border border-gray-100"
  >
    <div className="text-4xl mb-4">
      {icon}
    </div>

    <h2 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition">
      {title}
    </h2>

    <p className="text-gray-600 mb-6">
      {desc}
    </p>

    <div className="text-teal-600 font-semibold 
                    group-hover:translate-x-1 transition">
      {action}
    </div>
  </div>
);

export default AuthorDashboard;
