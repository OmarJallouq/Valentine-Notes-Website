import React, {useRef} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';
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
                <Link to="/">Home</Link>
                <Link to="/send-a-message">Send a Message</Link>
                <Link to="/inbox">Inbox</Link>
                <Link to="/about">About</Link>
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