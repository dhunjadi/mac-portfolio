import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import AboutThisDevWindow from "../components/windows/AboutThisDevWindow";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import CalculatorWindow from "../components/windows/CalculatorWindow";
import ShutDownModal from "../components/ShutDownModal";
import ShutDownOverlay from "../components/ShutDownOverlay";
import SettingsWindow from "../components/windows/SettingsWindow";
import { useBlur, useGlassAlpha, useWallpaper } from "../stores/settingsStore";
import { useEffect } from "react";

const HomeScreen = () => {
  const isAboutWindowOpen = useOpenedWindow("about");
  const isCalculatorWindowOpen = useOpenedWindow("calculator");
  const isShutDownModalOpen = useOpenedWindow("shut-down");
  const isSettingsWindowOpen = useOpenedWindow("settings");
  const wallpaper = useWallpaper();
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();

  const { closeWindow } = useWindowActions();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--glass-alpha",
      glassAlpha.toString(),
    );
    document.documentElement.style.setProperty(
      "--blur-intensity",
      `${blurIntensity}px`,
    );
  }, [blurIntensity, glassAlpha]);

  return (
    <div className="s-home" style={{ backgroundImage: `url(${wallpaper})` }}>
      <LoginOverlay />
      <ShutDownOverlay />
      <MenuBar />
      <main>
        {isAboutWindowOpen && (
          <AboutThisDevWindow onClose={() => closeWindow("about")} />
        )}

        {isCalculatorWindowOpen && (
          <CalculatorWindow onClose={() => closeWindow("calculator")} />
        )}

        {isShutDownModalOpen && <ShutDownModal />}

        {isSettingsWindowOpen && (
          <SettingsWindow onClose={() => closeWindow("settings")} />
        )}
      </main>
      <Dock />
    </div>
  );
};

export default HomeScreen;
