import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useWindowStore } from "../stores/windowStore";
import type { AppleMenuDropdownItem } from "../types";

type DockIconProps = {
  icon: string;
  id: string;
  mouseX: MotionValue<number>;
  onClick: () => void;
};

const DockIcon = ({ icon, id, mouseX, onClick }: DockIconProps) => {
  const iconRef = useRef<HTMLImageElement>(null);
  const openedWindows = useWindowStore((state) => state.openedWindowsIds);

  const isActive = openedWindows.includes(id as AppleMenuDropdownItem);

  const distanceFromCursor = useTransform(mouseX, (cursorX) => {
    if (cursorX === Number.NEGATIVE_INFINITY) return Number.POSITIVE_INFINITY;

    const iconRect = iconRef.current?.getBoundingClientRect();

    if (!iconRect) return Number.POSITIVE_INFINITY;

    return cursorX - iconRect.left - iconRect.width / 2;
  });

  const scaleValue = useTransform(
    distanceFromCursor,
    [-200, 0, 200],
    [1, 1.5, 1],
  );

  const iconScale = useSpring(scaleValue, {
    damping: 10,
    mass: 0.1,
    stiffness: 200,
  });

  return (
    <div className="c-dockIcon">
      <motion.img
        ref={iconRef}
        src={icon}
        alt="dock icon"
        style={{ scale: iconScale }}
        onClick={onClick}
        className={`c-dockIcon__img ${isActive && "isActive"}`}
      />
      {isActive && <div className="c-dockIcon__activeIndicator" />}
    </div>
  );
};

export default DockIcon;
