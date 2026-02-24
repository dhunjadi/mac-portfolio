import type { AppleMenuDropdownItem } from "../types";

type AppleMenuDropdownProps = {
  onSelect: (action: AppleMenuDropdownItem) => void;
};

type MenuItem = { id: AppleMenuDropdownItem; label: string };

const menuItems: MenuItem[] = [
  { id: "about", label: "About This Dev" },
  { id: "calculator", label: "Calculator" },
  { id: "weather", label: "Weather" },
  { id: "settings", label: "Settings" },
  { id: "shut-down", label: "Shut Down..." },
];

const AppleMenuDropdown = ({ onSelect }: AppleMenuDropdownProps) => {
  return (
    <div className="c-appleMenuDropdown" role="menu" aria-label="Apple menu">
      {menuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className="c-appleMenuDropdown__item"
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default AppleMenuDropdown;
