import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";

const MenuBar = () => {
  const date = dayjs().format("ddd D MMM HH:mm");

  return (
    <div className="c-menuBar">
      <FontAwesomeIcon icon={faApple} size="2x" color="white" />
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
