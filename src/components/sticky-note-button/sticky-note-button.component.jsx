
import './sticky-note-button.styles.css'

const StickyNoteButton = ({delete_button, text, handler, data_id}) => {
    return (
        <button className={`btn sticky-note-button__${delete_button}`} onClick={handler} data-id={data_id}>
            {text}
        </button>
    )
}

export default StickyNoteButton;