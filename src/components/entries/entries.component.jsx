import React from 'react';
import './entries.styles.css';

const Entries = ({ entries }) => {
    console.log('entries comp', entries);
    return (
        <div>
            <h1>Entries</h1>
            <div className="entries-list">
                {
                    !entries || !entries.length ? (
                        <p>You currently have no entries</p>
                    ) : (
                            entries.map(entry => <p className="entry" key={entry.id}>{entry.date}</p>)
                        )
                }
            </div>
        </div>

    )
}


export default Entries;