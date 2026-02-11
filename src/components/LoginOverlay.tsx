import { useState } from "react";
import userIcon from "/icons/user.svg";
import powerOffIcon from "/icons/power-off.svg";
import restartIcon from "/icons/restart.svg";
import sleepIcon from "/icons/sleep.svg";
import arrowRightCircle from "/icons/arrow-right-circle.svg";
import { useAppContext } from "../hooks/useAppContext";

const LoginOverlay = () => {
  const { showMenuBarAndDock, setShowMenuBarAndDock } = useAppContext();

  const [password, setPassword] = useState("");

  return (
    <div className={`c-loginOverlay ${showMenuBarAndDock ? "hidden" : ""}`}>
      <div className="c-loginOverlay__userInfo">
        <div className="c-loginOverlay__userInfo_img">
          <img src={userIcon} alt="user icon" />
        </div>

        <div className="c-loginOverlay__userInfo_name">
          <strong>Dario Hunjadi</strong>
        </div>

        <div className="c-loginOverlay__userInfo_input">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && password.length > 0) {
                setShowMenuBarAndDock(true);
              }
            }}
          />
          {password.length > 0 && (
            <img
              onClick={() => setShowMenuBarAndDock(true)}
              src={arrowRightCircle}
              alt="right arrow inside a circle"
            />
          )}
        </div>
      </div>

      <div className="c-loginOverlay__buttonGroup">
        <div className="c-loginOverlay__buttonGroup_group">
          <button>
            <img src={powerOffIcon} alt="shut down icon" />
          </button>
          <strong>Shut Down</strong>
        </div>
        <div className="c-loginOverlay__buttonGroup_group">
          <button>
            <img src={restartIcon} alt="restart icon" />
          </button>
          <strong>Restart</strong>
        </div>
        <div className="c-loginOverlay__buttonGroup_group">
          <button>
            <img src={sleepIcon} alt="sleep icon" />
          </button>
          <strong>Sleep</strong>
        </div>
      </div>
    </div>
  );
};

export default LoginOverlay;
