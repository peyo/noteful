import React from "react";
import { withRouter } from "react-router-dom";

class AddNote extends React.Component {
  static defaultProps = {
    onClickAddFolder: () => { }
  }
  render() {
    const {
      onClickGoBack,
      onClickCancel
    } = this.props;

    return (
      <div className="wrapper-addnote">
        <div className="main-sidebar">
          <div className="main-sidebar-go-back-button">
            <button
              onClick={onClickGoBack}
              className="main-sidebar-button">
              Go Back
            </button>
          </div>
        </div>
        <div className="main-page-addnote">
          <div className="main-page-list-addnote">
            <form
              className="addnote-form"
              onSubmit={this.handleSubmit}>
              <div className="addnote-notename">
                <label
                  className="label"
                  htmlFor="notename">
                  Name
                </label><br />
                <input
                  type="text"
                  name="notename"
                  id="notename"
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
                  name="notecontent"
                  id="notecontent"
                  required
                />
              </div>
              <div className="addnote-notefolder">
                <label
                  className="label"
                  htmlFor="notefolder">
                  Folder
                </label><br />
                <input
                  type="text"
                  name="notefolder"
                  id="notefolder"
                  required
                />
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
                  onClick={onClickCancel}>
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