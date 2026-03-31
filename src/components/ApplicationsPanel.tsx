import Icon from "./DesktopIcon";
import LinkedInLogo from "/icons/linked-in-logo.png";

const ApplicationsPanel = () => {
  return (
    <section className="c-applicationsPanel">
      <Icon
        label="LinkedIn"
        imgSrc={LinkedInLogo}
        onOpen={() => {
          window.open(
            "https://www.linkedin.com/in/dario-hunjadi",
            "_blank",
            "noopener,noreferrer",
          );
        }}
        xPosition={24}
        yPosition={24}
      />
    </section>
  );
};

export default ApplicationsPanel;
