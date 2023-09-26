import { createContext, useState } from "react";

import { 
    getStickyNotesFromUser,
    deleteStickyNoteFromFirestore
} from "../utils/firebase/firebase.utils";

export const stickyNotesContext = createContext(
    {
        stickyNotesJSON: null,
        setStickyNotesJSON: () => {}
    }
);

export const StickyNotesProvider = ({children}) => {
    const [stickyNotesJSON, setStickyNotesJSON] = useState();
    const [isStickyNoteChange, setStickyNoteChange] = useState(false);

    const updateLocalStickyNotes = async (userCredentialsContext) => {
        // Updates local sticky notes from firestore.
        try {
            setStickyNotesJSON(await getStickyNotesFromUser(userCredentialsContext));
            
        } catch (error) {
            console.log("Error grabbing sticky notes from firebase user.")
            console.log(error);
        }
    }

    const removeStickyNoteFromLocalData = (stickyNoteID) => {
        // Gets rid of sticky note from user's screen, given the stickyNoteID
        setStickyNotesJSON(stickyNotesJSON.filter((stickyNote) => {
            return (stickyNote.id != stickyNoteID)
        }))
  
    }
    const value = {
        stickyNotesJSON, 
        setStickyNotesJSON, 
        updateLocalStickyNotes, 
        removeStickyNoteFromLocalData, 
        isStickyNoteChange, 
        setStickyNoteChange
    };

    return (
        <stickyNotesContext.Provider value={value}>{children}</stickyNotesContext.Provider>
    );
};