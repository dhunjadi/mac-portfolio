import type { CSSProperties } from "react";
import brightnessIcon from "/icons/brightness.svg";
import { useBrightness, useSettingsActions } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";

const ControlCenterDropdown = () => {
  const { t } = useTranslation();
  const brightness = useBrightness();
  const { setBrightness } = useSettingsActions();

  return (
    <div
      className="c-controlCenterDropdown"
      role="menu"
      aria-label={t("controlCenter.menuLabel")}
    >
      <div className="c-controlCenterDropdown__display">
        <p className="c-controlCenterDropdown__display_title">
          {t("controlCenter.display")}
        </p>
        <div
          className="c-controlCenterDropdown__display_sliderContainer"
          aria-hidden
        >
          <div>
            <img src={brightnessIcon} alt={t("controlCenter.brightnessAlt")} />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            aria-label={t("controlCenter.brightness")}
            onChange={(event) =>
              setBrightness(Number(event.currentTarget.value))
            }
            style={{ "--range-fill": brightness } as CSSProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlCenterDropdown;
