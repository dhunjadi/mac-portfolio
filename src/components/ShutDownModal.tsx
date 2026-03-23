import { useEffect, useState } from "react";
import shutDownIcon from "/icons/power-off.svg";
import { Rnd } from "react-rnd";
import { useWindowActions } from "../stores/windowStore";
import { usePowerActions } from "../stores/powerStore";
import { useLoginActions } from "../stores/loginStore";
import { useTranslation } from "react-i18next";

const ShutDownModal = () => {
  const { t } = useTranslation();
  const { closeAllWindows, closeWindow } = useWindowActions();
  const { shutDown } = usePowerActions();
  const { logout } = useLoginActions();

  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          closeAllWindows();
          shutDown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [closeAllWindows, shutDown]);

  const handleShutDown = () => {
    closeAllWindows();
    logout();
    setTimeout(() => {
      shutDown();
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
      cancel=".c-shutDownModal__buttons"
      style={{ zIndex: 99 }} // needs to be set inline to hide desktop icons
    >
      <div className="c-shutDownModal">
        <div className="c-shutDownModal__body">
          <div className="c-shutDownModal__body_icon">
            <img src={shutDownIcon} alt={t("shutdownModal.iconAlt")} />
          </div>

          <div className="c-shutDownModal__body_text">
            <p>
              <strong>{t("shutdownModal.title")}</strong>
            </p>
            <p>
              <small>
                {t("shutdownModal.timer", { seconds: remainingTime })}
              </small>
            </p>
          </div>
        </div>
        <div className="c-shutDownModal__buttons">
          <button
            className="isSecondary"
            onClick={() => closeWindow("shut-down")}
          >
            {t("shutdownModal.cancel")}
          </button>
          <button className="isPrimary" onClick={handleShutDown}>
            {t("shutdownModal.confirm")}
          </button>
        </div>
      </div>
    </Rnd>
  );
};

export default ShutDownModal;
