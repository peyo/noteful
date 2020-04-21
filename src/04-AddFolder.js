import React from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "./00-NotefulContext";
import config from "./config";

class AddFolder extends React.Component {
  static contextType = NotefulContext;
  
  state = {
    error: null
  };

  onClickGoBack() {
    this.props.history.goBack()
  }

  onClickCancel() {
    this.props.history.goBack()
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name } = e.target
    const folder = {
      name: name.value,
      modified: new Date()
    };
    this.setState({ error: null });

    fetch(config.API_ENDPOINT + `/api/folders`, {
        method: "POST",
        body: JSON.stringify(folder),
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
      .then((folder) => {
        name.value = "";
        this.context.onAddFolder(folder);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  };

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