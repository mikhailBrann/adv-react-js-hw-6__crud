import React from "react";
import NoteList from './NoteList.tsx';
import NoteForm from './NoteForm.tsx';

class Notes extends React.Component {
    backendUrl: string;
    addedNoteCount: number;
 
    constructor(props: any) {
        super(props);

        this.state = {
            notes: [],
        };
        this.backendUrl = "http://localhost:6262";
        this.addedNoteCount = 0;
    }

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
            this.setState({
                addedNoteCount:  this.addedNoteCount -= 1
            });
        });
    }

    addNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const noteContent = event.currentTarget.noteText.value;

        if(!noteContent) {
            return;
        }

        fetch(`${this.backendUrl}/notes/`, {
            method: "POST",
            body: JSON.stringify({"content": noteContent}),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            this.setState({
                addedNoteCount: this.addedNoteCount += 1
            });
        });
    }

    getNotes = () => {
        fetch(`${this.backendUrl}/notes/`)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            this.setState({ notes: data });
        })
        .catch((e) => console.log(e));
    }

    //получаем список заметок при первой загрузке компонента
    componentDidMount() {
        this.getNotes();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState?.addedNoteCount !== this.state?.addedNoteCount) {
            this.getNotes();
        }
    }

    render() {
        return (
            <div className="notes">
                <div className="notes__title-wrap">
                    <h1>Notes</h1>
                    <button onClick={this.getNotes}>↺</button>
                </div>
                <NoteList notes={this.state.notes} callback={this.deleteNote} />
                <NoteForm fieldName="noteText" callback={this.addNote} />
            </div>
        );
    }
}

export default Notes;