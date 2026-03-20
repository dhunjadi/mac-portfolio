import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { useLogin } from "../stores/loginStore";
import { useActiveWindowId, useWindowActions } from "../stores/windowStore";
import AppleMenuDropdown from "./AppleMenuDropdown";
import type { AppleMenuDropdownItem } from "../types";
import { usePowerActions } from "../stores/powerStore";
import controlCenterIcon from "/icons/control-center.png";
import ControlCenterDropdown from "./ControlCenterDropdown";

type MenuBarProps = {
  hideAppleLogo?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const MenuBar = ({ hideAppleLogo, ref }: MenuBarProps) => {
  const isLoggedIn = useLogin();
  const { openWindow, closeWindow } = useWindowActions();
  const { setIsSleeping } = usePowerActions();
  const activeWindowId = useActiveWindowId();

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

  const menuBarWindowLabels = useMemo(
    () => ({
      about: "About This Dev",
      calculator: "Calculator",
      pdf: "PDF",
      weather: "Weather",
      settings: "Settings",
      "text-editor": "Text Editor",
    }),
    [],
  );

  const activeWindowLabel = activeWindowId
    ? menuBarWindowLabels[activeWindowId as keyof typeof menuBarWindowLabels]
    : undefined;

  const handleAppleMenuSelect = (item: AppleMenuDropdownItem) => {
    if (item === "sleep") {
      setIsSleeping(true);
      setIsAppleMenuOpen(false);
      return;
    }

    openWindow(item);
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
              aria-label="Apple menu"
              aria-expanded={isAppleMenuOpen}
              onClick={() => {
                setIsWindowMenuOpen(false);
                setIsControlCenterOpen(false);
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
                aria-label={`${activeWindowLabel} menu`}
                aria-expanded={isWindowMenuOpen}
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  setIsWindowMenuOpen((prev) => !prev);
                  setIsControlCenterOpen(false);
                }}
              >
                {activeWindowLabel}
              </button>

              {isWindowMenuOpen && (
                <div role="menu" aria-label={`${activeWindowLabel} menu`}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      if (!activeWindowId) return;
                      closeWindow(activeWindowId);
                      setIsWindowMenuOpen(false);
                    }}
                  >
                    Close {activeWindowLabel}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="c-menuBar__right">
        <div className="c-menuBar__right_controlCenter" ref={controlCenterRef}>
          <button
            type="button"
            className={`${iscontrolCenterOpen ? "active" : ""}`}
            aria-label="Control center menu"
            aria-expanded={iscontrolCenterOpen}
            onClick={() => {
              setIsAppleMenuOpen(false);
              setIsWindowMenuOpen(false);
              setIsControlCenterOpen((prev) => !prev);
            }}
          >
            <img src={controlCenterIcon} alt="" />
          </button>
          {iscontrolCenterOpen && <ControlCenterDropdown />}
        </div>
        <strong className="c-menuBar__date">
          <span className="c-menuBar__date_dayMonth">
            {now.format("ddd D MMM")}
          </span>
          <span className="c-menuBar__dateTime">{now.format("HH:mm")}</span>
        </strong>
      </div>
    </div>
  );
};

export default MenuBar;
