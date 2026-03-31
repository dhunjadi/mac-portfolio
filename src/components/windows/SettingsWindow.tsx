import { useState } from "react";
import WindowWrapper from "../WindowWrapper";
import { settingsCategories } from "../../data/settingsCategories";
import AppearancePanel from "../AppearancePanel";
import WallpaperPanel from "../WallpaperPanel";
import DockPanel from "../DockPanel";
import LanguagePanel from "../LanguagePanel";
import avatarPicture from "/avatar.jpg";
import { useTranslation } from "react-i18next";
import { useSidebarIconSize } from "../../stores/settingsStore";
import { getSidebarIconSizeClass } from "../../utils";

type SettingsWindowProps = {
  onClose: () => void;
};

const SettingsWindow = ({ onClose }: SettingsWindowProps) => {
  const { t } = useTranslation();
  const sidebarIconSize = useSidebarIconSize();

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

  const selectedCategory = settingsCategories.find(
    (category) => category.id === selectedCategoryId,
  );

  return (
    <WindowWrapper
      windowId="settings"
      onClose={onClose}
      layout="sidebar"
      className="w-settings"
      sidebar={
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
            {settingsCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={category.id === selectedCategoryId ? "active" : ""}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <li className={getSidebarIconSizeClass(sidebarIconSize)}>
                  <img
                    src={category.icon as string}
                    alt="item icon"
                    className={getSidebarIconSizeClass(sidebarIconSize)}
                  />
                  {t(category.labelKey)}
                </li>
              </button>
            ))}
          </ul>
        </div>
      }
    >
      <div className="w-settings__content">
        <div className="w-settings__content_header drag-handler">
          <h3>{t(selectedCategory?.labelKey || "")}</h3>
        </div>
        {renderPanelByCategoryId(selectedCategoryId)}
      </div>
    </WindowWrapper>
  );
};

export default SettingsWindow;
