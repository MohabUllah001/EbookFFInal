import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import useBook from "../../../Data/useBook";
import BookCard from "../../../Component/Shared/BookCard";

const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Biography & Memoir",
  "Horror",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery & Thriller",
  "Sport",
];

const AllBookTogether = () => {
  const location = useLocation();
  const { books, loading } = useBook();

  // ✅ initial category from Home
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All"
  );

  const [sortType, setSortType] = useState("default");

  // 🔁 category + sort
  const filteredAndSortedBooks = useMemo(() => {
    let list = [...books];

    // 📂 CATEGORY FILTER
    if (selectedCategory !== "All") {
      list = list.filter(
        (book) =>
          book.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      );
    }

    // 🔠 SORTING
    if (sortType === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "za") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortType === "priceLow") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortType === "priceHigh") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [books, selectedCategory, sortType]);

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="space-y-6">

      {/* 🔽 FILTER BAR */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">

        {/* 📂 CATEGORY DROPDOWN */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-60"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 🔽 SORT DROPDOWN */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-60"
        >
          <option value="default">Sort By</option>
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>
      </div>

      {/* 📚 BOOK LIST */}
      {filteredAndSortedBooks.length === 0 ? (
        <p className="text-gray-500">
          No books found
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookTogether;
