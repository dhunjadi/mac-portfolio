import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import ShutDownModal from "../components/ShutDownModal";
import ShutDownOverlay from "../components/ShutDownOverlay";
import DesktopPdfIcon from "../components/DesktopPdfIcon";
import {
  useBlur,
  useGlassAlpha,
  useGlassColor,
  useWallpaper,
} from "../stores/settingsStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLogin } from "../stores/loginStore";
import { useShutDown } from "../stores/shutDownStore";

const AboutThisDevWindow = lazy(
  () => import("../components/windows/AboutThisDevWindow"),
);
const CalculatorWindow = lazy(
  () => import("../components/windows/CalculatorWindow"),
);
const SettingsWindow = lazy(() => import("../components/windows/SettingsWindow"));
const PdfWindow = lazy(() => import("../components/windows/PdfWindow"));

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
  const isPdfWindowOpen = useOpenedWindow("pdf");
  const wallpaper = useWallpaper();
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const glassColor = useGlassColor();
  const isLoggedIn = useLogin();
  const isShutDown = useShutDown();
  const { closeWindow, openWindow } = useWindowActions();

  const [displayedWallpaper, setDisplayedWallpaper] = useState(wallpaper);

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

  useEffect(() => {
    if (wallpaper === displayedWallpaper) return;

    let isCancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!isCancelled) setDisplayedWallpaper(wallpaper);
    };

    image.onerror = () => {
      if (!isCancelled) setDisplayedWallpaper(wallpaper);
    };

    image.src = wallpaper;

    return () => {
      isCancelled = true;
    };
  }, [wallpaper, displayedWallpaper]);

  return (
    <div
      className="s-home"
      style={{ backgroundImage: `url(${displayedWallpaper})` }}
    >
      <LoginOverlay />
      <ShutDownOverlay />
      <MenuBar />
      <main>
        {isLoggedIn && !isShutDown && (
          <DesktopPdfIcon onOpen={() => openWindow("pdf")} />
        )}

        {isAboutWindowOpen && (
          <Suspense fallback={null}>
            <AboutThisDevWindow onClose={() => closeWindow("about")} />
          </Suspense>
        )}

        {isCalculatorWindowOpen && (
          <Suspense fallback={null}>
            <CalculatorWindow onClose={() => closeWindow("calculator")} />
          </Suspense>
        )}

        {isShutDownModalOpen && <ShutDownModal />}

        {isSettingsWindowOpen && (
          <Suspense fallback={null}>
            <SettingsWindow onClose={() => closeWindow("settings")} />
          </Suspense>
        )}

        {isPdfWindowOpen && (
          <Suspense fallback={null}>
            <PdfWindow onClose={() => closeWindow("pdf")} />
          </Suspense>
        )}
      </main>
      <Dock />
    </div>
  );
};

export default HomeScreen;
