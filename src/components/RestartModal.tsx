import { useEffect, useState } from "react";
import restartIcon from "/icons/restart.svg";
import { Rnd } from "react-rnd";
import { useWindowActions } from "../stores/windowStore";
import { usePowerActions } from "../stores/powerStore";
import { useLoginActions } from "../stores/loginStore";

const RestartModal = () => {
  const { closeAllWindows, closeWindow } = useWindowActions();
  const { setIsRestarting } = usePowerActions();
  const { logout } = useLoginActions();

  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 1);
      } else {
        closeAllWindows();
        setIsRestarting(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [closeAllWindows, closeWindow, remainingTime, setIsRestarting]);

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
            <img src={restartIcon} alt="power on/off icon" />
          </div>

          <div className="c-restartModal__body_text">
            <p>
              <strong>
                Are you sure you want to restart your computer now?
              </strong>
            </p>
            <p>
              <small>
                If you do nothing, the computer will restart automatically in{" "}
                {remainingTime} seconds
              </small>
            </p>
          </div>
        </div>
        <div className="c-restartModal__buttons">
          <button
            className="isSecondary"
            onClick={() => closeWindow("restart")}
          >
            Cancel
          </button>
          <button className="isPrimary" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
    </Rnd>
  );
};

export default RestartModal;
