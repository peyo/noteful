import React from "react";
import NotefulContext from "./00-NotefulContext";
import { Link } from "react-router-dom";
import config from "./config";

class Main extends React.Component {
  static contextType = NotefulContext;
  state = {
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
      <div className="wrapper-main">
        <div className="main-sidebar">
          <ul className="folderlist">
            {this.context.folders.map(folder => (
              <li key={folder.id} className="folder-li">
                <div className="folder-div">
                  <Link
                    to={`/folders/${folder.id}`}
                    className="folder-button"
                  >
                    {folder.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="main-sidebar-button-div">
            <Link to={"/addfolder"} className="add-folder-button">
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
