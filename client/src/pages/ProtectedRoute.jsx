import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin, isAdmin }) {
  const nav = useNavigate();
  if (requireAdmin && !isAdmin) {
    nav("/");
  }
  return children;
}
