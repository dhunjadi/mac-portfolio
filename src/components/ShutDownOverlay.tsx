import { useNavigate } from "react-router";
import {
  usePowerActions,
  useRestart,
  useShutDown,
  useSleep,
} from "../stores/powerStore";
import { appRoutes } from "../data/appRoutes";
import { useCallback, useEffect } from "react";
import useDoubleActivate from "../hooks/useDoubleActivate";

const ShutDownOverlay = () => {
  const isShutDown = useShutDown();
  const isRestarting = useRestart();
  const isSleeping = useSleep();
  const navigate = useNavigate();
  const { setIsSleeping } = usePowerActions();

  const handleWakeUp = useCallback(() => {
    setIsSleeping(false);
  }, [setIsSleeping]);

  useDoubleActivate({
    onActivate: handleWakeUp,
    enabled: isSleeping,
    target: "document",
  });

  useEffect(() => {
    if (isShutDown || isRestarting) {
      const timer = setTimeout(() => {
        navigate(appRoutes.turnOff);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isRestarting, isShutDown, navigate]);

  return (
    <div
      className={`c-shutDownOverlay ${isShutDown || isRestarting || isSleeping ? "" : "hidden"}`}
    >
      {isSleeping ? (
        <p>Double click/tap anywhere on screen to wake up</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShutDownOverlay;
