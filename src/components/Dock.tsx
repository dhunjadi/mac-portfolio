import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type DockProps = {
  isVisible?: boolean;
};

const Dock = ({ isVisible }: DockProps) => {
  return (
    <div className={`c-dock ${isVisible ? "" : "hidden"}`}>
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
