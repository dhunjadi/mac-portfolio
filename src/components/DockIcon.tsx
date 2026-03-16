import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useOpenedWindows } from "../stores/windowStore";
import type { AppleMenuDropdownItem } from "../types";

type DockIconProps = {
  icon: string;
  id: string;
  mouseX: MotionValue<number>;
  tooltipLabel: string;
  onClick: () => void;
};

const DockIcon = ({
  icon,
  id,
  mouseX,
  onClick,
  tooltipLabel,
}: DockIconProps) => {
  const iconRef = useRef<HTMLImageElement>(null);
  const controls = useAnimationControls();
  const openedWindows = useOpenedWindows();

  const isActive =
    openedWindows.includes(id as AppleMenuDropdownItem) || id === "finder";

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

  const handleClick = async () => {
    await controls.start({
      y: [0, -30, 0, -30, 0, -30, 0],
      transition: { duration: 3, ease: "easeInOut" },
    });
    onClick();
  };

  const tooltipId = `dock-tooltip-${id}`;

  return (
    <>
      <div className="c-dockIcon">
        <motion.img
          ref={iconRef}
          src={icon}
          alt={tooltipLabel ?? "dock icon"}
          draggable={false}
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipLabel}
          style={{
            scale: iconScale,
            userSelect: "none",
          }}
          animate={controls}
          onClick={isActive ? undefined : handleClick}
        />

        {isActive && (
          <motion.div
            layoutId={`${id}-indicator`}
            className="c-dockIcon__activeIndicator"
          />
        )}
      </div>

      <Tooltip
        id={tooltipId}
        className="c-dockIcon__tooltip"
        place="top"
        disableStyleInjection
      />
    </>
  );
};

export default DockIcon;
