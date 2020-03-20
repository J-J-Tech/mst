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
        const category = e.target.name ? e.target.name.split('_')[0] : undefined;
        const name = e.target.name ? e.target.name.split('_')[1] : undefined;
        let updatedSymptoms;
        let updatedTriggers;

        if (category && category === 'symptom') {
            updatedSymptoms = symptoms.map(symp =>
                symp.name === name ? { ...symp, isChecked: !symp.isChecked } : symp
            );
            console.log(updatedSymptoms)
            setSymptoms(updatedSymptoms);
        }
        if (category && category === 'trigger') {
            updatedTriggers = triggers.map(trig =>
                trig.name === name ? { ...trig, isChecked: !trig.isChecked } : trig
            );
            setTriggers(updatedTriggers);
        }
    }

    const handleChange = e => {
        setNotes(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("SUBMIT")
        console.log({
            symptoms: symptoms.filter(symp => symp.isChecked),
            triggers: triggers.filter(trig => trig.isChecked),
            notes,
            userId: user.id
        });
    }

    return (
        <React.Fragment>
            <form className='new-entry-form' onSubmit={handleSubmit}>
                <input type='datetime-local' />
                {/* Tabs */}
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#symptoms" role="tab" aria-controls="symptoms" aria-selected="true">Symptoms</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#triggers" role="tab" aria-controls="triggers" aria-selected="false">Triggers</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="symptoms" role="tabpanel" aria-labelledby="symptoms-tab">
                        <div>
                            {symptoms.map(symp => {
                                return <div
                                    key={symp.name}
                                    onClick={handleToggle}
                                >
                                    <input id={symp.name} name={'symptom_' + symp.name} type='checkbox' />
                                    <label htmlFor={symp.name}
                                        className={'symptom ' + (symp.isChecked && 'isSelected')}
                                    >{symp.name}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="triggers" role="tabpanel" aria-labelledby="triggers-tab">
                        <div>
                            {triggers.map(trig => {
                                return <div
                                    key={trig.name}
                                    onClick={handleToggle}
                                >
                                    <input id={trig.name} name={'trigger_' + trig.name} type='checkbox' />
                                    <label htmlFor={trig.name}
                                        className={'trigger ' + (trig.isChecked && 'isSelected')}
                                    >{trig.name}</label>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {/* End tabs */}
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