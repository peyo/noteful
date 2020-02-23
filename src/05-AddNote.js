import React from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";

class AddNote extends React.Component {
  static contextType = NotefulContext;
  onClickGoBack() {
    this.props.history.goBack()
  }

  onClickCancel() {
    this.props.history.goBack()
  }

  create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    return uuid
  }

  handleSubmit(e) {
    e.preventDefault()

    const note = {
      id: this.create_UUID(),
      name: e.target.name.value,
      modified: new Date(),
      folderId: e.target.folderId.value,
      content: e.target.content.value
    };

    const apiUrl = "http://localhost:9090/notes";
    const options = {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      }
    };

    fetch(apiUrl, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong. Try again later.');
        }
        return res.json();
      })
      .then((note) => {
        this.setState({
          name: "",
          folderId: "",
          content: ""
        });
        this.context.onAddNote(note);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    const {
      folders
    } = this.context;

    const folderOption = folders.map(folder => {
      return (
        <option
          value={folder.id}
          folderid={folder.folderId}
          key={folder.id}
        >
          {folder.name}
        </option>
      )
    })

    return (
      <div className="wrapper-addnote">
        <div className="main-sidebar">
          <div className="main-sidebar-go-back-button">
            <button
              onClick={() => this.onClickGoBack()}
              className="go-back-button">
              Go Back
            </button>
          </div>
        </div>
        <div className="main-page-addnote">
          <div className="main-page-list-addnote">
            <form
              className="addnote-form"
              onSubmit={e => this.handleSubmit(e)}>
              <div className="addnote-notename">
                <label
                  className="label"
                  htmlFor="notename">
                  Name
                </label><br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="addnote-notecontent">
                <label
                  className="label"
                  htmlFor="notecontent">
                  Content
                </label><br />
                <textarea
                  className="textarea"
                  name="content"
                  id="content"
                  required
                />
              </div>
              <div className="addnote-notefolder">
                <label
                  className="label"
                  htmlFor="notefolder">
                  Folder
                </label><br />
                <select
                  name="folderId"
                  id="folderId"
                  required
                >
                  {folderOption}
                </select>
              </div>
              <div className="addnote-buttons">
                <button
                  className="go-back-button"
                  type="submit">
                  Add Note
                </button>
                {" "}
                <button
                  className="go-back-button"
                  type="button"
                  onClick={() => this.onClickCancel()}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AddNote);