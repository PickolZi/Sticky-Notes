import { useState, useEffect } from 'react';
import StickyNote from "../sticky-note/sticky-note.component";
import AddStickyNoteButton from "../add-sticky-note-button/add-sticky-note-button.component";

import { useContext } from 'react';
import { userContext } from '../../contexts/userContext.context';
import { stickyNotesContext } from '../../contexts/stickyNotesContext.context';

import { getStickyNotesFromUser } from '../../utils/firebase/firebase.utils';

import './sticky-notes-list.styles.css'


const StickyNotesList = () => {
    // Given the sticky notes object filled with the title, text, and date. Display the sticky notes.
    const [stickyNotes, setStickyNotes] = useState();
    const { userCredentialsContext } = useContext(userContext);
    const { stickyNotesJSON, setStickyNotesJSON } = useContext(stickyNotesContext);

    useEffect(() => {
      // When userCredentials change(user logs in or out) fetch the new sticky notes data from firestore.
      const fetchStickyNotesFromFirestore = async () => {
        try {
          const stickyNotesJSON = await getStickyNotesFromUser(userCredentialsContext);
          setStickyNotes(stickyNotesJSON);
        } catch (error) {
          console.log("Error grabbing sticky notes from firebase user.")
          console.log(error);
        }
      };
      fetchStickyNotesFromFirestore();
    }, [userCredentialsContext]);

    // Creates eventHandler for each input field to update the data.
    const inputEventHandler = (event) => {
        // When the user types into any text field. Update the stickyNotes list of objects.
        const {name, value} = event.target;  // key and value pair to update in stickyNotes
        const id = event.target.getAttribute("data-id");  // unique id so I know which object in stickyNotes to update.

        // Create and map through a new list of objects and replace the object with the target id.
        const newStickyNotes = stickyNotes.map((stickyNote) => {
            if (stickyNote.id == id) {
              return {...stickyNote, [name]: value, updated: true};
            }
            return stickyNote;
          });
          
          setStickyNotes(newStickyNotes);
          setStickyNotesJSON(newStickyNotes);  // also updates stickyNotes context object.
    }

    return (
        <div className="sticky-notes-list__container">
            {stickyNotes ? 
              stickyNotes.map((stickyNote) => {
                return(<StickyNote data={stickyNote} inputEventHandler={inputEventHandler} />);
              }) : 
              ""
            }
            <AddStickyNoteButton stickyNotes={stickyNotes} setStickyNotes={setStickyNotes}/>
        </div>
    );
};

export default StickyNotesList;