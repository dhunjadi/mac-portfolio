import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import AboutThisDevWindow from "../components/windows/AboutThisDevWindow";
import { useOpenedWindow, useWindowActions } from "../stores/windowStore";
import CalculatorWindow from "../components/windows/CalculatorWindow";
import ShutDownModal from "../components/ShutDownModal";
import ShutDownOverlay from "../components/ShutDownOverlay";

const HomeScreen = () => {
  const isAboutWindowOpen = useOpenedWindow("about");
  const isCalculatorWindowOpen = useOpenedWindow("calculator");
  const isShutDownModalOpen = useOpenedWindow("shut-down");

  const { closeWindow } = useWindowActions();

  return (
    <div className="s-home">
      <LoginOverlay />
      <ShutDownOverlay />
      <MenuBar />
      <main>
        {isAboutWindowOpen && (
          <AboutThisDevWindow onClose={() => closeWindow("about")} />
        )}

        {isCalculatorWindowOpen && (
          <CalculatorWindow onClose={() => closeWindow("calculator")} />
        )}

        {isShutDownModalOpen && <ShutDownModal />}
      </main>
      <Dock />
    </div>
  );
};

export default HomeScreen;
