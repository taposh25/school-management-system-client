import React from "react";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const StudentBills = () => {
  const { id } = useParams(); // student id
  const axiosSecure = useAxiosSecure();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bills
  const fetchBills = async () => {
    try {
      const res = await axiosSecure.get(`/billing/student/${id}`);
      setBills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [id]);

  // Mark bill as paid
  const payBill = async (billId) => {
    try {
      await axiosSecure.patch(`/billing/pay/${billId}`);
      fetchBills(); // Refresh after payment
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading bills...</p>;
  if (bills.length === 0) return <p className="text-center mt-10 text-gray-500">No bills found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Student Billing History</h2>

      {bills.map(bill => (
        <div key={bill._id} className="card bg-base-100 shadow border mb-4 p-4">
          <h3 className="font-semibold mb-2">Semester: {bill.semester}</h3>
          <p>Class: {bill.class}</p>
          <p>Base Fee: {bill.baseFee} TK</p>
          <p>Due Amount: {bill.dueAmount} TK</p>
          <p className="font-semibold">Total Payable: {bill.totalAmount} TK</p>
          <p>
            Status:{" "}
            <span className={`badge ${bill.paid ? "badge-success"  : "badge-error"}`}>
              {bill.paid ? "Paid" : "Unpaid"}
            </span>
          </p>
          {!bill.paid && (
            <button
              className="btn text-cyan-50 btn-success btn-sm mt-2"
              onClick={() => payBill(bill._id)}
            >
              Mark as Paid
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentBills;
