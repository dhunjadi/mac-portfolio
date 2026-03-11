import { useEffect, useState } from "react";
import userIcon from "/icons/user.svg";
import powerOffIcon from "/icons/power-off.svg";
import restartIcon from "/icons/restart.svg";
import sleepIcon from "/icons/sleep.svg";
import arrowRightCircle from "/icons/arrow-right-circle.svg";
import { useLogin, useLoginActions } from "../stores/loginStore";
import { usePowerActions } from "../stores/powerStore";

const LoginOverlay = () => {
  const isLoggedIn = useLogin();
  const { login } = useLoginActions();
  const { shutDown, setIsRestarting, setIsSleeping } = usePowerActions();

  const [password, setPassword] = useState("");
  const [isInvisible, setIsInvisible] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => setIsInvisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (password.length > 0) {
      login();
    }
  };

  const bottomButtons = [
    { icon: powerOffIcon, label: "Shut Down", onClick: () => shutDown() },
    {
      icon: restartIcon,
      label: "Restart",
      onClick: () => setIsRestarting(true),
    },
    { icon: sleepIcon, label: "Sleep", onClick: () => setIsSleeping(true) },
  ];

  return (
    <div
      className={`
        c-loginOverlay
        ${isLoggedIn ? "is-hidden" : ""}
        ${isInvisible ? "is-invisible" : ""}`}
    >
      <div className="c-loginOverlay__userInfo">
        <div className="c-loginOverlay__userInfo_avatar">
          <img src={userIcon} alt="user icon" />
        </div>

        <div className="c-loginOverlay__userInfo_name">Dario Hunjadi</div>

        <div className="c-loginOverlay__userInfo_input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            autoFocus
          />

          <button
            className={`
              
             ${password.length === 0 ? "is-hidden" : ""}`}
            onClick={handleLogin}
            aria-label="Log in"
          >
            <img src={arrowRightCircle} alt="right arrow inside a circle" />
          </button>
        </div>
      </div>

      <div className="c-loginOverlay__buttonGroup">
        {bottomButtons.map(({ icon, label, onClick }) => (
          <div className="c-loginOverlay__buttonGroup_group" key={label}>
            <button aria-label={label} onClick={onClick}>
              <img src={icon} alt={label} />
            </button>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginOverlay;
