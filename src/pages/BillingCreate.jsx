


import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BillingCreate = () => {
  const { id } = useParams(); // student id from URL
  const axiosSecure = useAxiosSecure();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student details
  useEffect(() => {
    axiosSecure.get(`/students/${id}`)
      .then(res => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure]);

  // Create 1st semester bill
  const createFirstSemester = async () => {
    if (!student) return;
    try {
      await axiosSecure.post(`/billing/first-semester/${id}`, {
        studentId: student._id,
        studentClass: student.class
      });
      alert("✅ 1st Semester Bill Created");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating 1st semester bill");
    }
  };

  // Create 2nd semester bill
  const createSecondSemester = async () => {
    if (!student) return;
    try {
      await axiosSecure.post(`/billing/second-semester/${id}`, {
        studentId: student._id,
        studentClass: student.class
      });
      alert("✅ 2nd Semester Bill Created");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating 2nd semester bill");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading student...</p>;
  if (!student) return <p className="text-center mt-10 text-red-500">Student not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="card bg-base-100 shadow border p-6">
        <h2 className="card-title text-2xl mb-4">Create Billing</h2>

        <p><b>Name:</b> {student.studentName}</p>
        <p><b>Class:</b> {student.class}</p>
        <p><b>Guardian:</b> {student.guardianContact}</p>

        <div className="mt-4 flex gap-3">
          <button className="btn btn-primary" onClick={createFirstSemester}>
            Create 1st Semester Bill
          </button>

          <button className="btn btn-secondary" onClick={createSecondSemester}>
            Create 2nd Semester Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingCreate;
