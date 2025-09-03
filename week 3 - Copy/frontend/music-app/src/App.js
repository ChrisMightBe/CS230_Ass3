
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Artist from "./components/Artist";
import Songs from "./components/Songs";
import Albums from "./components/Albums";

function App() {
  return (
    <Router>
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/artists">Artists</Link></li>
                <li><Link to="/songs">Songs</Link></li>
                <li><Link to="/albums">Albums</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/artists" element={<Artist />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/" element={<h2>Music App</h2>} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
