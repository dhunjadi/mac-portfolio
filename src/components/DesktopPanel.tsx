import { useWindowActions } from "../stores/windowStore";
import Icon from "./Icon";
import resumePreviewIcon from "/resume-preview.jpg";

const DesktopPanel = () => {
  const { openWindow } = useWindowActions();

  return (
    <section className="c-desktopPanel">
      <Icon
        label="Resume.pdf"
        imgSrc={resumePreviewIcon}
        onOpen={() => openWindow("pdf")}
        xPosition={0}
        yPosition={0}
      />
    </section>
  );
};

export default DesktopPanel;
