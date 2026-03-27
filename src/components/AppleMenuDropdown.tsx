import type { AppleMenuDropdownItem } from "../types";
import { useTranslation } from "react-i18next";
import { APPLE_MENU_ITEMS, getAppleMenuItemLabel } from "../data/windowData";

type AppleMenuDropdownProps = {
  onSelect: (action: AppleMenuDropdownItem) => void;
};

const AppleMenuDropdown = ({ onSelect }: AppleMenuDropdownProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="c-appleMenuDropdown"
      role="menu"
      aria-label={t("appleMenu.ariaLabel")}
    >
      {APPLE_MENU_ITEMS.map((item) => {
        if (item.type === "divider") {
          return (
            <div
              key={item.id}
              role="separator"
              className="c-appleMenuDropdown__separator"
            />
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className="c-appleMenuDropdown__item"
            onClick={() => onSelect(item.id)}
          >
            {getAppleMenuItemLabel(item, t)}
          </button>
        );
      })}
    </div>
  );
};

export default AppleMenuDropdown;
