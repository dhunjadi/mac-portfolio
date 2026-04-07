import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import dayjs from "dayjs";
import { useLogin } from "../stores/loginStore";
import { useActiveWindowId, useWindowActions } from "../stores/windowStore";
import AppleMenuDropdown from "./AppleMenuDropdown";
import type { AppleMenuDropdownItem, WindowId } from "../types";
import { usePowerActions } from "../stores/powerStore";
import controlCenterIcon from "/icons/control-center.png";
import searchIcon from "/icons/search-icon.svg";
import ControlCenterDropdown from "./ControlCenterDropdown";
import { useTranslation } from "react-i18next";
import { getMenuBarWindowLabels, isWindowId } from "../data/windowData";
import { useShow24HourTime } from "../stores/settingsStore";
import {
  useSpotlightActions,
  useSpotlightOpen,
} from "../stores/spotlightStore";

type MenuBarProps = {
  hideAppleLogo?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const MenuBar = ({ hideAppleLogo, ref }: MenuBarProps) => {
  const { t } = useTranslation();
  const isLoggedIn = useLogin();
  const { openWindow, closeWindow } = useWindowActions();
  const { setIsSleeping } = usePowerActions();
  const activeWindowId = useActiveWindowId();
  const show24HourTime = useShow24HourTime();
  const isSpotlightOpen = useSpotlightOpen();
  const { openSpotlight, closeSpotlight } = useSpotlightActions();

  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isWindowMenuOpen, setIsWindowMenuOpen] = useState(false);
  const [iscontrolCenterOpen, setIsControlCenterOpen] = useState(false);
  const appleMenuRef = useRef<HTMLDivElement | null>(null);
  const windowMenuRef = useRef<HTMLDivElement | null>(null);
  const controlCenterRef = useRef<HTMLDivElement | null>(null);
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    if (!isAppleMenuOpen && !isWindowMenuOpen && !iscontrolCenterOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const isInsideAppleMenu = appleMenuRef.current?.contains(target) ?? false;
      const isInsideWindowMenu =
        windowMenuRef.current?.contains(target) ?? false;
      const isInsidecontrolCenter =
        controlCenterRef.current?.contains(target) ?? false;
      if (isInsideAppleMenu || isInsideWindowMenu || isInsidecontrolCenter)
        return;
      setIsAppleMenuOpen(false);
      setIsWindowMenuOpen(false);
      setIsControlCenterOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsAppleMenuOpen(false);
      setIsWindowMenuOpen(false);
      setIsControlCenterOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isAppleMenuOpen, iscontrolCenterOpen, isWindowMenuOpen]);

  useEffect(() => {
    const updateNow = () => setNow(dayjs());
    updateNow();

    const msToNextMinute =
      60000 - (dayjs().second() * 1000 + dayjs().millisecond());

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = window.setTimeout(() => {
      updateNow();
      intervalId = window.setInterval(updateNow, 60000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  const menuBarWindowLabels = getMenuBarWindowLabels(t);

  const activeWindowLabel = activeWindowId
    ? menuBarWindowLabels[activeWindowId as WindowId]
    : undefined;

  const dayLabels = t("menuBar.daysShort", { returnObjects: true }) as string[];
  const monthLabels = t("menuBar.monthsShort", {
    returnObjects: true,
  }) as string[];
  const dayLabel = dayLabels[now.day()] ?? "";
  const monthLabel = monthLabels[now.month()] ?? "";
  const dateLabel = `${dayLabel} ${now.format("D")} ${monthLabel}`;
  const timeLabel = show24HourTime ? now.format("HH:mm") : now.format("h:mm A");

  const handleAppleMenuSelect = (item: AppleMenuDropdownItem) => {
    if (item === "sleep") {
      setIsSleeping(true);
      setIsAppleMenuOpen(false);
      return;
    }

    if (isWindowId(item)) {
      openWindow(item);
    }
    setIsAppleMenuOpen(false);
  };

  return (
    <div ref={ref} className={`c-menuBar ${isLoggedIn ? "" : "hidden"}`}>
      {!hideAppleLogo && (
        <div className="c-menuBar__left">
          <div className="c-menuBar__left_apple" ref={appleMenuRef}>
            <button
              type="button"
              className={` ${isAppleMenuOpen ? "active" : ""}`}
              aria-label={t("menuBar.appleMenuLabel")}
              aria-expanded={isAppleMenuOpen}
              onClick={() => {
                setIsWindowMenuOpen(false);
                setIsControlCenterOpen(false);
                closeSpotlight();
                setIsAppleMenuOpen((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faApple} color="white" />
            </button>

            {isAppleMenuOpen && (
              <AppleMenuDropdown onSelect={handleAppleMenuSelect} />
            )}
          </div>

          {activeWindowLabel && (
            <div className="c-menuBar__left_activeWindow" ref={windowMenuRef}>
              <button
                type="button"
                className={` ${isWindowMenuOpen ? "active" : ""}`}
                aria-label={t("menuBar.windowMenuLabel", {
                  window: activeWindowLabel,
                })}
                aria-expanded={isWindowMenuOpen}
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  setIsWindowMenuOpen((prev) => !prev);
                  setIsControlCenterOpen(false);
                  closeSpotlight();
                }}
              >
                {activeWindowLabel}
              </button>

              {isWindowMenuOpen && (
                <div
                  role="menu"
                  aria-label={t("menuBar.windowMenuLabel", {
                    window: activeWindowLabel,
                  })}
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      if (!activeWindowId) return;
                      closeWindow(activeWindowId);
                      setIsWindowMenuOpen(false);
                    }}
                  >
                    {t("menuBar.closeWindow", { window: activeWindowLabel })}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="c-menuBar__right">
        <div className="c-menuBar__right_spotlight">
          <button
            type="button"
            className={`${isSpotlightOpen ? "active" : ""}`}
            aria-label={t("menuBar.spotlightLabel")}
            aria-expanded={isSpotlightOpen}
            data-spotlight-trigger
            onClick={() => {
              setIsAppleMenuOpen(false);
              setIsWindowMenuOpen(false);
              setIsControlCenterOpen(false);
              if (isSpotlightOpen) {
                closeSpotlight();
                return;
              }
              openSpotlight();
            }}
          >
            <img src={searchIcon} alt="magnifier" />
          </button>
        </div>
        <div className="c-menuBar__right_controlCenter" ref={controlCenterRef}>
          <button
            type="button"
            className={`${iscontrolCenterOpen ? "active" : ""}`}
            aria-label={t("menuBar.controlCenterLabel")}
            aria-expanded={iscontrolCenterOpen}
            onClick={() => {
              setIsAppleMenuOpen(false);
              setIsWindowMenuOpen(false);
              closeSpotlight();
              setIsControlCenterOpen((prev) => !prev);
            }}
          >
            <img src={controlCenterIcon} alt="" />
          </button>
          {iscontrolCenterOpen && <ControlCenterDropdown />}
        </div>
        <strong className="c-menuBar__date">
          <span className="c-menuBar__date_dayMonth">{dateLabel}</span>
          <span className="c-menuBar__dateTime">{timeLabel}</span>
        </strong>
      </div>
    </div>
  );
};

export default MenuBar;
