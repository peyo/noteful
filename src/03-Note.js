import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";
import config from "./config";

class Note extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null,
    notes: []
  };

  onDeleteNote(note, callback) {
    fetch(config.API_ENDPOINT + `/api/notes/${note.id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      }
    })
      .then(data => {
        callback(note.id)
        this.props.history.push(`/folders/${note.folder_id}`)
      })

      .catch(error => this.setState({ error }));
  }

  render() {
    const note = this.context.notes.find(note => note.id === parseInt(this.props.match.params.noteId)) || {}
    const folder = this.context.folders.find(folder => folder.id === note.folder_id) || {}


    return (
      <div className="wrapper-note">
        <div className="main-sidebar">
          <div className="main-sidebar-foldername">
            {folder.name}
          </div>
          <div className="main-sidebar-button-div">
            <Link
              to={`/folders/${folder.id}`}
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
                    note,
                    this.context.onDeleteNote,
                  );
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