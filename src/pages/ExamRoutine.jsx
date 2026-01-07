import { useState } from "react";

//  Holidays (example dates — you can adjust yearly)
const holidays = [
  { name: "Ramadan", date: "2026-03-01" },
  { name: "Eid-ul-Fitr", date: "2026-04-01" },
  { name: "Durga Puja", date: "2026-10-20" },
  { name: "Laxmi Puja", date: "2026-10-24" },
];

// ➕ Add months + days function
const addMonthsAndDays = (date, months, days) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const ExamRoutine = () => {
  const [selectedClass, setSelectedClass] = useState("6");

  const startDate = "2026-01-10";

  // 📘 Exam structure
  const getExamList = (cls) => {
    if (cls === "10") {
      return [
        "1st Semester",
        "2nd Semester",
        "Pre-Test",
        "Test Exam",
        "SSC Board Exam",
      ];
    } else {
      return ["1st Semester", "2nd Semester", "Year Final"];
    }
  };

  // 📅 Build routine
  const buildRoutine = () => {
    const exams = getExamList(selectedClass);
    let date = startDate;

    return exams.map((exam, index) => {
      if (index !== 0) {
        date = addMonthsAndDays(date, 3, 15);
      }

      return {
        exam,
        date,
      };
    });
  };

  const routine = buildRoutine();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📅 Exam Routine Chart</h2>

      {/* 🎯 Class Selector */}
      <div className="mb-6">
        <label className="font-semibold mr-3">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="select select-bordered"
        >
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
      </div>

      {/* 📋 Exam Table */}
      <div className="overflow-x-auto mb-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Exam Name</th>
              <th>Expected Date</th>
            </tr>
          </thead>
          <tbody>
            {routine.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.exam}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎉 Holidays Section */}
      <h3 className="text-xl font-semibold mb-3">🎉 Holidays</h3>

      <div className="overflow-x-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Holiday</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((h, i) => (
              <tr key={i}>
                <td>{h.name}</td>
                <td>{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamRoutine;
