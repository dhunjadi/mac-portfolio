import { Outlet, Navigate } from "react-router";
import { useTurnOnStore } from "../stores/turnOnStore";

const ProtectedRoute = () => {
  const isTurnedOn = useTurnOnStore((state) => state.isTurnedOn);

  return isTurnedOn ? <Outlet /> : <Navigate to="/turn-on" />;
};

export default ProtectedRoute;
