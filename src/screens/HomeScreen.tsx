import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import AboutThisDevWindow from "../components/windows/AboutThisDevWindow";
import { useWindowStore } from "../stores/windowStore";
import CalculatorWindow from "../components/windows/CalculatorWindow";
import ShutDownModal from "../components/ShutDownModal";
import ShutDownOverlay from "../components/ShutDownOverlay";

const HomeScreen = () => {
  const isAboutWindowOpen = useWindowStore((s) =>
    s.openedWindowsIds.includes("about"),
  );
  const isCalculatorWindowOpen = useWindowStore((s) =>
    s.openedWindowsIds.includes("calculator"),
  );

  const isShutDownModalOpen = useWindowStore((s) =>
    s.openedWindowsIds.includes("shut-down"),
  );

  const closeWindow = useWindowStore((state) => state.closeWindow);

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
