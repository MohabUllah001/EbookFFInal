import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/books/author/my`,
        {
          headers: authHeader(),
        }
      );

      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
      } else {
        alert("Failed to load books");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your books...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">
        📖 My Published Books
      </h2>

      {books.length === 0 && (
        <p className="text-gray-500">
          You have not published any books yet.
        </p>
      )}

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
                  "https://via.placeholder.com/300x400?text=No+Cover";
              }}
            />

            {/* 📘 TITLE */}
            <h3 className="font-semibold text-lg">
              {book.title}
            </h3>

            {/* 📝 ABSTRACT */}
            <p className="text-sm text-gray-600 my-2">
              {book.abstract.slice(0, 80)}...
            </p>

            {/* 💰 PRICE */}
            <p className="text-sm mb-1">
              Price: ৳{book.price}
            </p>

            {/* 🔄 STATUS */}
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

            {/* 📄 PDF LINK */}
            <a
              href={`http://localhost:3000${book.pdfUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm mt-auto"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
