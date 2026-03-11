import { Outlet, Navigate } from "react-router";
import { useTurnOn } from "../stores/powerStore";
import { appRoutes } from "../data/appRoutes";

const ProtectedRoute = () => {
  const isTurnedOn = useTurnOn();

  return isTurnedOn ? <Outlet /> : <Navigate to={appRoutes.turnOn} />;
};

export default ProtectedRoute;
