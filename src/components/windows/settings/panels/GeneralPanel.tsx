import { useSettingsActions } from "../../../../stores/settingsStore";
import ChevronRight from "../../../../assets/icons/chevron-right.svg?react";
import { useTranslation } from "react-i18next";

const GeneralPanel = () => {
  const { t } = useTranslation();
  const { setActivePanel } = useSettingsActions();

  return (
    <div className="c-generalPanel">
      <div className="c-generalPanel__group">
        <button
          className="c-generalPanel__group_button"
          onClick={() =>
            setActivePanel({
              labelKey: "windows.settings.categories.about.title",
              value: "about",
            })
          }
        >
          <span>{t("windows.settings.categories.general.about")}</span>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>
      </div>
      <div className="c-generalPanel__group">
        <button
          className="c-generalPanel__group_button"
          onClick={() =>
            setActivePanel({
              labelKey: "windows.settings.categories.language.title",
              value: "language",
            })
          }
        >
          <span>{t("windows.settings.categories.general.languageRegion")}</span>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>

        <button
          className="c-generalPanel__group_button"
          onClick={() =>
            setActivePanel({
              labelKey: "windows.settings.categories.dateAndTime.title",
              value: "dateAndTime",
            })
          }
        >
          <span>{t("windows.settings.categories.general.dateAndTime")}</span>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>
      </div>
    </div>
  );
};

export default GeneralPanel;
