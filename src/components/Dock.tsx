import { useEffect, useState, type CSSProperties } from "react";
import { useMotionValue } from "framer-motion";
import appleLogo from "/icons/apple-logo.svg";
import DockIcon from "./DockIcon";

type DockProps = {
  isVisible?: boolean;
};

const Dock = ({ isVisible }: DockProps) => {
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

  const icons = [appleLogo, appleLogo, appleLogo, appleLogo];
  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY);
  const dockStyle = {
    "--dock-items": icons.length,
  } as CSSProperties;

  return (
    <div
      className={`c-dock ${isVisible ? "" : "hidden"}`}
      style={dockStyle}
      onMouseMove={(e) => {
        if (isDesktop) mouseX.set(e.clientX);
      }}
      onMouseLeave={() => mouseX.set(Number.NEGATIVE_INFINITY)}
    >
      {icons.map((icon, index) => (
        <DockIcon icon={icon} key={index} mouseX={mouseX} />
      ))}
    </div>
  );
};

export default Dock;
