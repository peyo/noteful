import React from "react";
import { withRouter } from "react-router-dom";

class AddFolder extends React.Component {
  static defaultProps = {
    onClickAddFolder: () => {}
  }
  render() {
    const {
      onClickGoBack,
      onClickCancel
    } = this.props;

    return (
      <div className="wrapper-addfolder">
        <div className="main-sidebar">
          <div className="main-sidebar-go-back-button">
            <button
              onClick={onClickGoBack}
              className="main-sidebar-button">
              Go Back
            </button>
          </div>
        </div>
        <div className="main-page-addfolder">
          <div className="main-page-list-addfolder">
            <form
              className="addfolder-form"
              onSubmit={this.handleSubmit}>
              <div className="addfolder-foldername">
                <label
                  className="label"
                  htmlFor="foldername">
                  Name
                </label><br />
                <input
                  type="text"
                  name="foldername"
                  id="foldername"
                  required
                />
              </div>
              <div className="addfolder-buttons">
                <button
                  className="go-back-button"
                  type="submit">
                  Add Folder
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

export default withRouter(AddFolder);