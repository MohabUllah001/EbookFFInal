import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔐 logged-in admin info
  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
    {
      title: "👤 User Management",
      desc: "View and manage all registered users",
      path: "/dashboard/admin/users",
    },
    {
      title: "✍️ Author Requests",
      desc: "Approve or reject author applications",
      path: "/dashboard/admin/authors",
    },
    {
      title: "📝 Blog Management",
      desc: "Approve or delete blogs",
      path: "/dashboard/admin/blogs",
    },
    {
      title: "📚 Book Management",
      desc: "Approve or delete books",
      path: "/dashboard/admin/books",
    },
    {
      title: "👤 Update Profile",
      desc: "Change your name or password",
      path: "/dashboard/admin/profile",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* ===== ADMIN HEADER ===== */}
      <div className="relative mb-10 rounded-2xl p-6 
                      bg-linear-to-r from-[#1e293b] to-[#334155] 
                      text-white shadow-lg overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 
                        bg-white/10 rounded-full blur-2xl"></div>

        <h1 className="text-3xl font-extrabold">
          Admin Dashboard
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <AdminCard
            key={card.path}
            title={card.title}
            desc={card.desc}
            onClick={() => navigate(card.path)}
          />
        ))}
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
    <p className="font-semibold truncate">
      {value}
    </p>
  </div>
);

const AdminCard = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer rounded-2xl p-8 bg-white shadow-md
               hover:shadow-xl transition transform hover:-translate-y-1
               border border-gray-100"
  >
    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">
      {title}
    </h2>

    <p className="text-gray-600">
      {desc}
    </p>

    <div className="mt-6 text-blue-500 font-semibold 
                    group-hover:translate-x-1 transition">
      Open →
    </div>
  </div>
);

export default AdminDashboard;
