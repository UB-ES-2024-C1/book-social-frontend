import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';
import Drawer from "./components/Drawer";
import LandingPage from "./pages/LandingPage";

function AppContent() {
    const location = useLocation();
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
            <div className="App-header">
                {location.pathname !== "/" && <Drawer />}
                <div className="page-content">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/discovery" element={<DiscoveryPage />} />
                        <Route path="/saved" element={<SavedPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
