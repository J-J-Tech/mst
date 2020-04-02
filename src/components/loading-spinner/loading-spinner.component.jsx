import React from 'react';

import spinner from './loading_spinner.gif';
import './loading-spinner.styles.css';

const LoadingSpinner = () => {
    return (
        <div className='spinner-container'>
            <img src={spinner} alt="Loading..." className='spinner' />
        </div>
    )
}

export default LoadingSpinner;