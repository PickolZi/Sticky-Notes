import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import StickyNote from "../sticky-note/sticky-note.component";

import { getStickyNotesByUserID } from "../../utils/firebase/firebase.utils";

import './other-user-sticky-notes.styles.css';



const OtherUserStickyNotesList = () => {
    const {userID} = useParams();
    const [otherUsersStickyNotes, setOtherUsersStickyNotes] = useState();

    useEffect(() => {
        const getOtherUsersStickyNotes = async (userID) => {
            setOtherUsersStickyNotes((await getStickyNotesByUserID(userID)).docs);
        }
        getOtherUsersStickyNotes(userID);
    }, [userID]);

    // useEffect(() => {
    //     console.log("Other user's sticky notes changed: ", otherUsersStickyNotes)
    // }, [otherUsersStickyNotes]);

    const permissions = {
        read: true,
        write: true,
        delete: false,
        edit: true
    }

    return (
        <div className="sticky-notes-list__container">
            {otherUsersStickyNotes && otherUsersStickyNotes.map((stickyNote) => {
                {return (<StickyNote key={stickyNote.data().id} data={stickyNote.data()} permissions={permissions}/>)}
            })}
        </div>
    )
};

export default OtherUserStickyNotesList;