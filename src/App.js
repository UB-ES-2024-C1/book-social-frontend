import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';
import Drawer from "./components/Drawer";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <Drawer/>
                    <div className="page-content">
                        <Routes>
                            <Route path="{myRoutes.home}" element={<HomePage/>}/>
                            <Route path="/discovery" element={<DiscoveryPage/>}/>
                            <Route path="/saved" element={<SavedPage/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
