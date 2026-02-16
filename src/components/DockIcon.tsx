import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type DockIconProps = {
  icon: string;
  mouseX: MotionValue<number>;
};

const DockIcon = ({ icon, mouseX }: DockIconProps) => {
  const iconRef = useRef<HTMLImageElement>(null);

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
    <motion.img
      ref={iconRef}
      src={icon}
      alt="dock icon"
      style={{ scale: iconScale }}
    />
  );
};

export default DockIcon;
