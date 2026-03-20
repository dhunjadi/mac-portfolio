import { useEffect, useState } from "react";
import {
  useDockIconMaxSize,
  useDockIconScale,
  useDockPosition,
  useSettingsActions,
} from "../stores/settingsStore";
import {
  clampDockIconSize,
  getDockIconSizeLimits,
} from "../utils/dockSizing";

const DockPanel = () => {
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
      <h2 className="c-dockPanel__title">Dock</h2>
      <p className="c-dockPanel__subTitle">Change dock settings</p>

      <div className="c-dockPanel__input">
        <label htmlFor="dock-position">Position</label>
        <select
          id="dock-position"
          value={dockPosition}
          onChange={(event) =>
            setDockPosition(event.target.value as "left" | "bottom" | "right")
          }
        >
          <option value="left">Left</option>
          <option value="bottom">Bottom</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="c-dockPanel__input">
        <label htmlFor="dock-icon-size">
          Icon size: {Math.round(sliderValue)}px
        </label>
        <input
          id="dock-icon-size"
          type="range"
          min={sizeLimits.min}
          max={sizeLimits.max}
          step="1"
          value={sliderValue}
          onChange={(event) =>
            setDockIconMaxSize(Number(event.target.value))
          }
        />
      </div>

      <div className="c-dockPanel__input">
        <label htmlFor="dock-icon-scale">
          Icon scale: {dockIconScale.toFixed(1)}x
        </label>
        <input
          id="dock-icon-scale"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={dockIconScale}
          onChange={(event) => setDockIconScale(Number(event.target.value))}
        />
      </div>
    </section>
  );
};

export default DockPanel;
