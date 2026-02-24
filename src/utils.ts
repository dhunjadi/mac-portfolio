import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  WINDOW_OFFSET_TOP,
} from "./data/constants";
import type { WindowRect } from "./types";

export const getDesktopRect = (): WindowRect => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0, width: MIN_WINDOW_WIDTH, height: MIN_WINDOW_HEIGHT };
  }

  const menuBar = document.querySelector<HTMLElement>(
    ".c-menuBar:not(.hidden)",
  );
  const dock = document.querySelector<HTMLElement>(".c-dock:not(.hidden)");

  const topInset = menuBar?.getBoundingClientRect().height ?? 0;
  const bottomInset = dock
    ? window.innerHeight - dock.getBoundingClientRect().top
    : 0;

  return {
    x: 0,
    y: topInset,
    width: window.innerWidth,
    height: Math.max(
      MIN_WINDOW_HEIGHT,
      window.innerHeight - topInset - bottomInset,
    ),
  };
};

export const getInitialRect = (): WindowRect => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0, width: MIN_WINDOW_WIDTH, height: MIN_WINDOW_HEIGHT };
  }

  const desktopRect = getDesktopRect();

  return {
    x: Math.max(0, (desktopRect.width - MIN_WINDOW_WIDTH) / 2),
    y: desktopRect.y + WINDOW_OFFSET_TOP,
    width: MIN_WINDOW_WIDTH,
    height: MIN_WINDOW_HEIGHT,
  };
};
