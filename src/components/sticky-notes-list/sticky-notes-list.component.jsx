import { useEffect, useContext } from 'react';

import { userContext } from '../../contexts/userContext.context';
import { stickyNotesContext } from '../../contexts/stickyNotesContext.context';

import StickyNote from "../sticky-note/sticky-note.component";
import AddStickyNoteButton from "../add-sticky-note-button/add-sticky-note-button.component";

import './sticky-notes-list.styles.css';


const StickyNotesList = () => {
  // Displays all the sticky nots on the user's home page.
  const { userCredentialsContext } = useContext(userContext);
  const { stickyNotesJSON, setStickyNotesJSON, updateLocalStickyNotes, isStickyNoteChange, setStickyNoteChange } = useContext(stickyNotesContext);

  useEffect(() => {
    updateLocalStickyNotes(userCredentialsContext);
  }, [userCredentialsContext]);

  const inputEventHandler = (event) => {
    // When the user types into any text field. Update the stickyNotes list of objects.
    const {name, value} = event.target;
    const id = event.target.getAttribute("data-id");  

    const newStickyNotes = stickyNotesJSON.map((stickyNote) => {
      // Create and map through a new list of objects and replace the object with the target id.
        if (stickyNote.id == id) {
          setStickyNoteChange(true);
          return {...stickyNote, [name]: value, updated: true};
        }
        return stickyNote;
      });
      
    setStickyNotesJSON(newStickyNotes);  // updates stickyNotes context.
  }

  return (
    <div className="sticky-notes-list__container">
        {stickyNotesJSON && stickyNotesJSON.map((stickyNote) => {
          return (<StickyNote key={stickyNote.id} data={stickyNote} inputEventHandler={inputEventHandler} />);
        })}
        
        <AddStickyNoteButton stickyNotes={stickyNotesJSON} setStickyNotes={setStickyNotesJSON}/>
    </div>
  );
};

export default StickyNotesList;