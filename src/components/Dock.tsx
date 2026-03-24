import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  Reorder,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import DockIcon from "./DockIcon";
import { useLogin } from "../stores/loginStore";
import { useWindowActions } from "../stores/windowStore";
import {
  useDockActions,
  useDockIcons,
  type DockIcon as DockIconType,
} from "../stores/dockStore";
import { useDockIconMaxSize, useDockPosition } from "../stores/settingsStore";
import { clampDockIconSize, getDockIconSizeLimits } from "../utils/dockSizing";
import type { AppleMenuDropdownItem } from "../types";
import { useTranslation } from "react-i18next";

type DockProps = {
  ref?: React.Ref<HTMLUListElement>;
};

const Dock = ({ ref }: DockProps) => {
  const { t } = useTranslation();
  const isLoggedIn = useLogin();
  const { openWindow } = useWindowActions();

  const icons = useDockIcons();
  const { moveIcon } = useDockActions();
  const dockPosition = useDockPosition();
  const dockIconMaxSize = useDockIconMaxSize();
  const [sizeLimits, setSizeLimits] = useState(() =>
    getDockIconSizeLimits(window.innerWidth),
  );

  // ref instead of state to avoid re-renders
  // re-renders break icon reordering
  const isDesktop = useRef(window.innerWidth >= 1024);

  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY);
  const mouseY = useMotionValue(Number.NEGATIVE_INFINITY);
  const mouseLeft = useMotionValue(Number.NEGATIVE_INFINITY);
  const mouseRight = useMotionValue(Number.NEGATIVE_INFINITY);
  const mouseTop = useMotionValue(Number.NEGATIVE_INFINITY);
  const mouseBottom = useMotionValue(Number.NEGATIVE_INFINITY);

  const surfaceInsetA = useTransform(
    dockPosition === "bottom" ? mouseLeft : mouseTop,
    [0, 20],
    [0, -20],
  );
  const surfaceInsetB = useTransform(
    dockPosition === "bottom" ? mouseRight : mouseBottom,
    [0, 20],
    [0, -20],
  );
  const surfaceInsetASpring = useSpring(surfaceInsetA, {
    damping: 10,
    mass: 0.1,
    stiffness: 200,
  });
  const surfaceInsetBSpring = useSpring(surfaceInsetB, {
    damping: 10,
    mass: 0.1,
    stiffness: 200,
  });
  useEffect(() => {
    const handleResize = () => {
      isDesktop.current = window.innerWidth >= 1024;
      setSizeLimits(getDockIconSizeLimits(window.innerWidth));
      if (!isDesktop.current) {
        mouseX.set(Number.NEGATIVE_INFINITY);
        mouseY.set(Number.NEGATIVE_INFINITY);
        mouseLeft.set(Number.NEGATIVE_INFINITY);
        mouseRight.set(Number.NEGATIVE_INFINITY);
        mouseTop.set(Number.NEGATIVE_INFINITY);
        mouseBottom.set(Number.NEGATIVE_INFINITY);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mouseBottom, mouseLeft, mouseRight, mouseTop, mouseX, mouseY]);

  const handleIconClick = (iconId: string) => {
    openWindow(iconId as AppleMenuDropdownItem);
  };

  const getTooltipLabel = (id: DockIconType["id"]) => {
    switch (id) {
      case "finder":
        return t("dock.finder");
      case "about":
        return t("dock.about");
      case "calculator":
        return t("dock.calculator");
      case "settings":
        return t("dock.settings");
      case "weather":
        return t("dock.weather");
      case "text-editor":
        return t("dock.textEditor");
      default:
        return t("dock.iconAlt");
    }
  };

  const dockStyle = {
    "--dock-items": icons.length,
    ...(dockIconMaxSize !== null
      ? {
          "--dock-icon-max-size": `${clampDockIconSize(
            dockIconMaxSize,
            sizeLimits,
          )}px`,
        }
      : {}),
  } as CSSProperties;

  return (
    <Reorder.Group
      ref={ref}
      axis={dockPosition === "bottom" ? "x" : "y"}
      values={icons}
      onReorder={moveIcon}
      className={`c-dock c-dock--${dockPosition} ${isLoggedIn ? "" : "hidden"}`}
      style={dockStyle}
      onMouseMove={(e) => {
        if (!isDesktop.current) return;
        const rect = e.currentTarget.getBoundingClientRect();

        if (dockPosition === "bottom") {
          mouseX.set(e.clientX);
          mouseLeft.set(e.clientX - rect.left);
          mouseRight.set(rect.right - e.clientX);
        } else {
          mouseY.set(e.clientY);
          mouseTop.set(e.clientY - rect.top);
          mouseBottom.set(rect.bottom - e.clientY);
        }
      }}
      onMouseLeave={() => {
        mouseX.set(Number.NEGATIVE_INFINITY);
        mouseY.set(Number.NEGATIVE_INFINITY);
        mouseLeft.set(Number.NEGATIVE_INFINITY);
        mouseRight.set(Number.NEGATIVE_INFINITY);
        mouseTop.set(Number.NEGATIVE_INFINITY);
        mouseBottom.set(Number.NEGATIVE_INFINITY);
      }}
    >
      <motion.div
        className="c-dock__surface"
        style={
          dockPosition === "bottom"
            ? { left: surfaceInsetASpring, right: surfaceInsetBSpring }
            : { top: surfaceInsetASpring, bottom: surfaceInsetBSpring }
        }
      />

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
            mouseY={mouseY}
            dockPosition={dockPosition}
            icon={icon.icon}
            tooltipLabel={getTooltipLabel(icon.id)}
            onClick={() => handleIconClick(icon.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default Dock;
