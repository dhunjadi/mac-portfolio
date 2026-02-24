import { BrowserRouter as Router, Routes, Route } from "react-router";
import TurnOnScreen from "./screens/TurnOnScreen";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./screens/ProtectedRoute";
import { appRoutes } from "./data/appRoutes";

function App() {
  return (
    <Router basename="/mac-portfolio">
      <Routes>
        <Route path={appRoutes.turnOn} element={<TurnOnScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path={appRoutes.home} element={<HomeScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
