import './sticky-note.styles.css'

const StickyNote = (props) => {
    // Fills and displays the stickynote with data.
    const {id, title, text, date} = props.data;
    const {inputEventHandler} = props;

    return (
        <div key={id} className="sticky-note-container">
            <input type="text" value={title} name="title" data-id={id} onChange={inputEventHandler} />
            <textarea className="sticky-note__text-area" rows="10" value={text} name="text" data-id={id} onChange={inputEventHandler}></textarea>
        </div>
    );
};

export default StickyNote;