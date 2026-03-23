import { useState } from "react";
import WindowWrapper from "../WindowWrapper";
import { settingsCategories } from "../../data/settingsCategories";
import AppearancePanel from "../AppearancePanel";
import WallpaperPanel from "../WallpaperPanel";
import DockPanel from "../DockPanel";
import LanguagePanel from "../LanguagePanel";
import avatarPicture from "/avatar.jpg";
import { useTranslation } from "react-i18next";

type SettingsWindowProps = {
  onClose: () => void;
};

const SettingsWindow = ({ onClose }: SettingsWindowProps) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    settingsCategories[0]?.id ?? "",
  );

  const renderPanelByCategoryId = (categoryId: string) => {
    if (categoryId === "appearance") return <AppearancePanel />;
    if (categoryId === "wallpaper") return <WallpaperPanel />;
    if (categoryId === "dock") return <DockPanel />;
    if (categoryId === "language") return <LanguagePanel />;
    return <></>;
  };

  return (
    <WindowWrapper windowId="settings" onClose={onClose}>
      <div className="w-settings">
        <div className="w-settings__sideBar">
          <div className="w-settings__sideBar_searchInput">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t("windows.settings.searchPlaceholder")}
            />
          </div>

          <div className="w-settings__sideBar_userInfo">
            <img src={avatarPicture} alt="user" />
            <div className="w-settings__sideBar_userInfo--text">
              <p>Dario Hunjadi</p>
              <small>@epl_aj_di</small>
            </div>
          </div>

          <ul className="w-settings__sideBar_categories">
            {settingsCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selectedCategoryId ? "active" : ""}
                onClick={() => setSelectedCategoryId(item.id)}
              >
                <li>
                  <img src={item.icon} alt="item icon" />
                  {t(item.labelKey)}
                </li>
              </button>
            ))}
          </ul>
        </div>

        <div className="w-settings__content">
          {renderPanelByCategoryId(selectedCategoryId)}
        </div>
      </div>
    </WindowWrapper>
  );
};

export default SettingsWindow;
