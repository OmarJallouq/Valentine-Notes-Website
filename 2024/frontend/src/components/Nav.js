import React, {useRef} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import {NavLink, Link} from 'react-router-dom';
import '../styles/nav.css';

function Nav(){
    const navRef = useRef();
    const showNav = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return(
        <header>
            <h3>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit', background: 'transparent'}}>BAI Valentines</Link>
            </h3>
            <nav ref={navRef}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/send-a-message">Send a Message</NavLink>
                <NavLink to="/inbox">Inbox</NavLink>
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