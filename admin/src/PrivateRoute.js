const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    if (role !== requiredRole) {
      return <Navigate to={role === "admin" ? "/admin/home" : "/user/home"} replace />;
    }
  
    return children;
  };
  