import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Billing = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/students") // get all students
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading students...</p>;
  if (students.length === 0) return <p className="text-center mt-10">No students found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Billing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map(student => (
          <div key={student._id} className="card p-4 shadow border">
            <p><b>Name:</b> {student.studentName}</p>
            <p><b>Class:</b> {student.class}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigate(`/billing/create/${student._id}`)}
                className="btn btn-primary btn-sm"
              >
                Create Billing
              </button>
              <button
                onClick={() => navigate(`/billing/student/${student._id}`)}
                className="btn btn-outline btn-sm"
              >
                Student Bills
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;
