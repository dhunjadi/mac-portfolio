import { BrowserRouter as Router, Routes, Route } from "react-router";
import TurnOnScreen from "./screens/TurnOnScreen";
import DesktopScreen from "./screens/DesktopScreen";
import ProtectedRoute from "./screens/ProtectedRoute";
import { appRoutes } from "./data/appRoutes";
import TurnOffScreen from "./screens/TurnOffScreen";

function App() {
  return (
    <Router
      basename={
        import.meta.env.MODE === "production" ? "/mac-portfolio/" : undefined
      }
    >
      <Routes>
        <Route path={appRoutes.turnOn} element={<TurnOnScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path={appRoutes.desktop} element={<DesktopScreen />} />
          <Route path={appRoutes.turnOff} element={<TurnOffScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
