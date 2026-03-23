import i18n from "../i18n";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
};

export const getExperienceItems = (): ExperienceItem[] => {
  return i18n.t("windows.aboutThisDev.experienceItems", {
    returnObjects: true,
  }) as ExperienceItem[];
};
