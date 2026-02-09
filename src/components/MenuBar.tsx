import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const MenuBar = () => {
  const [showMenuBar, setShowMenuBar] = useState(false);
  const date = dayjs().format("ddd D MMM HH:mm");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenuBar(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`c-menuBar ${showMenuBar ? "" : "hidden"}`}>
      <FontAwesomeIcon icon={faApple} size="2x" color="white" />
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
