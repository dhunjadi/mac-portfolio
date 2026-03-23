import WindowWrapper from "../WindowWrapper";
import DesktopPanel from "../DesktopPanel";
import { useTranslation } from "react-i18next";

type FinderWindowProps = {
  onClose: () => void;
};

const FinderWindow = ({ onClose }: FinderWindowProps) => {
  const { t } = useTranslation();
  return (
    <WindowWrapper windowId="finder" onClose={onClose}>
      <div className="w-finder">
        <div className="w-finder__body">
          <aside className="w-finder__body_sidebar">
            <p>{t('windows.finder.favorites')}</p>
            <ul>
              <li className="active">
                <span>🖥️</span>
                <span>{t('windows.finder.desktop')}</span>
              </li>
            </ul>
          </aside>

          <section className="w-finder__content">
            <div className="w-finder__content_sectionHeader">
              <h2>Desktop</h2>
            </div>

            <div className="w-finder__content_area">
              <DesktopPanel />
            </div>
          </section>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default FinderWindow;
