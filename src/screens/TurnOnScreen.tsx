import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../hooks/useAppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { appRoutes } from "../data/appRoutes";

const TurnOnScreen = () => {
  const { setIsTurnedOn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTurnedOn(true);
      navigate(appRoutes.home);
    }, 3500);

    return () => clearTimeout(timer);
  }, [setIsTurnedOn, navigate]);

  return (
    <div className="s-turnOn">
      <FontAwesomeIcon icon={faApple} size="10x" color="white" />

      <div className="s-turnOn__loader">
        <div className="s-turnOn__loader_progress" />
      </div>
    </div>
  );
};

export default TurnOnScreen;
