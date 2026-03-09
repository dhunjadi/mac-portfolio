import { useEffect, useState, type CSSProperties } from "react";
import { useMotionValue, Reorder } from "framer-motion";
import DockIcon from "./DockIcon";
import { useLogin } from "../stores/loginStore";
import { useWindowActions } from "../stores/windowStore";
import {
  useDockActions,
  useDockIcons,
  type DockIcon as DockIconType,
} from "../stores/dockStore";
import type { AppleMenuDropdownItem } from "../types";

type DockProps = {
  ref?: React.Ref<HTMLUListElement>;
};

const Dock = ({ ref }: DockProps) => {
  const isLoggedIn = useLogin();
  const { openWindow } = useWindowActions();

  const icons = useDockIcons();
  const { moveIcon } = useDockActions();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY);

  const handleIconClick = (iconId: string) => {
    openWindow(iconId as AppleMenuDropdownItem);
  };

  const dockStyle = {
    "--dock-items": icons.length,
  } as CSSProperties;

  return (
    <Reorder.Group
      ref={ref}
      axis="x"
      values={icons}
      onReorder={moveIcon}
      className={`c-dock ${isLoggedIn ? "" : "hidden"}`}
      style={dockStyle}
      onMouseMove={(e) => {
        if (isDesktop) mouseX.set(e.clientX);
      }}
      onMouseLeave={() => mouseX.set(Number.NEGATIVE_INFINITY)}
    >
      {icons.map((icon: DockIconType) => (
        <Reorder.Item
          key={icon.id}
          value={icon}
          style={{ listStyleType: "none" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <DockIcon
            id={icon.id}
            mouseX={mouseX}
            icon={icon.icon}
            onClick={() => handleIconClick(icon.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default Dock;
