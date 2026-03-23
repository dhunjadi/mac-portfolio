import {
  useSettingsActions,
  useWallpaper,
  useWallpaperPreviews,
} from "../stores/settingsStore";
import { useTranslation } from "react-i18next";

const WallpaperPanel = () => {
  const { t } = useTranslation();
  const wallpaper = useWallpaper();
  const wallpaperPreviews = useWallpaperPreviews();
  const { setWallpaper } = useSettingsActions();

  return (
    <section className="c-wallpaperPanel">
      <h2 className="c-wallpaperPanel__title">
        {t("windows.settings.categories.wallpaper.title")}
      </h2>
      <p className="c-wallpaperPanel__subTitle">
        {t("windows.settings.categories.wallpaper.subtitle")}
      </p>

      <div className="c-wallpaperPanel__grid">
        {wallpaperPreviews.map((option) => {
          const fullSizeWallpaper = option.replace("/previews", "");
          return (
            <button
              key={option}
              className={fullSizeWallpaper === wallpaper ? "active" : ""}
              onClick={() => {
                setWallpaper(fullSizeWallpaper);
              }}
              style={{ backgroundImage: `url(${option})` }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default WallpaperPanel;
