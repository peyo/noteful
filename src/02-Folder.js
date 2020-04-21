import React from "react";
import { NavLink, Link } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";
import config from "./config";

class Folder extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null,
    notes: []
  };

  onDeleteNote(noteId, callback) {
    fetch(config.API_ENDPOINT + `/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(data => {
        callback(noteId)
        this.context.getNotes()
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div className="wrapper-folder">
        <div className="main-sidebar">
          <ul className="folderlist">
            {this.context.folders.map(folder =>
              <li
                key={folder.id}
                className="folder-li">
                <div className="folder-div">
                  <NavLink
                    to={`/folders/${folder.id}`}
                    className="folder-button"
                  >
                    {folder.name}
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
          <div className="main-sidebar-button-div">
            <Link
              to={"/addfolder"}
              className="add-folder-button" >
              Add Folder
            </Link>
          </div>
        </div>
        <div className="main-page">
          <ul className="main-page-list">
            {this.context.notes.map((note) =>
              note.folder_id === parseInt(this.props.match.params.folderId)
                ? <li
                  key={note.id}
                  className="note-item">
                  <Link
                    to={`/notes/${note.id}`}
                    className="note-title">
                    {note.name}
                  </Link>
                  <div className="note-date">
                    {note.modified}
                  </div>
                  <button
                    className="note-button"
                    onClick={() => {
                      this.onDeleteNote(note.id, this.context.onDeleteNote);
                    }}>
                    Delete Note
                  </button>
                </li>
                : null
            )}
          </ul>
          <Link
            to={"/addnote"}
            className="main-page-button">
            Add Note
            </Link>
        </div>
      </div>
    )
  }
}

export default Folder;