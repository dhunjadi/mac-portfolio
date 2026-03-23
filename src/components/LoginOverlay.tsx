import { useEffect, useState } from "react";
import powerOffIcon from "/icons/power-off.svg";
import restartIcon from "/icons/restart.svg";
import sleepIcon from "/icons/sleep.svg";
import arrowRightCircle from "/icons/arrow-right-circle.svg";
import { useLogin, useLoginActions } from "../stores/loginStore";
import { usePowerActions } from "../stores/powerStore";
import avatarPicture from "/avatar.jpg";
import { useTranslation } from "react-i18next";

const LoginOverlay = () => {
  const { t } = useTranslation();
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
    {
      icon: powerOffIcon,
      label: t("login.power.shutDown"),
      onClick: () => shutDown(),
    },
    {
      icon: restartIcon,
      label: t("login.power.restart"),
      onClick: () => setIsRestarting(true),
    },
    {
      icon: sleepIcon,
      label: t("login.power.sleep"),
      onClick: () => setIsSleeping(true),
    },
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
          <img src={avatarPicture} alt={t("login.userAvatarAlt")} />
        </div>

        <div className="c-loginOverlay__userInfo_name">Dario Hunjadi</div>

        <div className="c-loginOverlay__userInfo_input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login.passwordPlaceholder")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            autoFocus
          />

          <button
            className={`
              
             ${password.length === 0 ? "is-hidden" : ""}`}
            onClick={handleLogin}
            aria-label={t("login.loginAria")}
          >
            <img src={arrowRightCircle} alt={t("login.arrowAlt")} />
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
