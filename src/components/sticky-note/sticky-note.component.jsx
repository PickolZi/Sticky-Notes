import { useContext } from 'react';

import { userContext } from '../../contexts/userContext.context';
import { stickyNotesContext } from '../../contexts/stickyNotesContext.context';

import StickyNoteButton from '../sticky-note-button/sticky-note-button.component';

import { deleteStickyNoteFromFirestore } from '../../utils/firebase/firebase.utils';

import './sticky-note.styles.css';

const StickyNote = (props) => {
    // Fills and displays the stickynote with data.
    if (!props.data) return;
    const {id, title, text, date} = props.data;
    const {inputEventHandler} = props;

    const {userCredentialsContext} = useContext(userContext);
    const {removeStickyNoteFromLocalData} = useContext(stickyNotesContext);

    const deleteStickyNoteHandler = (event) => {
        // Deletes sticky note from firestore and local storage. Handler for delete button on sticky note.
        const stickyNoteID = event.target.getAttribute('data-id');

        deleteStickyNoteFromFirestore(userCredentialsContext, stickyNoteID);
        removeStickyNoteFromLocalData(stickyNoteID);
    };

    return (
        <div key={id} className="sticky-note-container">
            <div className="sticky-note__title-bar">
                <input className="sticky-note-title" type="text" value={title} name="title" data-id={id} onChange={inputEventHandler} />
                <StickyNoteButton delete_button="delete_button" text="x" handler={deleteStickyNoteHandler} data_id={id}/>
            </div>

            <textarea className="sticky-note__text-area" rows="10" value={text} name="text" data-id={id} onChange={inputEventHandler}></textarea>
        </div>
    );
};

export default StickyNote;