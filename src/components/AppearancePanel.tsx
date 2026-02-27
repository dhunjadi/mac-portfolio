import {
  useBlur,
  useGlassAlpha,
  useGlassColor,
  useSettingsActions,
} from "../stores/settingsStore";

const colorOptions = [
  "#000000",
  "#0A84FF",
  "#AF52DE",
  "#FF2D55",
  "#FF4D5A",
  "#FF9F0A",
  "#FFD60A",
  "#30D158",
  "#8E8E93",
];

const AppearancePanel = () => {
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const glassColor = useGlassColor();
  const { setGlassAlpha, setBlur, setGlassColor } = useSettingsActions();

  return (
    <section className="c-appearancePanel">
      <h2 className="c-appearancePanel__title">Appearance</h2>
      <p className="c-appearancePanel__subTitle">
        Adjust the color and how strong the glass effect looks.
      </p>

      <div className="c-appearancePanel__input">
        <label>Glass color</label>
        <div
          className="c-appearancePanel__colors"
          role="radiogroup"
          aria-label="Glass color"
        >
          {colorOptions.map((color) => (
            <button
              key={color}
              className={`c-appearancePanel__colors_button ${glassColor.toUpperCase() === color ? "active" : ""}`}
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
    </section>
  );
};

export default AppearancePanel;
