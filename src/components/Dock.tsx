import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionValue, Reorder } from "framer-motion";
import DockIcon from "./DockIcon";
import { useLogin } from "../stores/loginStore";
import { useWindowActions } from "../stores/windowStore";
import {
  useDockActions,
  useDockIcons,
  type DockIcon as DockIconType,
} from "../stores/dockStore";
import { useDockIconMaxSize, useDockPosition } from "../stores/settingsStore";
import {
  clampDockIconSize,
  getDockIconSizeLimits,
} from "../utils/dockSizing";
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
  useEffect(() => {
    const handleResize = () => {
      isDesktop.current = window.innerWidth >= 1024;
      setSizeLimits(getDockIconSizeLimits(window.innerWidth));
      if (!isDesktop.current) {
        mouseX.set(Number.NEGATIVE_INFINITY);
        mouseY.set(Number.NEGATIVE_INFINITY);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mouseX, mouseY]);

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
        if (dockPosition === "bottom") {
          mouseX.set(e.clientX);
        } else {
          mouseY.set(e.clientY);
        }
      }}
      onMouseLeave={() => {
        mouseX.set(Number.NEGATIVE_INFINITY);
        mouseY.set(Number.NEGATIVE_INFINITY);
      }}
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
