import { useEffect, useRef, type CSSProperties } from "react";
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

  // ref instead of state to avoid re-renders
  // re-renders break icon reordering
  const isDesktop = useRef(window.innerWidth >= 1024);

  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY);
  useEffect(() => {
    const handleResize = () => {
      isDesktop.current = window.innerWidth >= 1024;
      if (!isDesktop.current) {
        mouseX.set(Number.NEGATIVE_INFINITY);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mouseX]);

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
        if (isDesktop.current) mouseX.set(e.clientX);
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
            tooltipLabel={icon.tooltipLabel}
            onClick={() => handleIconClick(icon.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default Dock;
