import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import hr from "./i18n/hr.json";

const SUPPORTED_LANGUAGES = ["en", "hr"] as const;
const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "app-language";

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

const getStoredLanguage = (): SupportedLanguage | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupportedLanguage(stored)) {
      return stored;
    }
  } catch {
    return null;
  }
  return null;
};

const initialLanguage = getStoredLanguage() ?? DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hr: { translation: hr },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (lng) => {
    if (!isSupportedLanguage(lng)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      return;
    }
  });
}

export default i18n;
export { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES };
