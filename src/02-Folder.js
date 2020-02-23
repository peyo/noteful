import React from "react";
import { NavLink, Link } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";

class Folder extends React.Component {
  static contextType = NotefulContext;

  onDeleteNote(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
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
                    to={`/folder/${folder.id}`}
                    className="folder-button">
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
              note.folderId === this.props.match.params.folderId
                ? <li
                  key={note.id}
                  className="note-item">
                  <Link
                    to={`/note/${note.id}`}
                    className="note-title">
                    {note.name}
                  </Link>
                  <div className="note-date">
                    {note.modified}
                  </div>
                  <button
                    className="note-button"
                    onClick={() => this.onDeleteNote(note.id, this.context.onDeleteNote)}>
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