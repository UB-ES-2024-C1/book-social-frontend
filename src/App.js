import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Drawer from './components/Drawer';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SavedPage from './pages/SavedPage';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Drawer />
                </header>
                <Routes>
                    <Route path="/home" exact component={HomePage} />
                    <Route path="/discovery" component={DiscoveryPage} />
                    <Route path="/saved" component={SavedPage} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
