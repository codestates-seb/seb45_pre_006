import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requireAdmin,
  requireLogin,
  requireUnLogin,
  isAdmin,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  if ((requireAdmin && !isAdmin) || (requireLogin && !user) || (requireUnLogin && user)) {
    return <Navigate to="/" />;
  }
  return children;
}
