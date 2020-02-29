import React from 'react';
import './entry.styles.css';

const Entry = ({ entry }) => {

    return (
        <React.Fragment key={entry.id}>
            <h1>{entry.date}</h1>
            <div>
                <h4>Triggers</h4>
                <hr />
                {
                    entry.triggers.map(trigger => <li key={trigger}>{trigger}</li>)
                }

            </div>
            <div>
                <h4>Symptoms</h4>
                <hr />
                {
                    entry.symptoms.map(symptom => <li key={symptom}>{symptom}</li>)
                }
            </div>
            <div>
                <h4>Notes</h4>
                <hr />
                <p>{entry.notes}</p>
            </div>
            <button>EDIT</button>
        </React.Fragment>
    )
}

export default Entry;