import { useEffect, useState } from "react";
import userIcon from "/icons/user.svg";
import powerOffIcon from "/icons/power-off.svg";
import restartIcon from "/icons/restart.svg";
import sleepIcon from "/icons/sleep.svg";
import arrowRightCircle from "/icons/arrow-right-circle.svg";
import { useLogin, useLoginActions } from "../stores/loginStore";

const LoginOverlay = () => {
  const isLoggedIn = useLogin();
  const { login } = useLoginActions();

  const [password, setPassword] = useState("");
  const [isInvisible, setIsInvisible] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => setIsInvisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <div
      className={`c-loginOverlay ${isLoggedIn ? "hidden" : ""} ${isInvisible ? "invisible" : ""}`}
    >
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
                login();
              }
            }}
          />
          {password.length > 0 && (
            <img
              onClick={() => login()}
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
