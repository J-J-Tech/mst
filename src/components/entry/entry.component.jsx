import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './entry.styles.css';

const Entry = ({ entry }) => {
    const history = useHistory();

    const handleClick = e => {
        history.push(`/edit/${entry.id}`);
    }

    return (
        <React.Fragment key={entry.id}>
            <h1>{moment(entry.date).format("MMMM D, YYYY  h:mm a")}</h1>
            <div>
                <h4>Symptoms</h4>
                {
                    entry.symptoms.filter(symptom => symptom.isChecked)
                        .map((symptom => <li key={symptom.name}>{symptom.name}</li>))
                }
                <hr />
            </div>
            <div>
                <h4>Triggers</h4>
                {
                    entry.triggers.filter(trigger => trigger.isChecked)
                        .map(trigger => <li key={trigger.name}>{trigger.name}</li>)
                }
                <hr />
            </div>
            <div>
                <h4>Notes</h4>
                <p>{entry.notes}</p>
                <hr />
            </div>
            <button onClick={handleClick}>EDIT</button>
        </React.Fragment>
    )
}

export default Entry;