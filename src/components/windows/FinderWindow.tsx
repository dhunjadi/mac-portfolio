/// <reference types="vite-plugin-svgr/client" />

import WindowWrapper from "../WindowWrapper";
import DesktopPanel from "../DesktopPanel";
import { useTranslation } from "react-i18next";
import ApplicationsPanel from "../ApplicationsPanel";
import { useState } from "react";
import { finderCategories } from "../../data/finderCategories";
import type { FinderCategoryId } from "../../types";

type FinderWindowProps = {
  onClose: () => void;
};

const FinderWindow = ({ onClose }: FinderWindowProps) => {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    finderCategories[0]?.id ?? "",
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
            {finderCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={category.id === selectedCategoryId ? "active" : ""}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <li>
                  {category.icon}
                  {t(category.labelKey)}
                </li>
              </button>
            ))}
          </ul>
        </aside>
      }
    >
      <section className="w-finder__content">
        {renderPanelByCategoryId(selectedCategoryId)}
      </section>
    </WindowWrapper>
  );
};

export default FinderWindow;
