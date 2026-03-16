import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import DesktopPdfIcon from "../components/DesktopPdfIcon";
import {
  useBlur,
  useGlassAlpha,
  useGlassColor,
  useWallpaper,
} from "../stores/settingsStore";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { useLogin } from "../stores/loginStore";
import { useShutDown } from "../stores/powerStore";

const LoginOverlay = lazy(() => import("../components/LoginOverlay"));

const ShutDownOverlay = lazy(() => import("../components/ShutDownOverlay"));

const AboutThisDevWindow = lazy(
  () => import("../components/windows/AboutThisDevWindow"),
);
const CalculatorWindow = lazy(
  () => import("../components/windows/CalculatorWindow"),
);
const SettingsWindow = lazy(
  () => import("../components/windows/SettingsWindow"),
);
const PdfWindow = lazy(() => import("../components/windows/PdfWindow"));
const WeatherWindow = lazy(() => import("../components/windows/WeatherWindow"));
const TextEditorWindow = lazy(
  () => import("../components/windows/TextEditorWindow"),
);

const ShutDownModal = lazy(() => import("../components/ShutDownModal"));

const RestartModal = lazy(() => import("../components/RestartModal"));

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
  const isRestartModalOpen = useOpenedWindow("restart");
  const isSettingsWindowOpen = useOpenedWindow("settings");
  const isPdfWindowOpen = useOpenedWindow("pdf");
  const isWeatherWindowOpen = useOpenedWindow("weather");
  const isTextEditorWindowOpen = useOpenedWindow("text-editor");
  const wallpaper = useWallpaper();
  const glassAlpha = useGlassAlpha();
  const blurIntensity = useBlur();
  const glassColor = useGlassColor();
  const isLoggedIn = useLogin();
  const isShutDown = useShutDown();
  const { closeWindow, openWindow } = useWindowActions();

  const menuBarRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLUListElement>(null);

  const [displayedWallpaper, setDisplayedWallpaper] = useState(wallpaper);

  const handleOpenPdf = useCallback(() => openWindow("pdf"), [openWindow]);
  const handleCloseAbout = useCallback(
    () => closeWindow("about"),
    [closeWindow],
  );
  const handleCloseCalculator = useCallback(
    () => closeWindow("calculator"),
    [closeWindow],
  );
  const handleCloseSettings = useCallback(
    () => closeWindow("settings"),
    [closeWindow],
  );
  const handleClosePdf = useCallback(() => closeWindow("pdf"), [closeWindow]);
  const handleCloseWeather = useCallback(
    () => closeWindow("weather"),
    [closeWindow],
  );
  const handleCloseTextEditor = useCallback(
    () => closeWindow("text-editor"),
    [closeWindow],
  );

  useEffect(() => {
    const update = () => {
      const menuBarHeight = menuBarRef.current?.offsetHeight ?? 0;
      const dockHeight = dockRef.current?.offsetHeight ?? 0;

      document.documentElement.style.setProperty(
        "--menubar-height",
        `${menuBarHeight}px`,
      );
      document.documentElement.style.setProperty(
        "--dock-height",
        `${dockHeight}px`,
      );
    };

    update();

    const observer = new ResizeObserver(update);
    if (menuBarRef.current) observer.observe(menuBarRef.current);
    if (dockRef.current) observer.observe(dockRef.current);

    return () => observer.disconnect();
  }, []);

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

      <MenuBar ref={menuBarRef} />
      <main>
        {isLoggedIn && !isShutDown && <DesktopPdfIcon onOpen={handleOpenPdf} />}

        {isAboutWindowOpen && <AboutThisDevWindow onClose={handleCloseAbout} />}

        {isCalculatorWindowOpen && (
          <CalculatorWindow onClose={handleCloseCalculator} />
        )}

        {isShutDownModalOpen && <ShutDownModal />}

        {isRestartModalOpen && <RestartModal />}

        {isSettingsWindowOpen && (
          <SettingsWindow onClose={handleCloseSettings} />
        )}

        {isPdfWindowOpen && <PdfWindow onClose={handleClosePdf} />}

        {isWeatherWindowOpen && <WeatherWindow onClose={handleCloseWeather} />}

        {isTextEditorWindowOpen && (
          <TextEditorWindow onClose={handleCloseTextEditor} />
        )}
      </main>
      <Dock ref={dockRef} />
    </div>
  );
};

export default HomeScreen;
