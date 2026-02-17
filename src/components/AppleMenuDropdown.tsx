type AppleMenuDropdownProps = {
  onSelect: (action: string) => void;
};

const menuItems = [
  "About This Mac",
  "Calculator",
  "Weather",
  "System Preferences",
];

const AppleMenuDropdown = ({ onSelect }: AppleMenuDropdownProps) => {
  return (
    <div className="c-appleMenuDropdown" role="menu" aria-label="Apple menu">
      {menuItems.map((item) => (
        <button
          key={item}
          type="button"
          role="menuitem"
          className="c-appleMenuDropdown__item"
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default AppleMenuDropdown;
