import { NavLink, Outlet } from "react-router";


const Teachers = () => {
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <NavLink to="/add-teacher" className="btn btn-primary">
          ➕ Add Teacher
        </NavLink>

        <NavLink to="/teacher-list" end className="btn btn-outline">
          📋 Teacher List
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default Teachers;
