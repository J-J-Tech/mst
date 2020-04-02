import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

import MstContext from '../../context/mst.context';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

import './entries.styles.css';

const Entries = () => {
    const { entries, isLoading } = useContext(MstContext);

    return (
        <div>
            {
                isLoading || entries === null ? <LoadingSpinner /> : (
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
                )
            }
        </div>

    )
}


export default Entries;