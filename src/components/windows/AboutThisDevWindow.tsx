import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import WindowWrapper from "../WindowWrapper";
import { Accordion, AccordionItem } from "../Accordion";
import { useTranslation } from "react-i18next";
import { getExperienceItems } from "../../data/experienceItems";

type AboutThisDevWindowProps = {
  onClose: () => void;
};

const AboutThisDevWindow = ({ onClose }: AboutThisDevWindowProps) => {
  const { t } = useTranslation();
  const experienceItems = getExperienceItems();

  return (
    <WindowWrapper
      windowId="about"
      onClose={onClose}
      disableMinimize
      disableMaximize
      disableResizing
    >
      <div className="w-aboutThisDev">
        <div className="w-aboutThisDev__header">
          <div className="w-aboutThisDev__header_logo" aria-hidden>
            <FontAwesomeIcon icon={faApple} />
          </div>
          <div className="w-aboutThisDev__header_aboutMe">
            <h2>Dario Hunjadi</h2>
            <p>{t("windows.aboutThisDev.role")}</p>
            <small>{t("windows.aboutThisDev.summary")}</small>
          </div>
        </div>

        <div className="w-aboutThisDev__meta">
          <span>{t("windows.aboutThisDev.location")}</span>
          <a
            href="https://github.com/dhunjadi"
            target="_blank"
            rel="noreferrer"
          >
            github.com/dhunjadi
          </a>
        </div>

        <Accordion className="w-aboutThisDev__accordion">
          <AccordionItem
            title={t("windows.aboutThisDev.experienceTitle")}
            contentClassName="w-aboutThisDev__accordion_content"
          >
            {experienceItems.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <h3>{item.title}</h3>
                <p>{item.company}</p>
                <small>{item.period}</small>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </AccordionItem>

          <AccordionItem
            title={t("windows.aboutThisDev.skillsTitle")}
            contentClassName="w-aboutThisDev__accordion_content"
          >
            <p>{t("windows.aboutThisDev.skillsList")}</p>
          </AccordionItem>

          <AccordionItem
            title={t("windows.aboutThisDev.educationTitle")}
            contentClassName="w-aboutThisDev__accordion_content"
          >
            <p>
              <strong>
                {t("windows.aboutThisDev.education.highSchoolTtitle")}
              </strong>
              <br />
              {t("windows.aboutThisDev.education.highSchoolDescription")}
            </p>
            <p>
              <strong>
                {t("windows.aboutThisDev.education.universityTitle")}
              </strong>
              <br />
              {t("windows.aboutThisDev.education.universityDescription")}
            </p>
            <p>{t("windows.aboutThisDev.languages")}</p>
          </AccordionItem>
        </Accordion>
      </div>
    </WindowWrapper>
  );
};

export default AboutThisDevWindow;
