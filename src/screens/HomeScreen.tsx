import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import AboutThisDevWindow from "../components/windows/AboutThisDevWindow";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import CalculatorWindow from "../components/windows/CalculatorWindow";
import ShutDownModal from "../components/ShutDownModal";
import ShutDownOverlay from "../components/ShutDownOverlay";
import SettingsWindow from "../components/windows/SettingsWindow";
import {
  useBlur,
  useGlassAlpha,
  useGlassColor,
  useWallpaper,
} from "../stores/settingsStore";
import { useEffect } from "react";

const hexToRgb = (hexColor: string) => {
  const matched = /^#([0-9a-fA-F]{6})$/.exec(hexColor);

  if (!matched) return "0 0 0";

  const color = matched[1];
  const red = parseInt(color.slice(0, 2), 16);
  const green = parseInt(color.slice(2, 4), 16);
  const blue = parseInt(color.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
};

const HomeScreen = () => {
  const isAboutWindowOpen = useOpenedWindow("about");
  const isCalculatorWindowOpen = useOpenedWindow("calculator");
  const isShutDownModalOpen = useOpenedWindow("shut-down");
  const isSettingsWindowOpen = useOpenedWindow("settings");
  const wallpaper = useWallpaper();
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const glassColor = useGlassColor();

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
    document.documentElement.style.setProperty(
      "--glass-rgb",
      hexToRgb(glassColor),
    );
  }, [blurIntensity, glassAlpha, glassColor]);

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
