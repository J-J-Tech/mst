import React, { useContext, useReducer, useState, useEffect } from 'react';

import MstContext from '../../context/mst.context';

import './new-entry-form.styles.css';

const initialState = {
    date: new Date(),
    symptoms: [
        { name: 'aura', isChecked: false },
        { name: 'nausea', isChecked: false },
        { name: 'headache', isChecked: false },
        { name: 'numbness', isChecked: false }
    ],
    triggers: [
        { name: 'stress', isChecked: false },
        { name: 'lack of sleep', isChecked: false },
        { name: 'chocolate', isChecked: false },
        { name: 'stormy weather', isChecked: false }
    ],
    newSymptom: '',
    newTrigger: '',
    notes: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DATE":
            return { ...state, date: action.value };

        case "UPDATE_SYMPTOMS":
            console.log(action.type, action.value)
            const updatedSymptoms = state.symptoms.map(symp =>
                symp.name === action.value ? { ...symp, isChecked: !symp.isChecked } : symp
            );
            return { ...state, symptoms: updatedSymptoms };

        case "UPDATE_TRIGGERS":
            const updatedTriggers = state.triggers.map(trig =>
                trig.name === action.value ? { ...trig, isChecked: !trig.isChecked } : trig
            );
            return { ...state, triggers: updatedTriggers };

        case "UPDATE_NEWSYMPTOM":
            return { ...state, date: action.value };

        case "UPDATE_NEWTRIGGER":
            return { ...state, date: action.value };

        case "UPDATE_NOTES":
            return { ...state, notes: action.value };

        default:
            return state;
    }
};

const NewEntryForm = () => {
    const { user } = useContext(MstContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleToggle = e => {
        if (e.target.type === 'checkbox') {
            const category = e.target.name ? e.target.name.split('_')[0] : undefined;
            const name = e.target.name ? e.target.name.split('_')[1] : undefined;
            dispatch({ type: `UPDATE_${category.toUpperCase()}`, value: name })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("SUBMIT")
        console.log({
            ...state,
            symptoms: state.symptoms.filter(symp => symp.isChecked),
            triggers: state.triggers.filter(trig => trig.isChecked),
            userId: user.id
        });
    }

    return (
        <React.Fragment>
            <form className='new-entry-form' onSubmit={handleSubmit}>
                <input type='datetime-local' />
                {/* Tabs */}
                <ul className="nav nav-tabs tabs-container" id="myTab" role="tablist">
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
                            {state.symptoms.map(symp => {
                                return <div
                                    key={symp.name}
                                    onClick={handleToggle}
                                >
                                    <input id={symp.name} name={'symptoms_' + symp.name} type='checkbox' />
                                    <label htmlFor={symp.name}
                                        className={'symptom ' + (symp.isChecked ? 'isSelected' : '')}
                                    >{symp.name}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="triggers" role="tabpanel" aria-labelledby="triggers-tab">
                        <div>
                            {state.triggers.map(trig => {
                                return <div
                                    key={trig.name}
                                    onClick={handleToggle}
                                >
                                    <input id={trig.name} name={'triggers_' + trig.name} type='checkbox' />
                                    <label htmlFor={trig.name}
                                        className={'trigger ' + (trig.isChecked ? 'isSelected' : '')}
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
                    value={state.notes}
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