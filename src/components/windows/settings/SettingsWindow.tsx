import { useMemo, useState } from "react";
import WindowWrapper from "../../WindowWrapper";
import { settingsCategories } from "../../../data/settingsCategories";
import {
  settingsPanelLabelKeys,
  settingsSearchItems,
} from "../../../data/settingsSearchItems";
import AppearancePanel from "./panels/AppearancePanel";
import WallpaperPanel from "./panels/WallpaperPanel";
import DockPanel from "./panels/DockPanel";
import LanguagePanel from "./panels/LanguagePanel";
import DateAndTimePanel from "./panels/DateAndTimePanel";
import AboutPanel from "./panels/AboutPanel";
import avatarPicture from "/avatar.jpg";
import { useTranslation } from "react-i18next";
import {
  useActiveSettingsPanel,
  useActiveSettingsSidebarPanel,
  useSettingsActions,
  useSidebarIconSize,
} from "../../../stores/settingsStore";
import { getSidebarIconSizeClass } from "../../../utils";
import GeneralPanel from "./panels/GeneralPanel";
import ChevronLeft from "../../../assets/icons/chevron-left.svg?react";

type SettingsWindowProps = {
  onClose: () => void;
};

const SettingsWindow = ({ onClose }: SettingsWindowProps) => {
  const { t } = useTranslation();
  const sidebarIconSize = useSidebarIconSize();
  const activePanel = useActiveSettingsPanel();
  const activeSidebarPanel = useActiveSettingsSidebarPanel();
  const { setActivePanel, setActiveSidebarPanel } = useSettingsActions();

  const [searchText, setSearchText] = useState("");
  const [activeSearchItemId, setActiveSearchItemId] = useState<string | null>(
    null,
  );

  const normalizedSearchText = searchText.trim();
  const isSearching = normalizedSearchText.length > 0;

  const normalizeForSearch = (value: string) =>
    value
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const searchResults = useMemo(() => {
    if (!isSearching) {
      return [];
    }

    const query = normalizeForSearch(normalizedSearchText);
    if (!query) {
      return [];
    }

    const results = settingsSearchItems
      .map((item) => {
        const label = t(item.labelKey);
        const groupLabel = t(settingsPanelLabelKeys[item.groupPanelId]);
        const keywordValuesRaw = item.keywordsKey
          ? t(item.keywordsKey, {
              returnObjects: true,
              defaultValue: [],
            })
          : [];
        const keywordValues = Array.isArray(keywordValuesRaw)
          ? keywordValuesRaw
          : [];

        const normalizedLabel = normalizeForSearch(label);
        const normalizedGroupLabel = normalizeForSearch(groupLabel);
        const normalizedKeywords = keywordValues.map(normalizeForSearch);

        let score = 0;
        if (normalizedLabel.startsWith(query)) {
          score = 3;
        } else if (normalizedLabel.includes(query)) {
          score = 2;
        } else if (
          normalizedKeywords.some((keyword) => keyword.includes(query))
        ) {
          score = 1;
        } else if (normalizedGroupLabel.includes(query)) {
          score = 1;
        }

        if (score === 0) {
          return null;
        }

        return {
          id: item.id,
          label,
          panelId: item.panelId,
          sidebarCategoryId: item.sidebarCategoryId,
          groupPanelId: item.groupPanelId,
          groupLabel,
          score,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score;
        }
        return a.label.localeCompare(b.label);
      });
    return results;
  }, [isSearching, normalizedSearchText, t]);

  const groupedSearchResults = useMemo(() => {
    if (!searchResults.length) {
      return [];
    }

    const groups = new Map<
      string,
      {
        id: string;
        label: string;
        items: typeof searchResults;
        orderIndex: number;
      }
    >();
    const groupOrder = [
      "appearance",
      "wallpaper",
      "dock",
      "general",
      "language",
      "dateAndTime",
      "about",
    ];

    searchResults.forEach((item) => {
      const groupId = item.groupPanelId;
      if (!groups.has(groupId)) {
        groups.set(groupId, {
          id: groupId,
          label: item.groupLabel,
          items: [],
          orderIndex: groupOrder.indexOf(groupId),
        });
      }
      groups.get(groupId)?.items.push(item);
    });

    return Array.from(groups.values()).sort((a, b) => {
      if (a.orderIndex === -1 && b.orderIndex === -1) {
        return a.label.localeCompare(b.label);
      }
      if (a.orderIndex === -1) {
        return 1;
      }
      if (b.orderIndex === -1) {
        return -1;
      }
      return a.orderIndex - b.orderIndex;
    });
  }, [searchResults]);

  const renderPanelByCategoryId = () => {
    if (activePanel.value === "general") return <GeneralPanel />;
    if (activePanel.value === "appearance") return <AppearancePanel />;
    if (activePanel.value === "wallpaper") return <WallpaperPanel />;
    if (activePanel.value === "dock") return <DockPanel />;
    if (activePanel.value === "language") return <LanguagePanel />;
    if (activePanel.value === "dateAndTime") return <DateAndTimePanel />;
    if (activePanel.value === "about") return <AboutPanel />;
    return <></>;
  };

  const activeSidebarCategory = settingsCategories.find(
    (category) => category.id === activeSidebarPanel,
  );

  const showBackButton = activePanel.value !== activeSidebarPanel;

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
              onChange={(e) => {
                setSearchText(e.target.value);
                setActiveSearchItemId(null);
              }}
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
            {!isSearching &&
              settingsCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={category.id === activeSidebarPanel ? "active" : ""}
                  onClick={() =>
                    setActiveSidebarPanel({
                      labelKey: category.labelKey,
                      value: category.id,
                    })
                  }
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
          {isSearching && (
            <div className="w-settings__sideBar_searchResults">
              {groupedSearchResults.length === 0 && (
                <p className="w-settings__sideBar_searchEmpty">
                  {t("windows.settings.searchNoResults", {
                    query: normalizedSearchText,
                  })}
                </p>
              )}
              {groupedSearchResults.map((group) => (
                <div key={group.id} className="w-settings__sideBar_searchGroup">
                  <p className="w-settings__sideBar_searchGroupTitle">
                    {group.label}
                  </p>
                  <div className="w-settings__sideBar_searchGroupList">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`w-settings__sideBar_searchItem${
                          item.id === activeSearchItemId ? " active" : ""
                        }`}
                        onClick={() => {
                          setActiveSearchItemId(item.id);
                          const sidebarCategory = settingsCategories.find(
                            (category) =>
                              category.id === item.sidebarCategoryId,
                          );
                          if (sidebarCategory) {
                            setActiveSidebarPanel({
                              labelKey: sidebarCategory.labelKey,
                              value: sidebarCategory.id,
                            });
                          }
                          setActivePanel({
                            labelKey: settingsPanelLabelKeys[item.panelId],
                            value: item.panelId,
                          });
                        }}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="w-settings__content">
        <div className="w-settings__content_header drag-handler">
          {showBackButton && (
            <button
              type="button"
              className="w-settings__content_backButton no-drag"
              onClick={() => {
                if (!activeSidebarCategory) return;
                setActivePanel({
                  labelKey: activeSidebarCategory.labelKey,
                  value: activeSidebarCategory.id,
                });
              }}
            >
              <ChevronLeft />
            </button>
          )}
          <h3>{t(activePanel.labelKey)}</h3>
        </div>
        {renderPanelByCategoryId()}
      </div>
    </WindowWrapper>
  );
};

export default SettingsWindow;
