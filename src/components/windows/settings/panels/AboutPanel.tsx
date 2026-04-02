import { useTranslation } from "react-i18next";
import avatarPicture from "/avatar.jpg";

const AboutPanel = () => {
  const { t } = useTranslation();

  return (
    <section className="c-aboutPanel">
      <div className="c-aboutPanel__header">
        <div className="c-aboutPanel__header_avatar">
          <img src={avatarPicture} alt={t("login.userAvatarAlt")} />
        </div>
        <h2>{t("windows.settings.categories.about.nameValue")}</h2>
        <p>{t("windows.settings.categories.about.titleValue")}</p>
      </div>

      <div className="c-aboutPanel__group">
        <div className="c-aboutPanel__group_row">
          <span>{t("windows.settings.categories.about.nameLabel")}</span>
          <span>{t("windows.settings.categories.about.nameValue")}</span>
        </div>
        <div className="c-aboutPanel__group_row">
          <span>{t("windows.settings.categories.about.locationLabel")}</span>
          <span>{t("windows.settings.categories.about.locationValue")}</span>
        </div>
        <div className="c-aboutPanel__group_row">
          <span>{t("windows.settings.categories.about.titleLabel")}</span>
          <span>{t("windows.settings.categories.about.titleValue")}</span>
        </div>
        <div className="c-aboutPanel__group_row">
          <span>{t("windows.settings.categories.about.linkedinLabel")}</span>
          <a
            href="https://www.linkedin.com/in/dario-hunjadi"
            target="_blank"
            rel="noreferrer"
          >
            {t("windows.settings.categories.about.linkedinValue")}
          </a>
        </div>
        <div className="c-aboutPanel__group_row">
          <span>{t("windows.settings.categories.about.githubLabel")}</span>
          <a
            href="https://github.com/dhunjadi"
            target="_blank"
            rel="noreferrer"
          >
            {t("windows.settings.categories.about.githubValue")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPanel;
