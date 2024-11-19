// src/App.js
import React from 'react';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';
import Profile from './pages/Profile';
import PermanentDrawer from "./components/Drawer";
import LandingPage from "./pages/LandingPage";
import NavAppBar from './components/NavAppBar';
import {AuthProvider} from "./hooks/authentication";
import Drawer from "@mui/material/Drawer";
import NewBook from './pages/NewBook';
import BookDetailsPage from './pages/BookDetailsPage';

// Layout without Drawer (for LandingPage)
const MainLayout = () => (
    <div className="App">
        <Outlet/>
    </div>
);

// Layout with Drawer (for Home, Discovery, Saved)
const DrawerLayout = () => (
    <div className="App">
        <NavAppBar/>
        <Drawer/>
        <div className="App-header">
            <PermanentDrawer isLogged={true}/>
            <div className="page-content">
                <Outlet/>
            </div>
        </div>
    </div>
);

function AppContent() {
    return (
        <Routes>
            {/* Routes without Drawer */}
            <Route element={<MainLayout/>}>
                <Route path="/" element={<LandingPage/>}/>
            </Route>

            {/* Routes with Drawer */}
            <Route element={<DrawerLayout/>}>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/discovery" element={<DiscoveryPage/>}/>
                <Route path="/saved" element={<SavedPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/new-book" element={<NewBook/>}/>
            </Route>
            <Route
                path="/book-details/:id"
                element={
                    // <ProtectedRoute>
                    <BookDetailsPage/>
                    // </ProtectedRoute>
                }
            />
        </Routes>
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
