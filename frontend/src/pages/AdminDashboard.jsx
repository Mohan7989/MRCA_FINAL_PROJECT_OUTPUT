import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = "http://localhost:8080/api/admin"; // Update after deployment

  // ✅ Load data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const pendingRes = await fetch(`${backendUrl}/pending`);
      const approvedRes = await fetch(`${backendUrl}/approved`);
      setPending(await pendingRes.json());
      setApproved(await approvedRes.json());
    } catch (err) {
      console.error("Error loading data:", err);
    }
    setLoading(false);
  };

  // ✅ Approve Material
  const handleApprove = async (id) => {
    if (!window.confirm("Approve this material?")) return;
    await fetch(`${backendUrl}/approve/${id}`, { method: "PUT" });
    fetchAllData();
  };

  // ✅ Delete Material
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material?")) return;
    await fetch(`${backendUrl}/delete/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Admin Dashboard – Manage Materials
      </h1>

      {/* Pending Materials */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-yellow-700">Pending Materials</h2>
        {pending.length === 0 ? (
          <p>No pending materials 🎉</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Semester</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((m) => (
                <tr key={m.id}>
                  <td className="p-2 border">{m.title}</td>
                  <td className="p-2 border">{m.subject}</td>
                  <td className="p-2 border">{m.year}</td>
                  <td className="p-2 border">{m.semester}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleApprove(m.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Approved Materials */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-green-700">Approved Materials</h2>
        {approved.length === 0 ? (
          <p>No approved materials yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Semester</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((m) => (
                <tr key={m.id}>
                  <td className="p-2 border">{m.title}</td>
                  <td className="p-2 border">{m.subject}</td>
                  <td className="p-2 border">{m.year}</td>
                  <td className="p-2 border">{m.semester}</td>
                  <td className="p-2 border">
                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 mt-10">
        Built by Mohan © 2025 All Rights Reserved
      </footer>
    </div>
  );
}
