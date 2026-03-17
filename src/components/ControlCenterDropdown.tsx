import type { CSSProperties } from "react";
import brightnessIcon from "/icons/brightness.svg";
import { useBrightness, useSettingsActions } from "../stores/settingsStore";

const ControlCenterDropdown = () => {
  const brightness = useBrightness();
  const { setBrightness } = useSettingsActions();

  return (
    <div
      className="c-controlCenterDropdown"
      role="menu"
      aria-label="Control center menu"
    >
      <div className="c-controlCenterDropdown__section">
        <span className="c-controlCenterDropdown__section_title">Display</span>
        <div className="c-controlCenterDropdown__section_sliderRow">
          <div aria-hidden>
            <img src={brightnessIcon} alt="brightness" />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            aria-label="Brightness"
            onChange={(event) =>
              setBrightness(Number(event.currentTarget.value))
            }
            style={
              {
                "--brightness-fill": `${brightness}%`,
              } as CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ControlCenterDropdown;
