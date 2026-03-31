import { colorOptions } from "../data/colorOptions";
import { useTranslation } from "react-i18next";
import ColorPicker from "./ColorPicker";
import {
  useAccentColor,
  useHighlightColor,
  useSettingsActions,
  useSidebarIconSize,
  useThemePreference,
} from "../stores/settingsStore";
import type { SidebarIconSize } from "../types";

const AppearancePanel = () => {
  const { t } = useTranslation();
  const appearanceLabel = t(
    "windows.settings.categories.appearance.appearance",
  );
  const accentColorLabel = t(
    "windows.settings.categories.appearance.accentColorLabel",
  );
  const highlightColorLabel = t(
    "windows.settings.categories.appearance.highlightColorLabel",
  );
  const accentColor = useAccentColor();
  const highlightColor = useHighlightColor();
  const themePreference = useThemePreference();
  const sidebarIconSize = useSidebarIconSize();
  const {
    setAccentColor,
    setHighlightColor,
    setThemePreference,
    setSidebarIconSize,
  } = useSettingsActions();

  return (
    <section className="c-appearancePanel">
      <div className="c-appearancePanel__group">
        <div className="c-appearancePanel__group_input">
          <label>{appearanceLabel}</label>
          <div
            className="c-appearancePanel__group_input_appearance"
            role="radiogroup"
            aria-label={appearanceLabel}
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

        <div className="c-appearancePanel__group_input">
          <label>{accentColorLabel}</label>
          <ColorPicker
            colors={colorOptions}
            value={accentColor}
            onChange={(color) => setAccentColor(color.toLowerCase())}
          />
        </div>

        <div className="c-appearancePanel__group_input">
          <label>{highlightColorLabel}</label>
          <ColorPicker
            colors={colorOptions}
            value={highlightColor}
            onChange={(color) => setHighlightColor(color.toLowerCase())}
          />
        </div>

        <div className="c-appearancePanel__group_input c-appearancePanel__group_input--row">
          <label htmlFor="sidebar-icon-size">
            {t("windows.settings.categories.appearance.sidebarIconSize.label")}
          </label>
          <select
            id="sidebar-icon-size"
            value={sidebarIconSize}
            onChange={(event) =>
              setSidebarIconSize(event.target.value as SidebarIconSize)
            }
          >
            <option value="small">
              {t(
                "windows.settings.categories.appearance.sidebarIconSize.small",
              )}
            </option>
            <option value="medium">
              {t(
                "windows.settings.categories.appearance.sidebarIconSize.medium",
              )}
            </option>
            <option value="large">
              {t(
                "windows.settings.categories.appearance.sidebarIconSize.large",
              )}
            </option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default AppearancePanel;
