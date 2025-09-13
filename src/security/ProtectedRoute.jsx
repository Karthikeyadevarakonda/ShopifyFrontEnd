// security/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const tenantData = JSON.parse(localStorage.getItem("tenantData"));

  if (!tenantData) {
    toast.error("Please login to access this page.");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(tenantData.role)) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
