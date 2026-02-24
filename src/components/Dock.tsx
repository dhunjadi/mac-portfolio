import { useEffect, useState, type CSSProperties } from "react";
import { useMotionValue } from "framer-motion";
import finderIcon from "/icons/finder.png";
import calculatorIcon from "/icons/calculator.png";
import infoIcon from "/icons/info.svg";
import DockIcon from "./DockIcon";
import { useLogin } from "../stores/loginStore";
import { useWindowActions } from "../stores/windowStore";
import settingsIcon from "/icons/settings.svg";

const Dock = () => {
  const isLoggedIn = useLogin();

  const { openWindow } = useWindowActions();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const icons = [
    { id: "finder", icon: finderIcon, onClick: () => {} },
    { id: "about", icon: infoIcon, onClick: () => openWindow("about") },
    {
      id: "calculator",
      icon: calculatorIcon,
      onClick: () => openWindow("calculator"),
    },
    {
      id: "settings",
      icon: settingsIcon,
      onClick: () => openWindow("settings"),
    },
  ];
  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY);
  const dockStyle = {
    "--dock-items": icons.length,
  } as CSSProperties;

  return (
    <div
      className={`c-dock ${isLoggedIn ? "" : "hidden"}`}
      style={dockStyle}
      onMouseMove={(e) => {
        if (isDesktop) mouseX.set(e.clientX);
      }}
      onMouseLeave={() => mouseX.set(Number.NEGATIVE_INFINITY)}
    >
      {icons.map((icon) => (
        <DockIcon
          key={icon.id}
          id={icon.id}
          mouseX={mouseX}
          icon={icon.icon}
          onClick={icon.onClick}
        />
      ))}
    </div>
  );
};

export default Dock;
