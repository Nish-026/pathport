import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Info from "./components/Info";
import Itinerary from "./components/Itinerary";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
