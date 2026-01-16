import { useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const NewBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/blogs`,
        {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify({
            ...form,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        alert(data.message || "Failed to create blog");
        return;
      }

      alert("Blog submitted for admin approval!");
      setForm({ title: "", description: "", image: "" });
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-xl">
      <h3 className="text-xl font-semibold mb-4">
        ➕ Create New Blog
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Blog Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL (optional)"
          className="border p-2 w-full"
          value={form.image}
          onChange={handleChange}
        />

        <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
