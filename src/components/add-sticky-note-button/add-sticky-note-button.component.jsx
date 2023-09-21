import './add-sticky-note-button.styles.css';

const AddStickyNoteButton = (props) => {
    // When clicked, will create a new sticky note.
    const {stickyNotes, setStickyNotes} = props;
    
    const handleNewStickyNote = () => {
        // Generates new sticky note when clicked.
        const highestIdAvailableArray = stickyNotes.map((stickyNote) => { return stickyNote.id});
        const highestIdAvailable = Math.max(...highestIdAvailableArray);
        const newStickyNote = {
            id: highestIdAvailable+1,
            title: "",
            text: "",
            date: new Date(),
            updated: true
        };
        setStickyNotes([...stickyNotes, newStickyNote]);
    };

    return (
        <button className="add-sticky-note-button" onClick={handleNewStickyNote}>+</button>
    );
};

export default AddStickyNoteButton;