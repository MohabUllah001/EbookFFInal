import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const AuthorRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔐 fetch all pending author requests
    const fetchRequests = async () => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/author-requests`,
                {
                    headers: authHeader(),
                }
            );

            const data = await res.json();
            if (data.success) {
                setRequests(data.data);
            }
        } catch (_) {
            console.error("Failed to load author requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // ✅ approve author
    const approveAuthor = async (id) => {
        const ok = window.confirm("Approve this user as Author?");
        if (!ok) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/author-requests/${id}/approve`,
                {
                    method: "PATCH",
                    headers: authHeader(),
                }
            );

            const data = await res.json();
            if (data.success) {
                alert("Author approved!");
                fetchRequests();
            }
        } catch (_) {
            alert("Failed to approve author");
        }
    };

    // ❌ reject author
    const rejectAuthor = async (id) => {
        const ok = window.confirm("Reject this author request?");
        if (!ok) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/author-requests/${id}/reject`,
                {
                    method: "PATCH",
                    headers: authHeader(),
                }
            );

            const data = await res.json();
            if (data.success) {
                alert("Author request rejected");
                fetchRequests();
            }
        } catch (_) {
            alert("Failed to reject request");
        }
    };

    if (loading) {
        return <p>Loading author requests...</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">
                👤 Author Requests
            </h2>

            {requests.length === 0 && (
                <p className="text-gray-500">
                    No pending author requests
                </p>
            )}

            <div className="space-y-4">
                {requests.map((user) => (
                    <div
                        key={user._id}
                        className="border p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                                Status: {user.status}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => approveAuthor(user._id)}
                                className="px-4 py-1 bg-green-600 text-white rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => rejectAuthor(user._id)}
                                className="px-4 py-1 bg-red-500 text-white rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorRequests;
