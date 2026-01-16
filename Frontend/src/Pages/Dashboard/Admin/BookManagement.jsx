import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 fetch all books (admin)
  const fetchBooks = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/books/admin/all`,
        { headers: authHeader() }
      );

      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch {
      alert("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔁 toggle active / pending
  const toggleStatus = async (id) => {
    const ok = window.confirm("Change book status?");
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/books/${id}/toggle-status`,
        {
          method: "PATCH",
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (!data.success) {
        alert("Failed to update status");
        return;
      }

      fetchBooks(); // 🔄 refresh list
    } catch {
      alert("Server error");
    }
  };

  // ❌ delete book
  const deleteBook = async (id) => {
    const ok = window.confirm("Delete this book?");
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/books/${id}`,
        {
          method: "DELETE",
          headers: authHeader(),
        }
      );

      const data = await res.json();
      if (!data.success) {
        alert("Failed to delete book");
        return;
      }

      fetchBooks(); // 🔄 refresh list
    } catch {
      alert("Server error");
    }
  };

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">
        📚 Book Management (Admin)
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg p-4 flex flex-col"
          >
            {/* 🖼️ COVER IMAGE */}
            <img
              src={`http://localhost:3000${book.cover}?v=${book._id}`}
              alt={book.title}
              className="w-full h-56 object-cover rounded mb-3"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />

            <h3 className="font-semibold text-lg">
              {book.title}
            </h3>

            <p className="text-sm text-gray-600 my-2">
              {book.abstract.slice(0, 80)}...
            </p>

            <p className="text-sm">
              Price: ৳{book.price}
            </p>

            <p className="text-sm mb-2">
              Status:{" "}
              <span
                className={
                  book.status === "active"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              >
                {book.status}
              </span>
            </p>

            {/* 📄 PDF */}
            <a
              href={`http://localhost:3000${book.pdfUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm mb-3"
            >
              View PDF
            </a>

            {/* 🔘 ACTION BUTTONS */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => toggleStatus(book._id)}
                className={`px-3 py-1 text-white rounded ${
                  book.status === "active"
                    ? "bg-orange-500"
                    : "bg-green-600"
                }`}
              >
                {book.status === "active"
                  ? "Deactivate"
                  : "Activate"}
              </button>

              <button
                onClick={() => deleteBook(book._id)}
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

export default BookManagement;
