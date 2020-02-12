import React from "react";
import Store from "./Store";
import { Link } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main-sidebar">
          <div className="main-sidebar-folder">
            <ul className="folderlist">
              {Store.folders.map(folder =>
                <li
                  key={folder.id}
                  className="folder-li">
                  <div className="folder-div">
                    <Link
                      to={`/folder/${folder.id}`}
                      className="folder-button">
                      {folder.name}
                    </Link>
                  </div>
                </li>
              )}
            </ul>
            <div className="main-sidebar-button-div">
              <button className="main-sidebar-button">
                Add Folder
            </button>
            </div>
          </div>
        </div>
        <div className="main-page">
          <ul className="main-page-list">
            {Store.notes.map(note =>
              <li
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
              </li>
            )}
          </ul>
          <div className="main-page-button-div">
            <button className="main-page-button">
              Add Note
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;