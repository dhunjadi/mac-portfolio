import type { AppleMenuDropdownItem } from "../types";
import { useTranslation } from "react-i18next";

type AppleMenuDropdownProps = {
  onSelect: (action: AppleMenuDropdownItem) => void;
};

type MenuItem =
  | { type: "item"; id: AppleMenuDropdownItem; label: string }
  | { type: "divider"; id: string };

const AppleMenuDropdown = ({ onSelect }: AppleMenuDropdownProps) => {
  const { t } = useTranslation();
  const menuItems: MenuItem[] = [
    { type: "item", id: "about", label: t("appleMenu.items.about") },
    { type: "divider", id: "divider-1" },
    { type: "item", id: "calculator", label: t("appleMenu.items.calculator") },
    {
      type: "item",
      id: "text-editor",
      label: t("appleMenu.items.textEditor"),
    },
    { type: "item", id: "weather", label: t("appleMenu.items.weather") },
    { type: "item", id: "settings", label: t("appleMenu.items.settings") },
    { type: "divider", id: "divider-2" },
    { type: "item", id: "sleep", label: t("appleMenu.items.sleep") },
    { type: "item", id: "restart", label: t("appleMenu.items.restart") },
    { type: "item", id: "shut-down", label: t("appleMenu.items.shutDown") },
  ];

  return (
    <div
      className="c-appleMenuDropdown"
      role="menu"
      aria-label={t("appleMenu.ariaLabel")}
    >
      {menuItems.map((item) => {
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
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default AppleMenuDropdown;
