import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = ({ signUserOut }) => {


    return (
        <div className='navbar'>
            <ul className="nav nav-pills links-container">
                <li className="nav-item"><Link className='option' to='/newentry'>New</Link></li>
                <li className="nav-item"><Link className='option' to='/entries'>Entries</Link></li>
                <li className="nav-item"><Link className='option' to='/signin' onClick={signUserOut}>SignOut</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;