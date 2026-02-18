import { useEffect, useState, type CSSProperties } from "react";
import { useMotionValue } from "framer-motion";
import appleLogo from "/icons/apple-logo.svg";
import finderIcon from "/icons/finder.png";
import calculatorIcon from "/icons/calculator.png";
import DockIcon from "./DockIcon";
import { useLoginStore } from "../stores/loginStore";
import { useWindowStore } from "../stores/windowStore";

const Dock = () => {
  const isLoggedIn = useLoginStore((state) => state.isLogegdIn);

  const openWidow = useWindowStore((state) => state.openWindow);

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
    {
      id: "calculator",
      icon: calculatorIcon,
      onClick: () => openWidow("calculator"),
    },
    { id: "apple", icon: appleLogo, onClick: () => {} },
    { id: "apple", icon: appleLogo, onClick: () => {} },
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
