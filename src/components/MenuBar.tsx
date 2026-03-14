import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { useLogin } from "../stores/loginStore";
import { useActiveWindowId, useWindowActions } from "../stores/windowStore";
import AppleMenuDropdown from "./AppleMenuDropdown";
import type { AppleMenuDropdownItem } from "../types";
import { usePowerActions } from "../stores/powerStore";

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
  const appleMenuRef = useRef<HTMLDivElement | null>(null);
  const windowMenuRef = useRef<HTMLDivElement | null>(null);
  const date = dayjs().format("ddd D MMM HH:mm");

  useEffect(() => {
    if (!isAppleMenuOpen && !isWindowMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const isInsideAppleMenu = appleMenuRef.current?.contains(target) ?? false;
      const isInsideWindowMenu =
        windowMenuRef.current?.contains(target) ?? false;
      if (isInsideAppleMenu || isInsideWindowMenu) return;
      setIsAppleMenuOpen(false);
      setIsWindowMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsAppleMenuOpen(false);
      setIsWindowMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isAppleMenuOpen, isWindowMenuOpen]);

  const menuBarWindowLabels = useMemo(
    () => ({
      about: "About This Dev",
      calculator: "Calculator",
      pdf: "PDF",
      weather: "Weather",
      settings: "Settings",
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
                setIsAppleMenuOpen((previousState) => !previousState);
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
                  setIsWindowMenuOpen((previousState) => !previousState);
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
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
