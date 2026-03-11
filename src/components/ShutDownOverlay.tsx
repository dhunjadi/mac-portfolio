import { useNavigate } from "react-router";
import { useRestart, useShutDown } from "../stores/powerStore";
import { appRoutes } from "../data/appRoutes";
import { useEffect } from "react";

const ShutDownOverlay = () => {
  const isShutDown = useShutDown();
  const isRestarting = useRestart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isShutDown || isRestarting) {
      setTimeout(() => {
        navigate(appRoutes.turnOff);
      }, 2000);
    }
  });

  return (
    <div
      className={`c-shutDownOverlay ${isShutDown || isRestarting ? "" : "hidden"}`}
    />
  );
};

export default ShutDownOverlay;
