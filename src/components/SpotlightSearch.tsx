import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLaunchpadApps } from "../data/windowData";
import { useSpotlightActions } from "../stores/spotlightStore";
import { useWindowActions } from "../stores/windowStore";
import type { WindowId } from "../types";
import searchIcon from "/icons/search-icon.svg";

const SpotlightSearch = () => {
  const { t } = useTranslation();
  const { closeSpotlight } = useSpotlightActions();
  const { openWindow } = useWindowActions();
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const apps = useMemo(() => getLaunchpadApps(t), [t]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? apps.filter((app) => app.label.toLowerCase().includes(normalizedQuery))
    : [];

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSpotlight();
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest("[data-spotlight-trigger]")
      )
        return;
      closeSpotlight();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [closeSpotlight]);

  const handleAppClick = (id: WindowId) => {
    openWindow(id);
    closeSpotlight();
  };

  return (
    <div className="c-spotlight">
      <div className="c-spotlight__panel" ref={panelRef}>
        <div className="c-spotlight__panel_inputRow">
          <img src={searchIcon} alt="magnifier" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("spotlight.placeholder")}
            aria-label={t("spotlight.inputLabel")}
          />
        </div>

        {results.length > 0 && (
          <div className="c-spotlight__panel_results">
            {results.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleAppClick(app.id)}
              >
                <img src={app.icon} alt="app icon" />
                <span>{app.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotlightSearch;
