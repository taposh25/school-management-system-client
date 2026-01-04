import { NavLink } from "react-router";

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
        ${isActive ? "bg-blue-500" : "hover:bg-blue-800"}`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default SidebarItem;
