import React from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";

class AddFolder extends React.Component {
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
    e.preventDefault();

    const folder = {
      id: this.create_UUID(),
      name: e.target.name.value
    };

    const apiUrl = "http://localhost:9090/folders";
    const options = {
      method: "POST",
      body: JSON.stringify(folder),
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
      .then((folder) => {
        this.setState({
          id: "",
          name: ""
        });
        this.context.onAddFolder(folder);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    return (
      <div className="wrapper-addfolder">
        <div className="main-sidebar">
          <div className="main-sidebar-go-back-button">
            <button
              onClick={() => this.onClickGoBack()}
              className="go-back-button">
              Go Back
            </button>
          </div>
        </div>
        <div className="main-page-addfolder">
          <div className="main-page-list-addfolder">
            <form
              className="addfolder-form"
              onSubmit={e => this.handleSubmit(e)}>
              <div className="addfolder-foldername">
                <label
                  className="label"
                  htmlFor="foldername">
                  Name
                </label><br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div className="addfolder-buttons">
                <button
                  className="add-folder-button"
                  type="submit">
                  Add Folder
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

export default withRouter(AddFolder);