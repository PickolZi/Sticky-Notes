import './add-sticky-note-button.styles.css';

const AddStickyNoteButton = (props) => {
    // When clicked, will create a new sticky note.
    const {stickyNotes, setStickyNotes} = props;
    
    const handleNewStickyNote = () => {
        // Generates new sticky note when clicked.
        const highestIdAvailable = stickyNotes[stickyNotes.length-1].id;
        const newStickyNote = {
            id: highestIdAvailable+1,
            title: "",
            text: "",
            date: new Date()
        };
        setStickyNotes([...stickyNotes, newStickyNote]);
    };

    return (
        <button className="add-sticky-note-button" onClick={handleNewStickyNote}>+</button>
    );
};

export default AddStickyNoteButton;