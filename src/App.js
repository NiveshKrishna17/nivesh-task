import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Home, Login } from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
