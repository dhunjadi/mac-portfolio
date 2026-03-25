import WindowWrapperWithSidebar from "../WindowWrapperWithSidebar";
import DesktopPanel from "../DesktopPanel";
import { useTranslation } from "react-i18next";

type FinderWindowProps = {
  onClose: () => void;
};

const FinderWindow = ({ onClose }: FinderWindowProps) => {
  const { t } = useTranslation();
  return (
    <WindowWrapperWithSidebar
      windowId="finder"
      onClose={onClose}
      className="w-finder"
      sidebar={
        <aside className="w-finder__sidebar">
          <p>{t("windows.finder.favorites")}</p>
          <ul>
            <li className="active">
              <span>🖥️</span>
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
    </WindowWrapperWithSidebar>
  );
};

export default FinderWindow;
