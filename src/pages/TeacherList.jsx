
import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const TeacherList = () => {
  const axiosSecure = useAxiosSecure();

  const [teachers, setTeachers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Load all teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosSecure.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [axiosSecure]);

  // 🔍 Debounced Search
  const handleSearch = useCallback(
    async (text) => {
      setSearchText(text);

      try {
        setLoading(true);
        setError("");

        if (!text || text.length < 2) {
          await fetchTeachers();
          return;
        }

        const res = await axiosSecure.get(
          `/teachers/search?q=${text}`
        );
        setTeachers(res.data);
      } catch (err) {
        console.error(err);
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure]
  );

  // 🗑 Delete Teacher
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/teachers/${id}`);
      setTeachers((prev) =>
        prev.filter((t) => t._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Teacher List
      </h2>

      {/* 🔍 Search */}
      <input
        type="text"
        className="input input-bordered w-full mb-4"
        placeholder="Search teacher name..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* ⚠ Error */}
      {error && (
        <p className="text-red-500 mb-2 text-center">
          {error}
        </p>
      )}

      {/* ⏳ Loading */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      )}

      {/* 📋 Teacher Cards */}
      {!loading && teachers.length > 0 && (
        <div className="grid gap-4">
          {teachers.map((t) => (
            <div
              key={t._id}
              className="card p-4 border flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {t.name}
                </h3>
                <p>Department: {t.department || "N/A"}</p>
                <p>
                  Classes:{" "}
                  {Array.isArray(t.classes)
                    ? t.classes.join(", ")
                    : t.classes || "N/A"}
                </p>
                <p>Phone: {t.phone || "N/A"}</p>
              </div>

              <button
                onClick={() => handleDelete(t._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🚫 Empty */}
      {!loading && teachers.length === 0 && (
        <p className="text-center text-gray-500">
          No teachers found
        </p>
      )}
    </div>
  );
};

export default TeacherList;
