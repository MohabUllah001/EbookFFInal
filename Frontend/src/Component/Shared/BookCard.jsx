import { NavLink } from "react-router-dom";
import { addToCartList } from "../../Data/addToCartList";

const BookCard = ({ book }) => {
  const handleAddToCart = () => {
    addToCartList(book);

    // 🔥 notify navbar to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">

      {/* 📘 Book Image */}
      <NavLink to={`/all-books/${book.id}`}>
        <img
          src={book.cover}
          alt={book.title}
          className="h-52 w-full object-cover rounded mb-3"
        />
      </NavLink>

      {/* 📕 Book Title */}
      <NavLink to={`/all-books/${book.id}`}>
        <h3 className="font-semibold text-gray-800 hover:text-[#3059b8]">
          {book.title}
        </h3>
      </NavLink>

      {/* ℹ️ Extra Info */}
      <p className="text-sm text-gray-500 mt-1">
        Category: {book.category}
      </p>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {book.abstract}
      </p>

      {/* 💰 Price + Cart Button */}
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
