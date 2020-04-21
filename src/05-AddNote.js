import React from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";
import config from "./config";

class AddNote extends React.Component {
  static contextType = NotefulContext;

  state = {
    error: null
  }

  onClickGoBack() {
    this.props.history.goBack()
  }

  onClickCancel() {
    this.props.history.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()

    const { name, content, folderId } = e.target;
    const note = {
      name: name.value,
      folder_id: folderId.value,
      content: content.value
    };
    this.setState({ error: null });
    fetch(config.API_ENDPOINT + `/api/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong. Try again later.');
        }
        return res.json();
      })
      .then((note) => {
        name.value = "";
        folderId.value = "";
        content.value = "";
        this.context.onAddNote(note);
        this.props.history.goBack();
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