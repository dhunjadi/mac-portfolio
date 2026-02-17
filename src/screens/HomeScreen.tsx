import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import LoginOverlay from "../components/LoginOverlay";

const HomeScreen = () => {
  return (
    <div className="s-home">
      <LoginOverlay />
      <MenuBar />
      <Dock />
    </div>
  );
};

export default HomeScreen;
