import { Outlet, Navigate } from "react-router";
import { useTurnOn } from "../stores/powerStore";

const ProtectedRoute = () => {
  const isTurnedOn = useTurnOn();

  return isTurnedOn ? <Outlet /> : <Navigate to="/turn-on" />;
};

export default ProtectedRoute;
