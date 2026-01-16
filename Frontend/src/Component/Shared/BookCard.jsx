import { NavLink } from "react-router-dom";
import { addToCartList } from "../../Data/addToCartList";

const BookCard = ({ book }) => {
  // 🛑 safety guard
  if (!book) return null;

  const bookId = book._id || book.id;

  if (!bookId) return null;

  const handleAddToCart = () => {
    addToCartList(book);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const imageUrl = book.cover
    ? book.cover.startsWith("http")
      ? book.cover
      : `http://localhost:3000${book.cover}`
    : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">

      {/* 📘 Book Image */}
      <NavLink to={`/all-books/${bookId}`}>
        <img
          src={imageUrl}
          alt={book.title}
          className="h-52 w-full object-cover rounded mb-3"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
      </NavLink>

      {/* 📕 Title */}
      <NavLink to={`/all-books/${bookId}`}>
        <h3 className="font-semibold text-gray-800 hover:text-[#3059b8]">
          {book.title}
        </h3>
      </NavLink>

      {/* 📝 Abstract */}
      {book.abstract && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {book.abstract}
        </p>
      )}

      {/* 💰 Price + Cart */}
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-[#3059b8]">
          ৳ {book.price}
        </span>

        <button
          onClick={handleAddToCart}
          className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded hover:bg-[#3059b8]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
