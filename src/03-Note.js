import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";

class Note extends React.Component {
  static contextType = NotefulContext;

  onDeleteNote(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => callback(noteId))
      .catch(error => this.setState({ error }));
  }

  render() {
    const note = this.context.notes.find(note => note.id === this.props.match.params.id) || {}
    const folder = this.context.folders.find(folder => folder.id === note.folderId) || {}

    return (
      <div className="wrapper-note">
        <div className="main-sidebar">
          <div className="main-sidebar-foldername">
            {folder.name}
          </div>
          <div className="main-sidebar-button-div">
            <Link
              to={`/folder/${folder.id}`}
              className="go-back-button">
              Go Back
            </Link>
          </div>
        </div>
        <div className="main-page">
          <div className="main-page-list">
            <div
              key={note.id}
              className="note-item">
              <div className="note-title">
                {note.name}
              </div>
              <div className="note-date">
                {note.modified}
              </div>
              <button
                className="note-button"
                onClick={() => {
                  this.onDeleteNote(
                    note.id,
                    this.context.onDeleteNote,
                  )
                }}>
                Delete Note
              </button>
            </div>
            <div className="note-content">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Note;