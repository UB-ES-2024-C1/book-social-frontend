import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';
import Profile from './pages/Profile';
import Drawer from "./components/Drawer";
import NavAppBar from './components/NavAppBar';
import {AuthProvider} from "./hooks/authentication";

function AppContent() {
    return (
        <div className="App">
            <div className="App-header">
                <NavAppBar/>
                <Drawer/>
                <div className="page-content">
                    <Routes>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/discovery" element={<DiscoveryPage/>}/>
                        <Route path="/saved" element={<SavedPage/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent/>
            </Router>
        </AuthProvider>
    );
}

export default App;
