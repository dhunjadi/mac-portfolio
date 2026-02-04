import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dock = () => {
  return (
    <div className="c-dock">
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
