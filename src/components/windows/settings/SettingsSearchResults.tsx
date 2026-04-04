import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  settingsPanelLabelKeys,
  settingsSearchItems,
} from "../../../data/settingsSearchItems";
import { settingsCategories } from "../../../data/settingsCategories";
import type {
  SettingsCategoryPanel,
  SettingsPanel,
  SettingsSidebarPanel,
} from "../../../types";
import { useSidebarIconSize } from "../../../stores/settingsStore";
import { getSidebarIconSizeClass } from "../../../utils";

type SettingsSearchResultsProps = {
  searchText: string;
  activeSearchItemId: string | null;
  onActiveSearchItemChange: (id: string | null) => void;
  setActivePanel: (panel: SettingsPanel) => void;
  setActiveSidebarPanel: (panel: SettingsSidebarPanel) => void;
};

const normalizeForSearch = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SettingsSearchResults = ({
  searchText,
  activeSearchItemId,
  onActiveSearchItemChange,
  setActivePanel,
  setActiveSidebarPanel,
}: SettingsSearchResultsProps) => {
  const { t } = useTranslation();
  const sidebarIconSize = useSidebarIconSize();
  const normalizedSearchText = searchText.trim();
  const isSearching = normalizedSearchText.length > 0;

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
    const groupOrder: SettingsCategoryPanel[] = [
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

  if (!isSearching) {
    return null;
  }

  return (
    <div className="c-settingsSearchResults">
      {groupedSearchResults.length === 0 && (
        <p className="c-settingsSearchResults__noResults">
          {t("windows.settings.searchNoResults", {
            query: normalizedSearchText,
          })}
        </p>
      )}
      {groupedSearchResults.map((group) => (
        <div key={group.id} className="c-settingsSearchResults__searchGroup">
          <p className="c-settingsSearchResults__searchGroup_title">
            {(() => {
              const exactCategory = settingsCategories.find(
                (category) => category.id === group.id,
              );
              const generalCategory = settingsCategories.find(
                (category) => category.id === "general",
              );
              const icon =
                exactCategory?.icon ?? generalCategory?.icon ?? null;
              if (!icon) {
                return group.label;
              }
              return (
                <>
                  <img
                    src={icon as string}
                    alt="group icon"
                    className={getSidebarIconSizeClass(sidebarIconSize)}
                  />
                  <span>{group.label}</span>
                </>
              );
            })()}
          </p>
          <div className="c-settingsSearchResults__searchGroup_list">
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${item.id === activeSearchItemId ? " active" : ""}`}
                onClick={() => {
                  onActiveSearchItemChange(item.id);
                  const sidebarCategory = settingsCategories.find(
                    (category) => category.id === item.sidebarCategoryId,
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
  );
};

export default SettingsSearchResults;
