import {
  useWallpaper,
  useWallpaperPreviews,
  useSettingsActions,
} from "../../../../stores/settingsStore";

const WallpaperPanel = () => {
  const wallpaper = useWallpaper();
  const wallpaperPreviews = useWallpaperPreviews();
  const { setWallpaper } = useSettingsActions();

  return (
    <section className="c-wallpaperPanel">
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
