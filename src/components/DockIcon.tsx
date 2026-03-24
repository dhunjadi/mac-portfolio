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
import { useDockIconScale } from "../stores/settingsStore";
import type { AppleMenuDropdownItem } from "../types";
import { useTranslation } from "react-i18next";

type DockIconProps = {
  icon: string;
  id: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  dockPosition: "left" | "bottom" | "right";
  tooltipLabel: string;
  onClick: () => void;
};

const DockIcon = ({
  icon,
  id,
  mouseX,
  mouseY,
  dockPosition,
  onClick,
  tooltipLabel,
}: DockIconProps) => {
  const { t } = useTranslation();
  const iconRef = useRef<HTMLImageElement>(null);
  const controls = useAnimationControls();
  const openedWindows = useOpenedWindows();
  const dockIconScale = useDockIconScale();

  const isWindowOpen = openedWindows.includes(id as AppleMenuDropdownItem);
  const showActiveIndicator = isWindowOpen || id === "finder";

  const distanceFromCursor = useTransform(
    dockPosition === "bottom" ? mouseX : mouseY,
    (cursorPosition) => {
      if (cursorPosition === Number.NEGATIVE_INFINITY)
        return Number.POSITIVE_INFINITY;

      const iconRect = iconRef.current?.getBoundingClientRect();

      if (!iconRect) return Number.POSITIVE_INFINITY;

      if (dockPosition === "bottom") {
        return cursorPosition - iconRect.left - iconRect.width / 2;
      }

      return cursorPosition - iconRect.top - iconRect.height / 2;
    },
  );

  const scaleValue = useTransform(
    distanceFromCursor,
    [-200, 0, 200],
    [1, dockIconScale, 1],
  );

  const iconScale = useSpring(scaleValue, {
    damping: 10,
    mass: 0.1,
    stiffness: 200,
  });

  const handleClick = async () => {
    if (isWindowOpen) {
      onClick();
      return;
    }

    const bounceDistance =
      dockPosition === "left" ? 30 : dockPosition === "right" ? -30 : -30;

    const bounceKeyframes =
      dockPosition === "bottom"
        ? { y: [0, bounceDistance, 0, bounceDistance, 0, bounceDistance, 0] }
        : { x: [0, bounceDistance, 0, bounceDistance, 0, bounceDistance, 0] };

    await controls.start({
      ...bounceKeyframes,
      transition: { duration: 3, ease: "easeInOut" },
    });
    onClick();
  };

  const tooltipId = `dock-tooltip-${id}`;
  const tooltipPlace =
    dockPosition === "bottom"
      ? "top"
      : dockPosition === "left"
        ? "right"
        : "left";

  return (
    <>
      <div className={`c-dockIcon c-dockIcon--${dockPosition}`}>
        <motion.img
          ref={iconRef}
          src={icon}
          alt={tooltipLabel || t("dock.iconAlt")}
          draggable={false}
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipLabel}
          style={{
            scale: iconScale,
            userSelect: "none",
          }}
          animate={controls}
          onClick={handleClick}
        />

        {showActiveIndicator && (
          <motion.div
            layoutId={`${id}-indicator`}
            className="c-dockIcon__activeIndicator"
          />
        )}
      </div>

      <Tooltip
        id={tooltipId}
        className="c-dockIcon__tooltip"
        place={tooltipPlace}
        disableStyleInjection
      />
    </>
  );
};

export default DockIcon;
