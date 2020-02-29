import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './entries.styles.css';
import MstContext from '../../context/mst.context';

const Entries = () => {
    const { entries } = useContext(MstContext)
    return (
        <div>
            <h1>Entries</h1>
            <div className="entries-list">
                {
                    !entries || !entries.length ? (
                        <p>You currently have no entries</p>
                    ) : (

                            entries.map(entry => (
                                <div key={entry.id}>
                                    <Link to={`entry/${entry.id}`} className="entry">{moment(entry.date).format("MMMM D, YYYY  h:mm a")}</Link>


                                </div>
                            )
                            )
                        )
                }
            </div>
        </div>

    )
}


export default Entries;