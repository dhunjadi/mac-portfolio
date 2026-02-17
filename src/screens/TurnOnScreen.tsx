import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { appRoutes } from "../data/appRoutes";
import { useTurnOnStore } from "../stores/turnOnStore";

const TurnOnScreen = () => {
  const turnOn = useTurnOnStore((state) => state.turnOn);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      turnOn();
      navigate(appRoutes.home);
    }, 3500);

    return () => clearTimeout(timer);
  }, [turnOn, navigate]);

  return (
    <div className="s-turnOn">
      <FontAwesomeIcon
        className="s-turnOn__appleLogo"
        icon={faApple}
        color="white"
      />

      <div className="s-turnOn__loader" data-testid="boot-loader">
        <div className="s-turnOn__loader_progress" />
      </div>
    </div>
  );
};

export default TurnOnScreen;
