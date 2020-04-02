import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import MstContext from '../../context/mst.context';

import './navbar.styles.css';

const Navbar = () => {
    const { user, signUserOut } = useContext(MstContext);

    return (
        <div className='navbar'>
            {
                user &&
                <ul className="nav nav-pills links-container">
                    <li className="nav-item"><Link className='option' to='/new'>New</Link></li>
                    <li className="nav-item"><Link className='option' to='/entries'>Entries</Link></li>
                    <li className="nav-item"><Link className='option' to='/signin' onClick={signUserOut}>SignOut</Link></li>
                </ul>
            }
        </div>
    )
}

export default Navbar;