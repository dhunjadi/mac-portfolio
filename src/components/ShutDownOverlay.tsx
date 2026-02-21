import { useNavigate } from "react-router";
import { useShutDown, useShutDownActions } from "../stores/shutDownStore";
import powerIcon from "/icons/power-off.svg";
import { appRoutes } from "../data/appRoutes";

const ShutDownOverlay = () => {
  const isShutDown = useShutDown();
  const { turnOn } = useShutDownActions();
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
