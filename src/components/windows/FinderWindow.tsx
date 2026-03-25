/// <reference types="vite-plugin-svgr/client" />

import WindowWrapper from "../WindowWrapper";
import DesktopPanel from "../DesktopPanel";
import { useTranslation } from "react-i18next";
import DesktopIcon from "../../assets/icons/desktop.svg?react";

type FinderWindowProps = {
  onClose: () => void;
};

const FinderWindow = ({ onClose }: FinderWindowProps) => {
  const { t } = useTranslation();
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
            <li className="active">
              <DesktopIcon />
              <span>{t("windows.finder.desktop")}</span>
            </li>
          </ul>
        </aside>
      }
    >
      <section className="w-finder__content">
        <div className="w-finder__content_sectionHeader">
          <h2>Desktop</h2>
        </div>

        <div className="w-finder__content_area">
          <DesktopPanel />
        </div>
      </section>
    </WindowWrapper>
  );
};

export default FinderWindow;
