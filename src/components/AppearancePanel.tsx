import {
  useBlur,
  useGlassAlpha,
  useSettingsActions,
} from "../stores/settingsStore";

const AppearancePanel = () => {
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const { setGlassAlpha, setBlur } = useSettingsActions();

  return (
    <section className="c-appearancePanel">
      <h2 className="c-appearancePanel__title">Appearance</h2>
      <p className="c-appearancePanel__subTitle">
        Adjust how strong the glass effect looks.
      </p>

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
