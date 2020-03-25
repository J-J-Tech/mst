import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MstContext from '../../context/mst.context';
import { firestore } from '../../firebase/firebase.utils';

import 'react-datepicker/dist/react-datepicker.css';
import './entry-form.styles.css';

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
}

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DATE":
            return { ...state, date: action.value };

        case "UPDATE_SYMPTOMS":
            if (action.value === state.newSymptom) {
                return {
                    ...state,
                    symptoms: [...state.symptoms, { name: action.value, isChecked: true }],
                    newSymptom: ''
                }
            } else {
                const updatedSymptoms = state.symptoms.map(symp =>
                    symp.name === action.value ? { ...symp, isChecked: !symp.isChecked } : symp
                );
                return { ...state, symptoms: updatedSymptoms, newSymptom: '' };
            }

        case "UPDATE_TRIGGERS":
            if (action.value === state.newTrigger) {
                return {
                    ...state,
                    triggers: [...state.triggers, { name: action.value, isChecked: true }],
                    newTrigger: ''
                }
            } else {
                const updatedTriggers = state.triggers.map(trig =>
                    trig.name === action.value ? { ...trig, isChecked: !trig.isChecked } : trig
                );
                return { ...state, triggers: updatedTriggers, newTrigger: '' };
            }

        case "UPDATE_NEWSYMPTOM":
            return { ...state, newSymptom: action.value };

        case "UPDATE_NEWTRIGGER":
            return { ...state, newTrigger: action.value };

        case "UPDATE_NOTES":
            return { ...state, notes: action.value };

        default:
            return state;
    }
};

const NewEntryForm = () => {
    const { user, fetchEntries } = useContext(MstContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const handleToggle = e => {
        if (e.target.type === 'checkbox') {
            const category = e.target.name ? e.target.name.split('_')[0] : undefined;
            const name = e.target.name ? e.target.name.split('_')[1] : undefined;
            dispatch({ type: `UPDATE_${category.toUpperCase()}`, value: name });
        }
    }

    const handleDateChange = (date) => {
        dispatch({ type: 'UPDATE_DATE', value: date });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value });
    }

    const handleAddNew = e => {
        console.log(e)
        if (e.target.id === 'newSymptom' && state.newSymptom) {
            dispatch({ type: "UPDATE_SYMPTOMS", value: state.newSymptom });
        }
        if (e.target.id === 'newTrigger' && state.newTrigger) {
            dispatch({ type: "UPDATE_TRIGGERS", value: state.newTrigger });
        }
    }

    // Clear new-symptom / new-trigger input onBlur 
    const handleOnBlur = e => {
        dispatch({ type: "UPDATE_NEWSYMPTOM", value: '' });
        dispatch({ type: "UPDATE_NEWTRIGGER", value: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firestore.collection('entries')
                .add({
                    date: moment(state.date).format(),
                    symptoms: state.symptoms,
                    triggers: state.triggers,
                    notes: state.notes,
                    userId: user.id
                })
            fetchEntries();
            history.push('/entries');
        } catch (error) {
            alert("Unable to save entry");
        }
    }

    return (
        <React.Fragment>
            <form className='entry-form' onSubmit={handleSubmit}>
                <DatePicker
                    selected={state.date}
                    onChange={date => handleDateChange(date)}
                    timeInputLabel=""
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                />
                {/* Tabs */}
                <ul className="nav nav-tabs entry-form__tabs-container" id="myTab" role="tablist">
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
                            <div className='new-symptom-container'>
                                <input
                                    type='text'
                                    className='new-symptom'
                                    value={state.newSymptom}
                                    name='newSymptom'
                                    placeholder='Enter a new symptom'
                                    onChange={handleChange}
                                    onBlur={handleOnBlur}
                                    style={{
                                        paddingRight: state.newSymptom ? 30 + 'px' : 10 + 'px'
                                    }}
                                />
                                {
                                    state.newSymptom &&
                                    <span
                                        className='entry-form__add-new-btn'
                                    >
                                        <i
                                            className="fa fa-plus entry-form__plus"
                                            id='newSymptom'
                                            onMouseDown={handleAddNew} // onMouseDown to execute before onBlur
                                        ></i>
                                    </span>

                                }
                            </div>
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
                            <div className='new-trigger-container'>
                                <input
                                    type='text'
                                    className='new-trigger'
                                    value={state.newTrigger}
                                    name='newTrigger'
                                    placeholder='Enter a new trigger'
                                    onChange={handleChange}
                                    onBlur={handleOnBlur}
                                    style={{
                                        paddingRight: state.newTrigger ? 30 + 'px' : 10 + 'px'
                                    }}
                                />
                                {
                                    state.newTrigger &&
                                    <span
                                        className='entry-form__add-new-btn'
                                    >
                                        <i
                                            className="fa fa-plus entry-form__plus"
                                            id='newTrigger'
                                            onMouseDown={handleAddNew} // onMouseDown to execute before onBlur
                                        ></i>
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* End tabs */}
                <textarea
                    className='entry-form__textarea'
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