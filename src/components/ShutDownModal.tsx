import { useEffect, useState } from "react";
import shutDownIcon from "/icons/power-off.svg";
import { Rnd } from "react-rnd";
import { useWindowStore } from "../stores/windowStore";
import { useShutDownStore } from "../stores/shutDownStore";
import { useLoginStore } from "../stores/loginStore";

const ShutDownModal = () => {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const shutDown = useShutDownStore((state) => state.shutDown);
  const logout = useLoginStore((state) => state.logout);

  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleShutDown = () => {
    closeWindow("shut-down");
    logout();
    setTimeout(() => {
      shutDown();
    }, 1000);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
    >
      <div className="c-shutDownModal">
        <div className="c-shutDownModal__body">
          <div className="c-shutDownModal__body_icon">
            <img src={shutDownIcon} alt="power on/off icon" />
          </div>

          <div className="c-shutDownModal__body_text">
            <p>
              <strong>
                Are you sure you want to shut down your computer now?
              </strong>
            </p>
            <p>
              <small>
                If you do nothing, the computer will shut down automatically in
                {remainingTime} seconds
              </small>
            </p>
          </div>
        </div>

        <div className="c-shutDownModal__buttons">
          <button
            className="isSecondary"
            onClick={() => closeWindow("shut-down")}
          >
            Cancel
          </button>
          <button className="isPrimary" onClick={handleShutDown}>
            Shut Down
          </button>
        </div>
      </div>
    </Rnd>
  );
};

export default ShutDownModal;
