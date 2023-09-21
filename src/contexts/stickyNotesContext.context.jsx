import { createContext, useState } from "react";

export const stickyNotesContext = createContext(
    {
        id: null,
        title: null,
        text: null,
        date: null,
        updated: null
    }
);

export const StickyNotesProvider = ({children}) => {
    const [stickyNotesJSON, setStickyNotesJSON] = useState();
    const value = {stickyNotesJSON, setStickyNotesJSON};

    return (
        <stickyNotesContext.Provider value={value}>{children}</stickyNotesContext.Provider>
    );
};