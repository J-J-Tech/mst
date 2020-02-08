import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ signUserOut }) => {


    return (
        <div className='navbar'>
            <Link
                to='/signin'
                onClick={signUserOut}
            >SIGN OUT</Link>
        </div>
    )
}

export default Navbar;