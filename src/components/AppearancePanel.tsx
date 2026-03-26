import type { CSSProperties } from "react";
import { colorOptions } from "../data/colorOptions";
import { useTranslation } from "react-i18next";
import {
  useBlur,
  useAccentColor,
  useGlassAlpha,
  useHighlightColor,
  useSettingsActions,
  useThemePreference,
} from "../stores/settingsStore";

const AppearancePanel = () => {
  const { t } = useTranslation();
  const themeLabel = t("windows.settings.categories.appearance.themeLabel");
  const colorFillLabel = t(
    "windows.settings.categories.appearance.colorFillLabel",
  );
  const blurLabel = t("windows.settings.categories.appearance.blurLabel");
  const accentColorLabel = t(
    "windows.settings.categories.appearance.accentColorLabel",
  );
  const highlightColorLabel = t(
    "windows.settings.categories.appearance.highlightColorLabel",
  );
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const accentColor = useAccentColor();
  const highlightColor = useHighlightColor();
  const themePreference = useThemePreference();
  const {
    setGlassAlpha,
    setBlur,
    setAccentColor,
    setHighlightColor,
    setThemePreference,
  } = useSettingsActions();

  return (
    <section className="c-appearancePanel">
      <h2 className="c-appearancePanel__title">
        {t("windows.settings.categories.appearance.title")}
      </h2>
      <p className="c-appearancePanel__subTitle">
        {t("windows.settings.categories.appearance.subtitle")}
      </p>

      <div className="c-appearancePanel__input">
        <label>{themeLabel}</label>
        <div
          className="c-appearancePanel__buttons"
          role="radiogroup"
          aria-label={themeLabel}
        >
          <button
            type="button"
            role="radio"
            aria-checked={themePreference === "light"}
            className={themePreference === "light" ? "active" : ""}
            onClick={() => setThemePreference("light")}
          >
            {t("windows.settings.categories.appearance.themeLightLabel")}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={themePreference === "dark"}
            className={themePreference === "dark" ? "active" : ""}
            onClick={() => setThemePreference("dark")}
          >
            {t("windows.settings.categories.appearance.themeDarkLabel")}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={themePreference === "auto"}
            className={themePreference === "auto" ? "active" : ""}
            onClick={() => setThemePreference("auto")}
          >
            {t("windows.settings.categories.appearance.themeAutoLabel")}
          </button>
        </div>
      </div>

      <div className="c-appearancePanel__input">
        <label htmlFor="glass-transparency">
          {`${colorFillLabel}: ${Math.round(glassAlpha * 100)}%`}
        </label>
        <input
          id="glass-transparency"
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={glassAlpha}
          onChange={(event) => setGlassAlpha(Number(event.target.value))}
          style={
            {
              "--range-fill": ((glassAlpha - 0.1) / 0.9) * 100,
            } as CSSProperties
          }
        />
      </div>

      <div className="c-appearancePanel__input">
        <label htmlFor="blur">{`${blurLabel}: ${Math.round(blurIntensity)}`}</label>
        <input
          id="blur"
          type="range"
          min="0"
          max="100"
          step="1"
          value={blurIntensity}
          onChange={(event) => setBlur(Number(event.target.value))}
          style={
            {
              "--range-fill": blurIntensity,
            } as CSSProperties
          }
        />
      </div>

      <div className="c-appearancePanel__input">
        <label>{accentColorLabel}</label>
        <div
          className="c-appearancePanel__input_colors"
          role="radiogroup"
          aria-label={accentColorLabel}
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
              aria-label={`${accentColorLabel}: ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="c-appearancePanel__input">
        <label>{highlightColorLabel}</label>
        <div
          className="c-appearancePanel__input_colors"
          role="radiogroup"
          aria-label={highlightColorLabel}
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
              aria-label={`${highlightColorLabel}: ${color}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppearancePanel;
