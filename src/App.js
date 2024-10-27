// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';
import PermanentDrawer from "./components/Drawer";
import LandingPage from "./pages/LandingPage";

// Layout without Drawer (for LandingPage)
const MainLayout = () => (
    <div className="App">
        <Outlet />
    </div>
);

// Layout with Drawer (for Home, Discovery, Saved)
const DrawerLayout = () => (
    <div className="App">
        <div className="App-header">
            <PermanentDrawer isLogged={true} />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    </div>
);

function AppContent() {
    return (
        <Routes>
            {/* Routes without Drawer */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Routes with Drawer */}
            <Route element={<DrawerLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/saved" element={<SavedPage />} />
            </Route>
        </Routes>
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
