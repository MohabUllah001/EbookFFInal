import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const MyPublishedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs/my`,
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
    fetchMyBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {blogs.length === 0 && (
        <p className="text-gray-500">
          You have not created any blogs yet.
        </p>
      )}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border rounded p-4"
        >
          <h3 className="font-semibold text-lg">
            {blog.title}
          </h3>

          <p className="text-sm text-gray-600 my-2">
            {blog.description.slice(0, 120)}...
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
  );
};

export default MyPublishedBlogs;
