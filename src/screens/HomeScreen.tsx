import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import AboutThisDevWindow from "../components/windows/AboutThisDevWindow";
import { useWindowStore } from "../stores/windowStore";

const HomeScreen = () => {
  const isAboutWindowOpen = useWindowStore((state) => state.isAboutWindowOpen);
  const closeWindow = useWindowStore((state) => state.closeWindow);

  return (
    <div className="s-home">
      <LoginOverlay />
      <MenuBar />
      <main>
        {isAboutWindowOpen && (
          <AboutThisDevWindow onClose={() => closeWindow("about")} />
        )}
      </main>
      <Dock />
    </div>
  );
};

export default HomeScreen;
