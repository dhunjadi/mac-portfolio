import finderIcon from "/icons/finder.png";
import calculatorIcon from "/icons/calculator.png";
import infoIcon from "/icons/info.svg";
import settingsIcon from "/icons/settings.svg";
import weatherIcon from "/icons/weather.png";
import textEditorIcon from "/icons/text-editor.png";
import type {
  AppleMenuActionId,
  AppleMenuDropdownItem,
  WindowId,
} from "../types";

type WindowMetadata = {
  id: WindowId;
  menuBarLabelKey?: string;
  dockLabelKey?: string;
  appleMenuLabelKey?: string;
  dockIcon?: string;
};

const WINDOW_INFO: Record<WindowId, WindowMetadata> = {
  finder: {
    id: "finder",
    menuBarLabelKey: "menuBar.windowLabels.finder",
    dockLabelKey: "dock.finder",
    dockIcon: finderIcon,
  },
  about: {
    id: "about",
    menuBarLabelKey: "menuBar.windowLabels.about",
    dockLabelKey: "dock.about",
    appleMenuLabelKey: "appleMenu.items.about",
    dockIcon: infoIcon,
  },
  calculator: {
    id: "calculator",
    menuBarLabelKey: "menuBar.windowLabels.calculator",
    dockLabelKey: "dock.calculator",
    appleMenuLabelKey: "appleMenu.items.calculator",
    dockIcon: calculatorIcon,
  },
  pdf: {
    id: "pdf",
    menuBarLabelKey: "menuBar.windowLabels.pdf",
  },
  restart: {
    id: "restart",
    appleMenuLabelKey: "appleMenu.items.restart",
  },
  "shut-down": {
    id: "shut-down",
    appleMenuLabelKey: "appleMenu.items.shutDown",
  },
  weather: {
    id: "weather",
    menuBarLabelKey: "menuBar.windowLabels.weather",
    dockLabelKey: "dock.weather",
    appleMenuLabelKey: "appleMenu.items.weather",
    dockIcon: weatherIcon,
  },
  settings: {
    id: "settings",
    menuBarLabelKey: "menuBar.windowLabels.settings",
    dockLabelKey: "dock.settings",
    appleMenuLabelKey: "appleMenu.items.settings",
    dockIcon: settingsIcon,
  },
  "text-editor": {
    id: "text-editor",
    menuBarLabelKey: "menuBar.windowLabels.textEditor",
    dockLabelKey: "dock.textEditor",
    appleMenuLabelKey: "appleMenu.items.textEditor",
    dockIcon: textEditorIcon,
  },
};

export type AppleMenuItem =
  | { type: "window"; id: WindowId }
  | { type: "action"; id: AppleMenuActionId }
  | { type: "divider"; id: string };

export const APPLE_MENU_ITEMS: AppleMenuItem[] = [
  { type: "window", id: "about" },
  { type: "divider", id: "divider-1" },
  { type: "window", id: "calculator" },
  { type: "window", id: "text-editor" },
  { type: "window", id: "weather" },
  { type: "window", id: "settings" },
  { type: "divider", id: "divider-2" },
  { type: "action", id: "sleep" },
  { type: "window", id: "restart" },
  { type: "window", id: "shut-down" },
];

const APPLE_MENU_ACTION_LABELS: Record<AppleMenuActionId, string> = {
  sleep: "appleMenu.items.sleep",
};

type Translate = (key: string) => string;

export const getMenuBarWindowLabels = (t: Translate) =>
  Object.values(WINDOW_INFO).reduce(
    (acc, windowMeta) => {
      if (windowMeta.menuBarLabelKey) {
        acc[windowMeta.id] = t(windowMeta.menuBarLabelKey);
      }
      return acc;
    },
    {} as Partial<Record<WindowId, string>>,
  );

export const getDockTooltipLabel = (id: WindowId, t: Translate) => {
  const labelKey = WINDOW_INFO[id].dockLabelKey;
  return labelKey ? t(labelKey) : t("dock.iconAlt");
};

export const getAppleMenuItemLabel = (item: AppleMenuItem, t: Translate) => {
  if (item.type === "divider") return "";
  if (item.type === "action") {
    return t(APPLE_MENU_ACTION_LABELS[item.id]);
  }
  const labelKey = WINDOW_INFO[item.id].appleMenuLabelKey;
  return labelKey ? t(labelKey) : t("appleMenu.ariaLabel");
};

export const isWindowId = (value: AppleMenuDropdownItem): value is WindowId =>
  value in WINDOW_INFO;

export const DEFAULT_DOCK_ICONS = (
  [
    "finder",
    "about",
    "calculator",
    "settings",
    "weather",
    "text-editor",
  ] as const
).map((id) => ({
  id,
  icon: WINDOW_INFO[id].dockIcon ?? "",
}));
