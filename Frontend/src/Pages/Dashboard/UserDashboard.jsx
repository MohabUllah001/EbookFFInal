import { useNavigate } from "react-router-dom";
import { API_BASE_URL, authHeader } from "../../config/api";

const UserDashboard = () => {
  const navigate = useNavigate();

  // 🔥 REAL APPLY AS AUTHOR
  const applyAuthor = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/author-requests/apply`,
        {
          method: "POST",
          headers: authHeader(),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Author application submitted! Waiting for admin approval.");
      } else {
        alert(data.message || "Already applied");
      }
    } catch (_) {
      alert("Failed to apply as author");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        User Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📚 My Library</h2>
          <p>Your purchased books</p>
          <button
            onClick={() => navigate("/library")}
            className="mt-3 text-[#3059b8]"
          >
            View Books
          </button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">✍️ Apply as Author</h2>
          <p>Become a content creator</p>
          <button
            onClick={applyAuthor}
            className="mt-3 text-[#3059b8]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
