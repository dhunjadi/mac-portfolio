import { useWindowActions } from "../stores/windowStore";
import Icon from "./DesktopIcon";
import resumePreviewIcon from "/resume-preview.jpg";

const DesktopPanel = () => {
  const { openWindow } = useWindowActions();

  return (
    <section className="c-desktopPanel">
      <Icon
        label="Resume.pdf"
        imgSrc={resumePreviewIcon}
        onOpen={() => openWindow("pdf")}
        xPosition={24}
        yPosition={24}
      />
    </section>
  );
};

export default DesktopPanel;
