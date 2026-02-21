import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { useLogin } from "../stores/loginStore";
import { useWindowActions } from "../stores/windowStore";
import AppleMenuDropdown from "./AppleMenuDropdown";
import type { AppleMenuDropdownItem } from "../types";

type MenuBarProps = {
  hideAppleLogo?: boolean;
};

const MenuBar = ({ hideAppleLogo }: MenuBarProps) => {
  const isLoggedIn = useLogin();
  const { openWindow } = useWindowActions();
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const appleMenuRef = useRef<HTMLDivElement | null>(null);
  const date = dayjs().format("ddd D MMM HH:mm");

  useEffect(() => {
    if (!isAppleMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAppleMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isAppleMenuOpen]);

  const handleAppleMenuSelect = (item: AppleMenuDropdownItem) => {
    openWindow(item);
    setIsAppleMenuOpen(false);
  };

  return (
    <div className={`c-menuBar ${isLoggedIn ? "" : "hidden"}`}>
      {!hideAppleLogo && (
        <div className="c-menuBar__apple" ref={appleMenuRef}>
          <button
            type="button"
            className={`c-menuBar__apple_button ${isAppleMenuOpen ? "active" : ""}`}
            aria-label="Apple menu"
            aria-expanded={isAppleMenuOpen}
            onClick={() =>
              setIsAppleMenuOpen((previousState) => !previousState)
            }
          >
            <FontAwesomeIcon icon={faApple} color="white" />
          </button>

          {isAppleMenuOpen && (
            <AppleMenuDropdown onSelect={handleAppleMenuSelect} />
          )}
        </div>
      )}
      <strong className="c-menuBar__date">{date}</strong>
    </div>
  );
};

export default MenuBar;
