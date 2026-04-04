import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getLaunchpadApps } from "../data/windowData";
import {
  useLaunchpadActions,
  useLaunchpadOpen,
} from "../stores/launchpadStore";
import { useWindowActions } from "../stores/windowStore";
import type { WindowId } from "../types";
import { useKeyPress } from "../hooks/useKeyPress";

const LaunchpadOverlay = () => {
  const { t } = useTranslation();
  const isOpen = useLaunchpadOpen();
  const { closeLaunchpad } = useLaunchpadActions();
  const { openWindow } = useWindowActions();

  const apps = useMemo(() => getLaunchpadApps(t), [t]);

  const isEscPressed = useKeyPress("Escape");

  useEffect(() => {
    if (isEscPressed) closeLaunchpad();
  }, [closeLaunchpad, isEscPressed]);

  const handleAppClick = (id: WindowId) => {
    openWindow(id);
    closeLaunchpad();
  };

  return (
    <div className={`c-launchpad ${isOpen ? "" : "hidden"}`}>
      <div className="c-launchpad__top">
        <button
          className="c-launchpad__top_close"
          type="button"
          aria-label={t("launchpad.closeLabel")}
          onClick={closeLaunchpad}
        />
      </div>

      <div className="c-launchpad__grid">
        {apps.map((app) => (
          <button
            key={app.id}
            className="c-launchpad__grid_item"
            type="button"
            onClick={() => handleAppClick(app.id)}
          >
            <img src={app.icon} alt={app.label} />
            <span>{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LaunchpadOverlay;
