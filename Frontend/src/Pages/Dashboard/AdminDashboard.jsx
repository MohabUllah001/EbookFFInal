import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "👤 User Management",
      desc: "View all users",
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
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            className="border p-6 rounded cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
