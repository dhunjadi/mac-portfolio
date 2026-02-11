import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";

type MenuBarProps = {
  isVisible?: boolean;
  hideAppleLogo?: boolean;
};

const MenuBar = ({ hideAppleLogo, isVisible }: MenuBarProps) => {
  const date = dayjs().format("ddd D MMM HH:mm");

  return (
    <div className={`c-menuBar ${isVisible ? "" : "hidden"}`}>
      {!hideAppleLogo && (
        <FontAwesomeIcon icon={faApple} size="2x" color="white" />
      )}
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
