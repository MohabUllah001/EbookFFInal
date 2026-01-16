import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 ADMIN → fetch ALL blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/admin/all`,
        {
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🔁 toggle active / pending
  const toggleStatus = async (id) => {
    const ok = window.confirm(
      "Change blog active status?"
    );
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/${id}/toggle-status`,
        {
          method: "PATCH",
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBlogs();
      }
    } catch {
      alert("Failed to update status");
    }
  };

  // ❌ delete blog
  const deleteBlog = async (id) => {
    const ok = window.confirm(
      "Delete this blog permanently?"
    );
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/${id}`,
        {
          method: "DELETE",
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (data.success) {
        fetchBlogs();
      }
    } catch {
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">
        📝 Blog Management (Admin)
      </h2>

      {blogs.length === 0 && (
        <p className="text-gray-500">
          No blogs found
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded p-4"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}

            <h3 className="font-semibold text-lg">
              {blog.title}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              {blog.description.slice(0, 100)}...
            </p>

            <p className="text-sm mb-3">
              Status:{" "}
              <span
                className={
                  blog.status === "active"
                    ? "text-green-600 font-medium"
                    : "text-orange-500 font-medium"
                }
              >
                {blog.status}
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => toggleStatus(blog._id)}
                className={`px-3 py-1 rounded text-white ${
                  blog.status === "active"
                    ? "bg-orange-500"
                    : "bg-green-600"
                }`}
              >
                {blog.status === "active"
                  ? "Deactivate"
                  : "Activate"}
              </button>

              <button
                onClick={() => deleteBlog(blog._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
