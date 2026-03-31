/// <reference types="vite-plugin-svgr/client" />

import WindowWrapper from "../../WindowWrapper";
import DesktopPanel from "./panels/DesktopPanel";
import { useTranslation } from "react-i18next";
import ApplicationsPanel from "./panels/ApplicationsPanel";
import { useState } from "react";
import { finderCategories } from "../../../data/finderCategories";
import type { FinderCategoryId } from "../../../types";
import ChevronLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "../../../assets/icons/chevron-right.svg?react";
import { useSidebarIconSize } from "../../../stores/settingsStore";
import { getSidebarIconSizeClass } from "../../../utils";

type FinderWindowProps = {
  onClose: () => void;
};

const FinderWindow = ({ onClose }: FinderWindowProps) => {
  const { t } = useTranslation();
  const sidebarIconSize = useSidebarIconSize();

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    finderCategories[0]?.id ?? "",
  );

  const selectedCategory = finderCategories.find(
    (category) => category.id === selectedCategoryId,
  );

  const renderPanelByCategoryId = (categoryId: FinderCategoryId) => {
    if (categoryId === "desktop") return <DesktopPanel />;
    if (categoryId === "applications") return <ApplicationsPanel />;

    return <></>;
  };

  return (
    <WindowWrapper
      windowId="finder"
      onClose={onClose}
      layout="sidebar"
      className="w-finder"
      sidebar={
        <aside className="w-finder__sidebar">
          <p>{t("windows.finder.favorites")}</p>
          <ul>
            {finderCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={category.id === selectedCategoryId ? "active" : ""}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <li className={getSidebarIconSizeClass(sidebarIconSize)}>
                    <Icon
                      className={getSidebarIconSizeClass(sidebarIconSize)}
                    />
                    {t(category.labelKey)}
                  </li>
                </button>
              );
            })}
          </ul>
        </aside>
      }
    >
      <section className="w-finder__content">
        <div className="w-finder__content_header drag-handler">
          <ChevronLeftIcon className="no-drag" />
          <ChevronRightIcon className="no-drag" />
          <h3>{t(selectedCategory?.labelKey || "")}</h3>
        </div>
        {renderPanelByCategoryId(selectedCategoryId)}
      </section>
    </WindowWrapper>
  );
};

export default FinderWindow;
