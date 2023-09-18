import { useState } from 'react';
import StickyNote from "../sticky-note/sticky-note.component";
import AddStickyNoteButton from "../add-sticky-note-button/add-sticky-note-button.component";

import './sticky-notes-list.styles.css'

const exampleStickyNotes = [
    {
      id: 1,
      title: "Welcome to my sticky notes!",
      text: "Hello and welcome to the beginning stages of my Sticky Notes web application! I hope this project takes off and is able to teach me many new things.",
      date: new Date()
    },
    {
      id: 2,
      title: "Second sticky note",
      text: "Here I want to add extra information so I can have multiple sticky notes when starting off.",
      date: new Date()
    },
    {
      id: 3,
      title: "My hobbies",
      text: "I used to play a lot of games including: Apex, Osu!, CSGO, payday2, and minecraft. However, after a while they all seemed to become boring and kind of pointless so now I am trying to do more productive things with my spare time.",
      date: new Date()
    },
  ];



const StickyNotesList = () => {
    // Given the sticky notes object filled with the title, text, and date. Display the sticky notes.
    const [stickyNotes, setStickyNotes] = useState(exampleStickyNotes);

    // Creates eventHandler for each input field to update the data.
    const inputEventHandler = (event) => {
        // When the user types into any text field. Update the stickyNotes list of objects.
        const {name, value} = event.target;  // key and value pair to update in stickyNotes
        const id = event.target.getAttribute("data-id");  // unique id so I know which object in stickyNotes to update.

        // Create and map through a new list of objects and replace the object with the target id.
        const newStickyNotes = stickyNotes.map((stickyNote) => {
            if (stickyNote.id == id) {
                return {...stickyNote, [name]: value}
            }

            return stickyNote
        });

        // Updates state of stickyNotes
        setStickyNotes(newStickyNotes);
    }

    return (
        <div className="sticky-notes-list__container">
            {stickyNotes.map((stickyNote) => {
                return(<StickyNote data={stickyNote} inputEventHandler={inputEventHandler} />);
            })};  
            <AddStickyNoteButton stickyNotes={stickyNotes} setStickyNotes={setStickyNotes}/>
        </div>
    );
};

export default StickyNotesList;