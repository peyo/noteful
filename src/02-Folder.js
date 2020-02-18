import React from "react";
import { NavLink, Link } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";

class Folder extends React.Component {
  static contextType = NotefulContext;

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
              className="main-sidebar-button" >
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
                    className="note-button">
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