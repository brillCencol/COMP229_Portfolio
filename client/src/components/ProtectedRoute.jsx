import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const rawUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!rawUser || !token) return <Navigate to="/login" />;

  let user;
  try {
    user = JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("user"); // optional auto-cleanup
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
