import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProtectedRoute({ children, user }) {
  const nav = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      nav("/");
    }
  });
  return children;
}
