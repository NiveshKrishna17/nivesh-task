import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Home, Login } from "./Pages";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
      </Routes>
    </div>
  );
}

export default App;
