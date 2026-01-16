import { useState, useMemo } from "react";
import useBook from "../../../Data/useBook";
import BookCard from "../../../Component/Shared/BookCard";

const AllBookTogether = () => {
  const { books, loading } = useBook();
  const [sortType, setSortType] = useState("default");

  const sortedBooks = useMemo(() => {
    let sorted = [...books];

    if (sortType === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "za") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortType === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sortType === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [books, sortType]);

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="space-y-6">

      {/* 🔽 SORT BAR */}
      <div className="flex justify-end">
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="default">Sort By</option>
          <option value="az">Title: A - Z</option>
          <option value="za">Title: Z - A</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>
      </div>

      {/* 📚 BOOK LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBooks.map((book) => (
          <BookCard key={book._id || book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBookTogether;
