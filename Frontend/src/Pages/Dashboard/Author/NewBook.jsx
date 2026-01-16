import { useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const NewBook = () => {
  const [form, setForm] = useState({
    title: "",
    abstract: "",
    category: "",
    price: "",
  });

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cover || !pdf) {
      alert("Cover & PDF required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("abstract", form.abstract);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("cover", cover);
    formData.append("pdf", pdf);

    try {
      const res = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: authHeader().Authorization,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      alert("Book submitted for admin approval!");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Book Title"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <textarea
          name="abstract"
          placeholder="Abstract"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBook;
