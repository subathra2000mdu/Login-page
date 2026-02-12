import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/profile/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setIsAuth(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking login...</p>;

  if (!isAuth) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
