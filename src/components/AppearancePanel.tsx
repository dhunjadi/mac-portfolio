import { colorOptions } from "../data/colorOptions";
import { useTranslation } from "react-i18next";
import ColorPicker from "./ColorPicker";
import {
  useAccentColor,
  useHighlightColor,
  useSettingsActions,
  useThemePreference,
} from "../stores/settingsStore";

const AppearancePanel = () => {
  const { t } = useTranslation();
  const themeLabel = t("windows.settings.categories.appearance.themeLabel");
  const accentColorLabel = t(
    "windows.settings.categories.appearance.accentColorLabel",
  );
  const highlightColorLabel = t(
    "windows.settings.categories.appearance.highlightColorLabel",
  );
  const accentColor = useAccentColor();
  const highlightColor = useHighlightColor();
  const themePreference = useThemePreference();
  const { setAccentColor, setHighlightColor, setThemePreference } =
    useSettingsActions();

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
          className="c-appearancePanel__input_theme"
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
        <label>{accentColorLabel}</label>
        <ColorPicker
          colors={colorOptions}
          value={accentColor}
          onChange={(color) => setAccentColor(color.toLowerCase())}
        />
      </div>

      <div className="c-appearancePanel__input">
        <label>{highlightColorLabel}</label>
        <ColorPicker
          colors={colorOptions}
          value={highlightColor}
          onChange={(color) => setHighlightColor(color.toLowerCase())}
        />
      </div>
    </section>
  );
};

export default AppearancePanel;
