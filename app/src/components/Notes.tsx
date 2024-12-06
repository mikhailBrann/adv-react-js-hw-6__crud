import React from "react";
import uniqid from "uniqueid";

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

const NoteForm = ({...props}) => {
    const callback = props.callback;
    const fieldName = props.fieldName;

    return (
        <form className="notes__form" onSubmit={callback}>
            <label htmlFor={fieldName}>New Note</label>
            <textarea id={fieldName} name={fieldName} placeholder="Enter note"></textarea>
            <button type="submit"></button>
        </form>
    );
}

class Notes extends React.Component {
    state = {
        notes: [],
    };

    backendUrl = "http://localhost:6262";

    deleteNote = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const noteId = Number(event.currentTarget.dataset.delId);

        fetch(`${this.backendUrl}/notes/${noteId}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        })
        .then(() => {
        
        });
    }

    addNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const noteContent = event.currentTarget.noteText.value;

        fetch(`${this.backendUrl}/notes/`, {
            method: "POST",
            body: JSON.stringify({
                "content": noteContent,
            }),
        }).then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const newNote = {
                id: 888,
                content: noteContent,
            };

            this.setState(prevState => ({
                notes: [...prevState.notes, newNote]
            }));
        });
    }

    getNotes = () => {
        fetch(`${this.backendUrl}/notes`)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }

            response.json();
        })
        .then((response) => {
            this.setState({ response });
        })
        .catch((e) => console.log(e));
    }


    //получаем список заметок при первой загрузке компонента
    componentDidMount() {
        this.getNotes();
    }

    componentDidUpdate(prevProps) {
        // Популярный пример (не забудьте сравнить пропсы):
        console.log(prevProps, this.state);
    }

    renderNoteList = () => {
        const { notes } = this.state;

        if (!notes) {
            return;
        }

        return notes.map((note) => (
            <NoteItem key={note.id} obj={note} callback={this.deleteNote} />
        ));
    }

    render() {
        return (
            <div className="notes">
            <div className="notes__list">
                {this.renderNoteList()}
            </div>
            <NoteForm fieldName="noteText" callback={this.addNote} />
            </div>
        );
    }
}

export default Notes;