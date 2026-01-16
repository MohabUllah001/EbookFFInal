import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // new blog form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // 🔐 fetch my blogs (AUTHOR)
  const fetchMyBlogs = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/my`,
        {
          headers: authHeader(),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Failed to load blogs");
      }

      setBlogs(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  // ➕ create new blog
  const submitBlog = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs`,
        {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify({
            title,
            description,
            image,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      alert("Blog submitted for admin approval!");
      setTitle("");
      setDescription("");
      setImage("");
      fetchMyBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">
        📝 My Blogs
      </h2>

      {/* 🔹 CREATE BLOG */}
      <div className="border rounded p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">
          ➕ Create New Blog
        </h3>

        <form onSubmit={submitBlog} className="space-y-4">
          <input
            className="border p-2 w-full"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
            Submit Blog
          </button>
        </form>
      </div>

      {/* 🔹 MY PUBLISHED BLOGS */}
      <h3 className="text-xl font-semibold mb-4">
        📚 My Published Blogs
      </h3>

      {blogs.length === 0 && (
        <p className="text-gray-500">
          You have not created any blogs yet.
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
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x250")
                }
              />
            )}

            <h4 className="font-semibold text-lg">
              {blog.title}
            </h4>

            <p className="text-sm text-gray-600 my-2">
              {blog.description.slice(0, 100)}...
            </p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={
                  blog.status === "active"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              >
                {blog.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
