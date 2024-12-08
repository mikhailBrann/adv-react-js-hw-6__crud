import NoteItem from './NoteItem.tsx';

const NoteList = ({...props}) => {
    const notes = props.notes;
    const callback = props.callback;

    if (!notes) {
        return;
    }

    return (
        <div className="notes__list">
            {notes.map((note) => (
                <NoteItem key={note.id} obj={note} callback={callback} />
            ))}
        </div>
    );
}

export default NoteList;