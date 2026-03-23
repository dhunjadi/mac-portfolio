import { useNavigate } from "react-router";
import { appRoutes } from "../data/appRoutes";
import { useRestart, useShutDown, usePowerActions } from "../stores/powerStore";
import powerIcon from "/icons/power-off.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TurnOffScreen = () => {
  const { t } = useTranslation();
  const isShutDown = useShutDown();
  const isRestarting = useRestart();
  const { turnOn, setIsRestarting } = usePowerActions();
  const navigate = useNavigate();
  const [restartTimer, setRestartTimer] = useState(3);

  const handleTurnOn = () => {
    navigate(appRoutes.turnOn);
    setTimeout(() => {
      turnOn();
    }, 500);
  };

  useEffect(() => {
    if (!isRestarting) return;

    if (restartTimer > 0) {
      const timer = setTimeout(() => {
        setRestartTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsRestarting(false);
      navigate(appRoutes.turnOn);
    }
  }, [isRestarting, restartTimer, navigate, setIsRestarting]);
  return (
    <div className="s-turnOff">
      {isShutDown ? (
        <button className="s-turnOff__powerButton">
          <img
            className="s-turnOff__powerButton_img"
            src={powerIcon}
            alt={t("turnOff.powerAlt")}
            onClick={handleTurnOn}
          />
        </button>
      ) : (
        <p className="s-turnOff__restartTimer">{restartTimer}</p>
      )}
    </div>
  );
};

export default TurnOffScreen;
