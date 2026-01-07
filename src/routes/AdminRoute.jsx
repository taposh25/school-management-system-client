import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <p className="text-center mt-10">Checking permission...</p>;
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
