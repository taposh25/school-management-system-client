

import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Students = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load default 10 students
  useEffect(() => {
    axiosSecure.get("/students").then(res => {
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  // 🔹 Search handler
  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.length < 2) {
      setSuggestions([]);
      axiosSecure.get("/students").then(res => {
        setStudents(res.data);
      });
      return;
    }

    const res = await axiosSecure.get(`/students/search?q=${text}`);
    setSuggestions(res.data);
    setStudents(res.data);
  };

  // 🔹 Select from suggestion
  const handleSelect = (student) => {
    setSearchText(student.studentName);
    setStudents([student]);
    setSuggestions([]);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading students...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-semibold mb-4">
        Student Search
      </h1>

      {/* 🔍 Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by student name..."
          className="input input-bordered w-full"
        />

        {/* 🔽 Autocomplete */}
        {suggestions.length > 0 && (
          <ul className="menu bg-base-100 shadow rounded-box absolute w-full mt-1 z-20">
            {suggestions.map((s) => (
              <li key={s._id}>
                <button onClick={() => handleSelect(s)}>
                  {s.studentName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📋 Student List */}
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student._id} className="card bg-base-100 shadow border">
            <div className="card-body">
              <h2 className="card-title">
                👨‍🎓 {student.studentName}
              </h2>

              <ul className="list-disc ml-5 text-sm">
                <li><strong>Class:</strong> {student.class}</li>
                <li><strong>Father:</strong> {student.fatherName}</li>
                <li><strong>Mother:</strong> {student.motherName}</li>
                <li><strong>Guardian:</strong> {student.guardianContact}</li>
              </ul>
            </div>
          </div>
        ))}

        {students.length === 0 && (
          <p className="text-center text-gray-500">
            No students found
          </p>
        )}
      </div>
    </div>
  );
};

export default Students;
