import { FaUserShield } from "react-icons/fa";
import { MdDashboard, MdNewReleases, MdPayments, MdPeople, MdQuiz, MdSchool, MdSettings } from "react-icons/md";
import { NavLink } from "react-router";
import useRole from "../../Hooks/useRole";



const Sidebar = () => {
  const {role} = useRole();
  return (
    <aside className="w-64 h-screen bg-[#16245c] text-white flex flex-col">
      
      {/* Logo & School Name */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-blue-900">
        <div className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold">
          N
        </div>
        <h1 className="text-lg font-semibold leading-tight">
          Nabagram <br /> High School
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem to="/dashboard" icon={<MdDashboard />} label="Dashboard" />
        <SidebarItem to="/dashboard/teachers" icon={<MdPeople />} label="Teachers" />
        <SidebarItem to="/dashboard/students" icon={<MdSchool />} label="Students / Classes" />
        <SidebarItem to="/dashboard/billing" icon={<MdPayments />} label="Billing" />
        <SidebarItem to="/dashboard/exams" icon={<MdQuiz />} label="Exam Routine" />
   
       {role === "admin" && (
          <SidebarItem to="/dashboard/approve-teacher" icon={<FaUserShield />} label="Approve-Teacher" />
        )}



       {/* <SidebarItem to="/dashboard/approve-teacher" icon={<FaUserShield />} label="Approve-Teacher" /> */}
    
        <SidebarItem to="/dashboard/settings" icon={<MdSettings />} label="Settings & Profile" />
      </nav>

      {/* Features */}
      <div className="px-6 py-4 border-t border-blue-900">
        <div className="flex items-center gap-2 text-sm">
          <MdNewReleases />
          <span>Features</span>
          <span className="ml-auto bg-blue-500 text-xs px-2 py-0.5 rounded">
            NEW
          </span>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md text-sm
       ${isActive ? "bg-blue-500" : "hover:bg-blue-800"}`
    }
  >
    <span className="text-lg">{icon}</span>
    {label}
  </NavLink>
);

export default Sidebar;
