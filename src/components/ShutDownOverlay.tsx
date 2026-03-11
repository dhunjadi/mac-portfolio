import { useNavigate } from "react-router";
import {
  usePowerActions,
  useRestart,
  useShutDown,
  useSleep,
} from "../stores/powerStore";
import { appRoutes } from "../data/appRoutes";
import { useEffect } from "react";

const ShutDownOverlay = () => {
  const isShutDown = useShutDown();
  const isRestarting = useRestart();
  const isSleeping = useSleep();
  const navigate = useNavigate();
  const { setIsSleeping } = usePowerActions();

  useEffect(() => {
    if (isShutDown || isRestarting) {
      setTimeout(() => {
        navigate(appRoutes.turnOff);
      }, 2000);
    }
  }, [isRestarting, isShutDown, navigate]);

  useEffect(() => {
    if (!isSleeping) return;
    const handleWakeUp = () => {
      setIsSleeping(false);
    };
    let lastTap = 0;
    const handleTouchEnd = () => {
      const now = Date.now();
      const delta = now - lastTap;
      if (delta > 0 && delta < 300) {
        handleWakeUp();
      }
      lastTap = now;
    };
    document.addEventListener("dblclick", handleWakeUp);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("dblclick", handleWakeUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSleeping, setIsSleeping]);

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
