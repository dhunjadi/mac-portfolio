import { useEffect, useState, type CSSProperties } from "react";
import {
  useDockIconMaxSize,
  useDockIconScale,
  useDockPosition,
  useSettingsActions,
} from "../stores/settingsStore";
import { clampDockIconSize, getDockIconSizeLimits } from "../utils/dockSizing";
import { useTranslation } from "react-i18next";

const DockPanel = () => {
  const { t } = useTranslation();
  const dockPosition = useDockPosition();
  const dockIconMaxSize = useDockIconMaxSize();
  const dockIconScale = useDockIconScale();
  const { setDockPosition, setDockIconMaxSize, setDockIconScale } =
    useSettingsActions();
  const [sizeLimits, setSizeLimits] = useState(() =>
    getDockIconSizeLimits(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setSizeLimits(getDockIconSizeLimits(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dockIconMaxSize === null) {
      setDockIconMaxSize(sizeLimits.max);
      return;
    }

    const clamped = clampDockIconSize(dockIconMaxSize, sizeLimits);
    if (clamped !== dockIconMaxSize) {
      setDockIconMaxSize(clamped);
    }
  }, [dockIconMaxSize, setDockIconMaxSize, sizeLimits]);

  const sliderValue = dockIconMaxSize ?? sizeLimits.max;

  return (
    <section className="c-dockPanel">
      <div className="c-dockPanel__group">
        <div className="c-dockPanel__group_input c-dockPanel__group_input--row">
          <label htmlFor="dock-position">
            {t("windows.settings.categories.dock.positionLabel")}
          </label>
          <select
            id="dock-position"
            value={dockPosition}
            onChange={(event) =>
              setDockPosition(event.target.value as "left" | "bottom" | "right")
            }
          >
            <option value="left">
              {t("windows.settings.categories.dock.positionLeft")}
            </option>
            <option value="bottom">
              {t("windows.settings.categories.dock.positionBottom")}
            </option>
            <option value="right">
              {t("windows.settings.categories.dock.positionRight")}
            </option>
          </select>
        </div>

        <div className="c-dockPanel__group_input">
          <label htmlFor="dock-icon-size">
            {`${t("windows.settings.categories.dock.iconSizeLabel")}: ${Math.round(sliderValue)}px`}
          </label>
          <input
            id="dock-icon-size"
            type="range"
            min={sizeLimits.min}
            max={sizeLimits.max}
            step="1"
            value={sliderValue}
            onChange={(event) => setDockIconMaxSize(Number(event.target.value))}
            style={
              {
                "--range-fill":
                  ((sliderValue - sizeLimits.min) /
                    (sizeLimits.max - sizeLimits.min)) *
                  100,
              } as CSSProperties
            }
          />
        </div>

        <div className="c-dockPanel__group_input">
          <label htmlFor="dock-icon-scale">
            {`${t("windows.settings.categories.dock.iconScaleLabel")}: ${dockIconScale.toFixed(1)}x`}
          </label>
          <input
            id="dock-icon-scale"
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={dockIconScale}
            onChange={(event) => setDockIconScale(Number(event.target.value))}
            style={
              {
                "--range-fill": ((dockIconScale - 1) / (2 - 1)) * 100,
              } as CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
};

export default DockPanel;
