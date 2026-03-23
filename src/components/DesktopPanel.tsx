import DesktopPdfIcon from "./DesktopPdfIcon";
import { useWindowActions } from "../stores/windowStore";

const DesktopPanel = () => {
  const { openWindow } = useWindowActions();

  return (
    <section className="c-desktopPanel">
      <DesktopPdfIcon onOpen={() => openWindow("pdf")} />
    </section>
  );
};

export default DesktopPanel;
