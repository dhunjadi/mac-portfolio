import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Dock = () => {
  const [showDocker, setShowDocker] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDocker(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`c-dock ${showDocker ? "" : "hidden"}`}>
      <div className="c-dock__container">
        <FontAwesomeIcon icon={faApple} size="5x" color="white" />
        <FontAwesomeIcon icon={faApple} size="5x" color="white" />
        <FontAwesomeIcon icon={faApple} size="5x" color="white" />
        <FontAwesomeIcon icon={faApple} size="5x" color="white" />
      </div>
    </div>
  );
};

export default Dock;
