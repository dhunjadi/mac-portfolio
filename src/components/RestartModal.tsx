import { useEffect, useState } from "react";
import restartIcon from "/icons/restart.svg";
import { Rnd } from "react-rnd";
import { useWindowActions } from "../stores/windowStore";
import { usePowerActions } from "../stores/powerStore";
import { useLoginActions } from "../stores/loginStore";
import { useTranslation } from "react-i18next";

const RestartModal = () => {
  const { t } = useTranslation();
  const { closeAllWindows, closeWindow } = useWindowActions();
  const { setIsRestarting } = usePowerActions();
  const { logout } = useLoginActions();

  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          closeAllWindows();
          logout();
          setTimeout(() => {
            setIsRestarting(true);
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [closeAllWindows, logout, setIsRestarting]);

  const handleRestart = () => {
    closeAllWindows();
    logout();
    setTimeout(() => {
      setIsRestarting(true);
    }, 1000);
  };

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: "fit-content",
        height: "fit-content",
      }}
      cancel=".c-restartModal__buttons"
      style={{ zIndex: 99 }} // needs to be set inline to hide desktop icons
    >
      <div className="c-restartModal">
        <div className="c-restartModal__body">
          <div className="c-restartModal__body_icon">
            <img src={restartIcon} alt={t("restartModal.iconAlt")} />
          </div>

          <div className="c-restartModal__body_text">
            <p>
              <strong>{t("restartModal.title")}</strong>
            </p>
            <p>
              <small>
                {t("restartModal.timer", { seconds: remainingTime })}
              </small>
            </p>
          </div>
        </div>
        <div className="c-restartModal__buttons">
          <button
            className="isSecondary"
            onClick={() => closeWindow("restart")}
          >
            {t("restartModal.cancel")}
          </button>
          <button className="isPrimary" onClick={handleRestart}>
            {t("restartModal.confirm")}
          </button>
        </div>
      </div>
    </Rnd>
  );
};

export default RestartModal;
