import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [materials, setMaterials] = useState([]);

  const fetchPending = async () => {
    const res = await fetch("http://localhost:8080/api/admin/pending");
    const data = await res.json();
    setMaterials(data);
  };

  const approve = async (id) => {
    await fetch(`http://localhost:8080/api/admin/approve/${id}`, { method: "PUT" });
    fetchPending();
  };

  const reject = async (id) => {
    await fetch(`http://localhost:8080/api/admin/reject/${id}`, { method: "DELETE" });
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Uploads</h2>
      {materials.length === 0 ? (
        <p>No pending materials 🎉</p>
      ) : (
        materials.map((m) => (
          <div key={m.id} className="border p-4 rounded mb-2">
            <h3>{m.title}</h3>
            <p>{m.subject} | {m.semester} | {m.year}</p>
            <button className="bg-green-500 text-white p-2 m-1" onClick={() => approve(m.id)}>Approve</button>
            <button className="bg-red-500 text-white p-2 m-1" onClick={() => reject(m.id)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
}
