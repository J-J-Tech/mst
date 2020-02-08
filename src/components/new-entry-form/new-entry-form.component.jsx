import React, { useState } from 'react';
import useToggle from "../../hooks/useToggle";
import "./new-entry-form.styles.css";





const NewEntryForm = () => {
    const [date, setDate] = useState(null);
    const [aura, toggleAura] = useToggle(false);
    const [nausea, toggleNausea] = useToggle(false);
    const [stormyWeather, toggleStormyWeather] = useToggle(false);
    const [stress, toggleStress] = useToggle(false);
    const [newTrigger, setNewTrigger] = useState("");
    const [notes, setNotes] = useState("");

    // const handleChange = e => {
    // const {name, value} = e.target;
    //     setNewEntry({
    //         ...newEntry,
    //         newEntry[e.target.name]: value
    //     })
    // }

    console.log("aura", aura);
    console.log("nausea", nausea);
    console.log("stormyWeather", stormyWeather);
    console.log("stress", stress);
    console.log("newTrigger", newTrigger);
    console.log("notes", notes);


    return (
        <div className='new-entry-form-container'>
            <form className='new-entry-form'>
                <h4>Enter Migraine Details</h4>
                <input type='checkbox' className='trigger'
                    onChange={toggleAura}
                />
                <input type='checkbox' className='trigger'
                    onChange={toggleNausea}
                />
                <input type='checkbox' className='trigger'
                    onChange={toggleStormyWeather}
                />
                <input type='checkbox' className='trigger'
                    onChange={toggleStress}
                />

                <input type='text' className='new-trigger' placeholder='Entry A New Trigger'
                    onChange={e => setNewTrigger(e.target.value)}
                />
                <textarea className='new-entry-textarea' placeholder='Additional Notes'
                    onChange={e => setNotes(e.target.value)}
                >
                </textarea>



            </form>

        </div>
    )
}

export default NewEntryForm;
