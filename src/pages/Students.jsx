

// import { useEffect, useState } from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";

// const Students = () => {
//   const axiosSecure = useAxiosSecure();

//   const [searchText, setSearchText] = useState("");
//   const [students, setStudents] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Load default 10 students
//   useEffect(() => {
//     axiosSecure.get("/students").then(res => {
//       setStudents(res.data);
//       setLoading(false);
//     });
//   }, []);

//   // 🔹 Search handler
//   const handleSearch = async (text) => {
//     setSearchText(text);

//     if (text.length < 2) {
//       setSuggestions([]);
//       axiosSecure.get("/students").then(res => {
//         setStudents(res.data);
//       });
//       return;
//     }

//     const res = await axiosSecure.get(`/students/search?q=${text}`);
//     setSuggestions(res.data);
//     setStudents(res.data);
//   };

//   // 🔹 Select from suggestion
//   const handleSelect = (student) => {
//     setSearchText(student.studentName);
//     setStudents([student]);
//     setSuggestions([]);
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading students...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto relative">
//       <h1 className="text-2xl font-semibold mb-4">
//         Student Search
//       </h1>

//       {/* 🔍 Search Input */}
//       <div className="relative mb-6">
//         <input
//           type="text"
//           value={searchText}
//           onChange={(e) => handleSearch(e.target.value)}
//           placeholder="Search by student name..."
//           className="input input-bordered w-full"
//         />

//         {/* 🔽 Autocomplete */}
//         {suggestions.length > 0 && (
//           <ul className="menu bg-base-100 shadow rounded-box absolute w-full mt-1 z-20">
//             {suggestions.map((s) => (
//               <li key={s._id}>
//                 <button onClick={() => handleSelect(s)}>
//                   {s.studentName}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* 📋 Student List */}
//       <div className="space-y-4">
//         {students.map((student) => (
//           <div key={student._id} className="card bg-base-100 shadow border">
//             <div className="card-body">
//               <h2 className="card-title">
//                 👨‍🎓 {student.studentName}
//               </h2>

//               <ul className="list-disc ml-5 text-sm">
//                 <li><strong>Class:</strong> {student.class}</li>
//                 <li><strong>Father:</strong> {student.fatherName}</li>
//                 <li><strong>Mother:</strong> {student.motherName}</li>
//                 <li><strong>Guardian:</strong> {student.guardianContact}</li>
//               </ul>
//             </div>
//           </div>
//         ))}

//         {students.length === 0 && (
//           <p className="text-center text-gray-500">
//             No students found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Students;





import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Students = () => {
  const axiosSecure = useAxiosSecure();

  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Load all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosSecure.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [axiosSecure]);

  // 🔍 Live Search (TeacherList style)
  const handleSearch = useCallback(
    async (text) => {
      setSearchText(text);

      try {
        setLoading(true);
        setError("");

        if (!text || text.length < 2) {
          await fetchStudents();
          return;
        }

        const res = await axiosSecure.get(
          `/students/search?q=${text}`
        );
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure]
  );

  // 🗑 Delete Student
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/students/${id}`);
      Swal.fire("Deleted!", "Student removed", "success");
      fetchStudents(); // refresh list
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Student List
      </h2>

      {/* 🔍 Search */}
      <input
        type="text"
        className="input input-bordered w-full mb-4"
        placeholder="Search student name..."
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

      {/* 📋 Student Cards */}
      {!loading && students.length > 0 && (
        <div className="grid gap-4">
          {students.map((s) => (
            <div
              key={s._id}
              className="card p-4 border flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  👨‍🎓 {s.studentName}
                </h3>
                <p>Class: {s.class}</p>
                <p>Father: {s.fatherName}</p>
                <p>Mother: {s.motherName}</p>
                <p>Guardian: {s.guardianContact}</p>
              </div>

              <button
                onClick={() => handleDelete(s._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🚫 Empty */}
      {!loading && students.length === 0 && (
        <p className="text-center text-gray-500">
          No students found
        </p>
      )}
    </div>
  );
};

export default Students;
