const NoteItem = ({...props}) =>  {
    const {id, content} = props.obj;
    const callback = props.callback;

    return (
        <div className="node__item" data-id={id}>
            <button onClick={callback} data-del-id={id}>x</button>
            <p>{content}</p>
        </div>
    );
};

export default NoteItem;