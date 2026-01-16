import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Author Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* 📚 My Library */}
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📚 My Library</h2>
          <p>Books you purchased</p>
          <button
            onClick={() => navigate("/dashboard/author/library")}
            className="mt-3 text-[#3059b8]"
          >
            View Library
          </button>
        </div>

        {/* 📖 My Books */}
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📖 My Books</h2>
          <p>Books you published (Pending / Active)</p>
          <button
            onClick={() => navigate("/dashboard/author/books")}
            className="mt-3 text-[#3059b8]"
          >
            Manage Books
          </button>
        </div>

        {/* ➕ Add New Book */}
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">➕ Add New Book</h2>
          <p>Create a new book</p>
          <button
            onClick={() => navigate("/dashboard/author/books/new")}
            className="mt-3 text-[#3059b8]"
          >
            Add Book
          </button>
        </div>

        {/* 📝 My Blogs */}
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📝 My Blogs</h2>
          <p>Blogs you created</p>
          <button
            onClick={() => navigate("/dashboard/author/blogs")}
            className="mt-3 text-[#3059b8]"
          >
            View Blogs
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthorDashboard;
