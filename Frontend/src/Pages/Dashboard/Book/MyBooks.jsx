import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

const MyBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 safety check
  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  // 📚 fetch purchased books
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/purchases/my-books`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok || data.success === false) {
          throw new Error(
            data.message || "Failed to load books"
          );
        }

        setBooks(data.data); // ✅ backend books
      } catch (err) {
        console.error(err);
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [token]);

  // ⏳ loading
  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading your library...
      </div>
    );
  }

  // ❌ error
  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        📚 My Library
      </h2>

      {books.length === 0 ? (
        <p className="text-gray-600">
          You have not purchased any books yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-48 w-full object-cover rounded-t"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-600">
                  Author: {book.author?.name || "Unknown"}
                </p>

                <p className="text-sm text-gray-600">
                  Language: {book.language}
                </p>

                <p className="text-sm text-gray-600">
                  Purchased on:{" "}
                  {new Date(
                    book.purchasedAt
                  ).toLocaleDateString()}
                </p>

                <button
                  className="mt-3 w-full bg-[#3059b8] text-white py-2 rounded"
                  onClick={() =>
                    navigate(`/reader/${book._id}`)
                  }
                >
                  Read Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBook;
