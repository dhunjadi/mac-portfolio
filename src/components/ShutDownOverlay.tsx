import { useNavigate } from "react-router";
import { useShutDownStore } from "../stores/shutDownStore";
import powerIcon from "/icons/power-off.svg";
import { appRoutes } from "../data/appRoutes";

const ShutDownOverlay = () => {
  const isShutDown = useShutDownStore((state) => state.isShutDown);
  const turnOn = useShutDownStore((state) => state.turnOn);
  const navigate = useNavigate();

  const handleTurnOn = () => {
    navigate(appRoutes.turnOn);
    setTimeout(() => {
      turnOn();
    }, 500);
  };

  return (
    <div className={`c-shutDownOverlay ${isShutDown ? "" : "hidden"}`}>
      <img
        className="c-shutDownOverlay__icon"
        src={powerIcon}
        alt="power icon"
        onClick={handleTurnOn}
      />
    </div>
  );
};

export default ShutDownOverlay;
