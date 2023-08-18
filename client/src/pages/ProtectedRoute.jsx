import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireAdmin,
  requireLogin,
  requireUnLogin,
  isAdmin,
}) {
  const { user } = useAuthContext();
  if ((requireAdmin && !isAdmin) || (requireLogin && !user) || (requireUnLogin && user)) {
    return <Navigate to="/" />;
  }
  return children;
}




