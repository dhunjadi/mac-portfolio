import { useSettingsActions } from "../../../../stores/settingsStore";
import ChevronRight from "../../../../assets/icons/chevron-right.svg?react";
import { useTranslation } from "react-i18next";
import CalendarIcon from "/icons/calendar.svg";
import GlobeIcon from "/icons/globe.svg";
import LaptopIcon from "/icons/laptop.svg";

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
          <div>
            <img src={LaptopIcon} alt="laptop icon" />
            <span>{t("windows.settings.categories.general.about")}</span>
          </div>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>
      </div>
      <div className="c-generalPanel__group">
        <button
          className="c-generalPanel__group_button c-generalPanel__group_button--blueIcon"
          onClick={() =>
            setActivePanel({
              labelKey: "windows.settings.categories.language.title",
              value: "language",
            })
          }
        >
          <div>
            <img src={GlobeIcon} alt="globe icon" />
            <span>
              {t("windows.settings.categories.general.languageRegion")}
            </span>
          </div>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>

        <button
          className="c-generalPanel__group_button c-generalPanel__group_button--blueIcon"
          onClick={() =>
            setActivePanel({
              labelKey: "windows.settings.categories.dateAndTime.title",
              value: "dateAndTime",
            })
          }
        >
          <div>
            <img src={CalendarIcon} alt="calendar icon" />
            <span>{t("windows.settings.categories.general.dateAndTime")}</span>
          </div>

          <ChevronRight className="c-generalPanel__group_chevron" />
        </button>
      </div>
    </div>
  );
};

export default GeneralPanel;
