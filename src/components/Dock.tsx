import type { CSSProperties } from "react";
import appleLogo from "/icons/apple-logo.svg";

type DockProps = {
  isVisible?: boolean;
};

const Dock = ({ isVisible }: DockProps) => {
  const icons = [appleLogo, appleLogo, appleLogo, appleLogo];
  const dockStyle = {
    "--dock-items": icons.length,
  } as CSSProperties;

  return (
    <div className={`c-dock ${isVisible ? "" : "hidden"}`} style={dockStyle}>
      {icons.map((icon, index) => (
        <img src={icon} alt="" key={index} />
      ))}
    </div>
  );
};

export default Dock;
