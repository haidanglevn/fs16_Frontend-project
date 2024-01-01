import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { selectUser, selectAccessToken } from "../redux/slices/userSlice";

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const requiredRole = 1;
  if (!accessToken || accessToken === "" || user?.role !== requiredRole) {
    toast.error(
      "Unauthorize: You do not have the creadential to enter this page!"
    );

    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
