import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";
import { useAppContext } from "../hooks/useAppContext";

const HomeScreen = () => {
  const { showMenuBarAndDock } = useAppContext();

  return (
    <div className="background">
      <LoginOverlay />
      <MenuBar isVisible={showMenuBarAndDock} />
      <Dock isVisible={showMenuBarAndDock} />
    </div>
  );
};

export default HomeScreen;
