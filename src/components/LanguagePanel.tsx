import { useTranslation } from "react-i18next";

const LanguagePanel = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const activeLanguage = currentLanguage?.startsWith("hr") ? "hr" : "en";

  return (
    <section className="c-languagePanel">
      <div
        className="c-languagePanel__buttons"
        role="radiogroup"
        aria-label={t("windows.settings.categories.language.title")}
      >
        <button
          type="button"
          role="radio"
          aria-checked={activeLanguage === "en"}
          className={activeLanguage === "en" ? "active" : ""}
          onClick={() => i18n.changeLanguage("en")}
        >
          {t("windows.settings.categories.language.englishLabel")}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={activeLanguage === "hr"}
          className={activeLanguage === "hr" ? "active" : ""}
          onClick={() => i18n.changeLanguage("hr")}
        >
          {t("windows.settings.categories.language.croatianLabel")}
        </button>
      </div>
    </section>
  );
};

export default LanguagePanel;
