import type { AppleMenuDropdownItem } from "../types";

type AppleMenuDropdownProps = {
  onSelect: (action: AppleMenuDropdownItem) => void;
};

type MenuItem =
  | { type: "item"; id: AppleMenuDropdownItem; label: string }
  | { type: "divider"; id: string };

const menuItems: MenuItem[] = [
  { type: "item", id: "about", label: "About This Dev" },
  { type: "divider", id: "divider-1" },
  { type: "item", id: "calculator", label: "Calculator" },
  { type: "item", id: "text-editor", label: "Text Editor" },
  { type: "item", id: "weather", label: "Weather" },
  { type: "item", id: "settings", label: "Settings" },
  { type: "divider", id: "divider-2" },
  { type: "item", id: "sleep", label: "Sleep" },
  { type: "item", id: "restart", label: "Restart..." },
  { type: "item", id: "shut-down", label: "Shut Down..." },
];

const AppleMenuDropdown = ({ onSelect }: AppleMenuDropdownProps) => {
  return (
    <div className="c-appleMenuDropdown" role="menu" aria-label="Apple menu">
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
