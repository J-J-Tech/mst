import React from 'react';
import './entry.styles.css';

const Entry = ({ entry }) => {

    return (
        <React.Fragment key={entry.id}>
            <p>{entry.date}</p>
            <p>{entry.notes}</p>
        </React.Fragment>
    )
}

export default Entry;