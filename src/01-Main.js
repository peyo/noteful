import React from "react";
//import Store from "./Store";
import NotefulContext from "./00-NotefulContext";
import { Link } from "react-router-dom";

class Main extends React.Component {
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
      <div className="wrapper-main">
        <div className="main-sidebar">
          <ul className="folderlist">
            {this.context.folders.map(folder => (
              <li key={folder.id} className="folder-li">
                <div className="folder-div">
                  <Link to={`/folder/${folder.id}`} className="folder-button">
                    {folder.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="main-sidebar-button-div">
            <Link to={"/addfolder"} className="main-sidebar-button">
              Add Folder
            </Link>
          </div>
        </div>
        <div className="main-page">
          <ul className="main-page-list">
            {this.context.notes.map(note => (
              <li key={note.id} className="note-item">
                <div className="note-title">{note.name}</div>
                <div className="note-date">{note.modified}</div>
                <button
                  className="note-button"
                  onClick={() => {
                    this.onDeleteNote(note.id, this.context.onDeleteNote);
                  }}
                >
                  Delete Note
                </button>
              </li>
            ))}
          </ul>
          <div className="main-page-button-div">
            <Link to={"/addnote"} className="main-page-button">
              Add Note
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
