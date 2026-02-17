import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { useLoginStore } from "../stores/loginStore";

type MenuBarProps = {
  hideAppleLogo?: boolean;
};

const MenuBar = ({ hideAppleLogo }: MenuBarProps) => {
  const isLoggedIn = useLoginStore((state) => state.isLogegdIn);
  const date = dayjs().format("ddd D MMM HH:mm");

  return (
    <div className={`c-menuBar ${isLoggedIn ? "" : "hidden"}`}>
      {!hideAppleLogo && (
        <FontAwesomeIcon
          icon={faApple}
          color="white"
          className="c-menuBar__appleLogo"
        />
      )}
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
