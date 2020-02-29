import React from 'react';
import moment from 'moment';
import './entry.styles.css';

const Entry = ({ entry }) => {

    return (
        <React.Fragment key={entry.id}>
            <h1>{moment(entry.date).format("MMMM D, YYYY")}</h1>
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