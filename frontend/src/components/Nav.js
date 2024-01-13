import React, {useRef} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Link, NavLink} from 'react-router-dom';
import '../styles/main.css';

function Nav(){
    const navRef = useRef();
    const showNav = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return(
        <header>
            <h3>BAI VALENTINES</h3>
            <nav ref={navRef}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/send-a-message">Send a Message</NavLink>
                <NavLink to="/inbox">Inbox</NavLink>
                <NavLink to="/about">About</NavLink>
                <button className='nav-btn nav-close-btn' onClick={showNav}>
                    <FaTimes />
                </button>
            </nav>

            <button className='nav-btn' onClick={showNav}>
                <FaBars />
            </button>
        </header>
    );
}

export default Nav;