import React, { useState } from 'react';
import './Drawer.css';
import { AiOutlineHome, AiOutlinePlus, AiOutlineCompass, AiOutlineSave } from 'react-icons/ai';
import logo from '../logo.svg';
import {useNavigate} from "react-router-dom";


const Drawer = () => {
    const [selected, setSelected] = useState('Home');
    const navigate = useNavigate();

    const handleSelect = (item) => {
        setSelected(item);
        switch (item) {
            case 'Home':
                navigate('/home');
                break;
            case 'Discovery':
                navigate('/discovery');
                break;
            case 'Saved':
                navigate('/saved');
                break;
            default:
                break;
        }
    };

    return (
        <div className="drawer">
            <div className="logo" onClick={() => handleSelect('Home')}>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <div className="menu">
                <div
                    className={`add-item ${selected === 'Add' ? 'active' : ''}`}
                    onClick={() => handleSelect('Add')}
                >
                    <AiOutlinePlus size={25} className="icon"/>
                </div>
                <div
                    className={`menu-item ${selected === 'Home' ? 'active' : ''}`}
                    onClick={() => handleSelect('Home')}
                >
                    <AiOutlineHome size={25} className="icon"/>
                    <span>Home</span>
                </div>
                <div
                    className={`menu-item ${selected === 'Discovery' ? 'active' : ''}`}
                    onClick={() => handleSelect('Discovery')}
                >
                    <AiOutlineCompass size={25} className="icon"/>
                    <span>Discovery</span>
                </div>
                <div
                    className={`menu-item ${selected === 'Saved' ? 'active' : ''}`}
                    onClick={() => handleSelect('Saved')}
                >
                    <AiOutlineSave size={25} className="icon"/>
                    <span>Saved</span>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
