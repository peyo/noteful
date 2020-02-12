import React from "react";
import { Link } from "react-router-dom";
import Store from "./Store";

class Note extends React.Component {
  render() {
    console.log(this.props.noteId)
    const note = Store.notes.find(note => note.id === this.props.noteId)
    const folder = Store.folders.find(folder => folder.id === note.folderId)

    return (
      <div className="note">
        <div className="main-sidebar">
          <div className="main-sidebar-foldername">
            {folder.name}
          </div>
          <div className="main-sidebar-button-div">
            <Link
              to={`/folder/${folder.id}`}
              className="main-sidebar-button">
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
                className="note-button">
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