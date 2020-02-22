import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = ({ signUserOut }) => {


    return (
        <div className='navbar'>
            <Link className='option' to='/entries'>Entries</Link>
            <Link className='option'
                to='/signin'
                onClick={signUserOut}
            >SIGN OUT</Link>

        </div>
    )
}

export default Navbar;