const NoteForm = ({...props}) => {
    const callback = props.callback;
    const fieldName = props.fieldName;

    return (
        <form className="notes__form" onSubmit={callback}>
            <label htmlFor={fieldName}>New Note</label>
            <textarea id={fieldName} name={fieldName} placeholder="Enter note"></textarea>
            <button type="submit">→</button>
        </form>
    );
}

export default NoteForm;