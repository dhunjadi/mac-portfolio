import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import WindowWrapper from "../WindowWrapper";

type AboutThisDevWindowProps = {
  onClose: () => void;
};

const AboutThisDevWindow = ({ onClose }: AboutThisDevWindowProps) => {
  return (
    <WindowWrapper title="" onClose={onClose} className="w-aboutThisDev">
      <div className="w-aboutThisDev__header">
        <div className="w-aboutThisDev__header_logo" aria-hidden>
          <FontAwesomeIcon icon={faApple} />
        </div>
        <div className="w-aboutThisDev__header_aboutMe">
          <h2>Dario Hunjadi</h2>
          <p>Frontend Developer</p>
        </div>
      </div>

      <div className="w-aboutThisDev__details">
        <div>
          <strong>Location</strong>
          <span>Zagreb, Croatia</span>
        </div>

        <div>
          <strong>GitHub</strong>
          <span>dhunjadi</span>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default AboutThisDevWindow;
