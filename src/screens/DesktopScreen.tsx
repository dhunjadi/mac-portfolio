import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import resumePreviewIcon from "/resume-preview.jpg";
import {
  useAccentColor,
  useHighlightColor,
  useDockPosition,
  useThemePreference,
  useWallpaper,
} from "../stores/settingsStore";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLogin } from "../stores/loginStore";
import { useShutDown } from "../stores/powerStore";
import Icon from "../components/DesktopIcon";
import {
  useSpotlightActions,
  useSpotlightOpen,
} from "../stores/spotlightStore";
import SpotlightSearch from "../components/SpotlightSearch";
import { useHotkey } from "@tanstack/react-hotkeys";
import Spinner from "../components/Spinner";

const LoginOverlay = lazy(() => import("../components/LoginOverlay"));

const ShutDownOverlay = lazy(() => import("../components/ShutDownOverlay"));
const LaunchpadOverlay = lazy(() => import("../components/LaunchpadOverlay"));

const AboutThisDevWindow = lazy(
  () => import("../components/windows/AboutThisDevWindow"),
);
const CalculatorWindow = lazy(
  () => import("../components/windows/CalculatorWindow"),
);
const SettingsWindow = lazy(
  () => import("../components/windows/settings/SettingsWindow"),
);
const FinderWindow = lazy(
  () => import("../components/windows/finder/FinderWindow"),
);
const PdfWindow = lazy(() => import("../components/windows/PdfWindow"));
const WeatherWindow = lazy(() => import("../components/windows/WeatherWindow"));
const TextEditorWindow = lazy(
  () => import("../components/windows/TextEditorWindow"),
);

const ShutDownModal = lazy(() => import("../components/ShutDownModal"));

const RestartModal = lazy(() => import("../components/RestartModal"));
const BrightnessOverlay = lazy(() => import("../components/BrightnessOverlay"));

const hexToRgb = (hexColor: string) => {
  const matched = /^#([0-9a-fA-F]{6})$/.exec(hexColor);
  if (!matched) return "0 0 0";
  const color = matched[1];
  const red = parseInt(color.slice(0, 2), 16);
  const green = parseInt(color.slice(2, 4), 16);
  const blue = parseInt(color.slice(4, 6), 16);
  return `${red} ${green} ${blue}`;
};

const clampChannel = (value: number) => Math.max(0, Math.min(255, value));

const mixHex = (baseHex: string, mixHexValue: string, amount: number) => {
  const matchBase = /^#([0-9a-fA-F]{6})$/.exec(baseHex);
  const matchMix = /^#([0-9a-fA-F]{6})$/.exec(mixHexValue);
  if (!matchBase || !matchMix) return baseHex;

  const base = matchBase[1];
  const mix = matchMix[1];
  const channels = [0, 2, 4].map((index) => {
    const baseValue = parseInt(base.slice(index, index + 2), 16);
    const mixValue = parseInt(mix.slice(index, index + 2), 16);
    const blended = Math.round(baseValue + (mixValue - baseValue) * amount);
    return clampChannel(blended).toString(16).padStart(2, "0");
  });

  return `#${channels.join("")}`.toUpperCase();
};

const DesktopScreen = () => {
  const isAboutWindowOpen = useOpenedWindow("about");
  const isCalculatorWindowOpen = useOpenedWindow("calculator");
  const isShutDownModalOpen = useOpenedWindow("shut-down");
  const isRestartModalOpen = useOpenedWindow("restart");
  const isSettingsWindowOpen = useOpenedWindow("settings");
  const isFinderWindowOpen = useOpenedWindow("finder");
  const isPdfWindowOpen = useOpenedWindow("pdf");
  const isWeatherWindowOpen = useOpenedWindow("weather");
  const isTextEditorWindowOpen = useOpenedWindow("text-editor");
  const wallpaper = useWallpaper();
  const accentColor = useAccentColor();
  const highlightColor = useHighlightColor();
  const themePreference = useThemePreference();
  const dockPosition = useDockPosition();
  const isLoggedIn = useLogin();
  const isShutDown = useShutDown();
  const isSpotlightOpen = useSpotlightOpen();
  const { closeWindow, openWindow } = useWindowActions();
  const { openSpotlight } = useSpotlightActions();

  const menuBarRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLUListElement>(null);

  const [displayedWallpaper, setDisplayedWallpaper] = useState(wallpaper);

  // macOS opens native Spotlight search with Mod+Space so I put Mod+B
  useHotkey("Mod+B", () => openSpotlight());

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
  const handleCloseFinder = useCallback(
    () => closeWindow("finder"),
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
      const dockWidth = dockRef.current?.offsetWidth ?? 0;

      document.documentElement.style.setProperty(
        "--menubar-height",
        `${menuBarHeight}px`,
      );
      document.documentElement.style.setProperty(
        "--dock-height",
        `${dockHeight}px`,
      );
      document.documentElement.style.setProperty(
        "--dock-width",
        `${dockWidth}px`,
      );
    };

    update();

    const observer = new ResizeObserver(update);
    if (menuBarRef.current) observer.observe(menuBarRef.current);
    if (dockRef.current) observer.observe(dockRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const accent500 = accentColor.toUpperCase();
    const accent500Hover = mixHex(accent500, "#FFFFFF", 0.08);
    const accent600 = mixHex(accent500, "#000000", 0.14);

    document.documentElement.style.setProperty("--accent-500", accent500);
    document.documentElement.style.setProperty(
      "--accent-500-hover",
      accent500Hover,
    );
    document.documentElement.style.setProperty("--accent-600", accent600);
    document.documentElement.style.setProperty(
      "--highlight-rgb",
      hexToRgb(highlightColor),
    );
  }, [accentColor, highlightColor]);

  useEffect(() => {
    document.documentElement.dataset.theme = themePreference;
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.dataset.dockPosition = dockPosition;
  }, [dockPosition]);

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
      className="s-desktop"
      style={{ backgroundImage: `url(${displayedWallpaper})` }}
    >
      <LoginOverlay />

      <ShutDownOverlay />
      <LaunchpadOverlay />
      {isSpotlightOpen && <SpotlightSearch />}
      <BrightnessOverlay />

      <MenuBar ref={menuBarRef} />
      <main>
        {isLoggedIn && !isShutDown && (
          <Icon
            label="Resume.pdf"
            imgSrc={resumePreviewIcon}
            onOpen={() => openWindow("pdf")}
            xPosition={24}
            yPosition={72}
          />
        )}
        <Suspense fallback={<Spinner />}>
          {isAboutWindowOpen && (
            <AboutThisDevWindow onClose={handleCloseAbout} />
          )}

          {isCalculatorWindowOpen && (
            <CalculatorWindow onClose={handleCloseCalculator} />
          )}

          {isShutDownModalOpen && <ShutDownModal />}

          {isRestartModalOpen && <RestartModal />}

          {isSettingsWindowOpen && (
            <SettingsWindow onClose={handleCloseSettings} />
          )}

          {isFinderWindowOpen && <FinderWindow onClose={handleCloseFinder} />}

          {isPdfWindowOpen && <PdfWindow onClose={handleClosePdf} />}

          {isWeatherWindowOpen && (
            <WeatherWindow onClose={handleCloseWeather} />
          )}

          {isTextEditorWindowOpen && (
            <TextEditorWindow onClose={handleCloseTextEditor} />
          )}
        </Suspense>
      </main>
      <Dock ref={dockRef} />
    </div>
  );
};

export default DesktopScreen;
