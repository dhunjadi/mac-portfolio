import { colorOptions } from "../data/colorOptions";
import {
  useBlur,
  useAccentColor,
  useGlassAlpha,
  useGlassColor,
  useHighlightColor,
  useSettingsActions,
} from "../stores/settingsStore";

const AppearancePanel = () => {
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const glassColor = useGlassColor();
  const accentColor = useAccentColor();
  const highlightColor = useHighlightColor();
  const {
    setGlassAlpha,
    setBlur,
    setGlassColor,
    setAccentColor,
    setHighlightColor,
  } = useSettingsActions();

  return (
    <section className="c-appearancePanel">
      <h2 className="c-appearancePanel__title">Appearance</h2>
      <p className="c-appearancePanel__subTitle">
        Adjust the color and how strong the glass effect looks.
      </p>

      <div className="c-appearancePanel__input">
        <label>Glass color</label>
        <div
          className="c-appearancePanel__input_colors"
          role="radiogroup"
          aria-label="Glass color"
        >
          {colorOptions.map((color) => (
            <button
              key={color}
              className={` ${glassColor.toUpperCase() === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setGlassColor(color.toLowerCase())}
              type="button"
              role="radio"
              aria-checked={glassColor.toUpperCase() === color}
              aria-label={`Set glass color to ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="c-appearancePanel__input">
        <label htmlFor="glass-transparency">
          Color fill: {Math.round(glassAlpha * 100)}%
        </label>
        <input
          id="glass-transparency"
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={glassAlpha}
          onChange={(event) => setGlassAlpha(Number(event.target.value))}
        />
      </div>

      <div className="c-appearancePanel__input">
        <label htmlFor="blur">Blur: {Math.round(blurIntensity)}</label>
        <input
          id="blur"
          type="range"
          min="0"
          max="100"
          step="1"
          value={blurIntensity}
          onChange={(event) => setBlur(Number(event.target.value))}
        />
      </div>

      <div className="c-appearancePanel__input">
        <label>Accent color</label>
        <div
          className="c-appearancePanel__input_colors"
          role="radiogroup"
          aria-label="Accent color"
        >
          {colorOptions.map((color) => (
            <button
              key={`accent-${color}`}
              className={`${accentColor.toUpperCase() === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setAccentColor(color.toLowerCase())}
              type="button"
              role="radio"
              aria-checked={accentColor.toUpperCase() === color}
              aria-label={`Set accent color to ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="c-appearancePanel__input">
        <label>Highlight color</label>
        <div
          className="c-appearancePanel__input_colors"
          role="radiogroup"
          aria-label="Highlight color"
        >
          {colorOptions.map((color) => (
            <button
              key={`highlight-${color}`}
              className={`${highlightColor.toUpperCase() === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setHighlightColor(color.toLowerCase())}
              type="button"
              role="radio"
              aria-checked={highlightColor.toUpperCase() === color}
              aria-label={`Set highlight color to ${color}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppearancePanel;
