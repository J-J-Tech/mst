import React, { useContext, useState, useEffect } from 'react';

import MstContext from '../../context/mst.context';

import './new-entry-form.styles.css';


const NewEntryForm = () => {
    const { user } = useContext(MstContext);
    const [symptoms, setSymptoms] = useState([
        { name: 'aura', isChecked: false },
        { name: 'nausea', isChecked: false },
        { name: 'headache', isChecked: false },
        { name: 'numbness', isChecked: false }
    ]);
    const [triggers, setTriggers] = useState([
        { name: 'stress', isChecked: false },
        { name: 'lack of sleep', isChecked: false },
        { name: 'chocolate', isChecked: false },
        { name: 'stormy weather', isChecked: false }
    ]);

    const [newSymptom, setNewSymptom] = useState('');
    const [newTrigger, setNewTrigger] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setNewSymptom('');
    }, [symptoms]);

    useEffect(() => {
        setNewTrigger('');
    }, [triggers]);

    const handleToggle = e => {
        if (e.target.type === 'checkbox') {
            console.log("CHECKBOX::", e.target.name, e.target.checked)
        }
    }

    const handleChange = e => {
        setNotes(e.target.value)
    }

    return (
        <React.Fragment>
            <form className='new-entry-form'>
                <input type='datetime-local' />
                <p>Symptoms</p>
                <div>
                    {symptoms.map(symp => {
                        return <div
                            key={symp.name}
                            onClick={handleToggle}
                        >
                            <input id={symp.name} name={symp.name} type='checkbox' />
                            <label htmlFor={symp.name}
                                className={'symptom ' + (symp.isChecked && 'isSelected')}
                            >{symp.name}</label>
                        </div>
                    })}
                </div>
                <p>Triggers</p>
                <div>
                    {triggers.map(trig => {
                        return <div
                            key={trig.name}
                            className={'trigger ' + (trig.isChecked && 'isSelected')}
                            onClick={handleToggle}
                        >
                            <input id={trig.name} name={trig.name} type='checkbox' />
                            <label htmlFor={trig.name}>{trig.name}</label>
                        </div>
                    })}
                </div>
                <textarea
                    className='new-entry-form__textarea'
                    name='notes'
                    value={notes}
                    placeholder='Enter notes here...'
                    onChange={handleChange}
                    rows='2'
                >

                </textarea>
                <input type='submit' value='SAVE ENTRY' />
            </form>

        </React.Fragment>
    )
};

export default NewEntryForm;