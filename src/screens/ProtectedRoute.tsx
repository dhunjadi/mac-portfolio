import { Outlet, Navigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";

const ProtectedRoute = () => {
  const { isTurnedOn } = useAppContext();

  return isTurnedOn ? <Outlet /> : <Navigate to="/turn-on" />;
};

export default ProtectedRoute;
