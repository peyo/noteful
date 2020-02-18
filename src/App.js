import React from "react";
import { Route, Link } from "react-router-dom";
import Main from "./01-Main";
import Folder from "./02-Folder";
//import Note from "./03-Note";
import AddFolder from "./04-AddFolder";
import AddNote from "./05-AddNote";
import NotefulContext from "./00-NotefulContext";
import "./App.css";

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };

  onClickAddFolder() {}
  // = { this.addFolder }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/folders", {
        method: "GET",
        header: {
          "content-type": "application/json"
        }
      }),
      fetch("http://localhost:9090/notes", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
    ])
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(folders => this.setState({ folders }))
      .then(notes => this.setState({ notes }))
      .then(console.log(this.state.folders))
      .catch(error => this.setState({ error }));
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      onClickAddFolder: this.onClickAddFolder
    };
    return (
      <div className="App">
        <main>
          <header>
            <h1>
              <Link className="main" to="/">
                Noteful
              </Link>
            </h1>
          </header>
          <NotefulContext.Provider value={contextValue}>
            <Route
              exact
              path="/"
              //render={() =>
              //  <Main />
              //}
              component={Main}
            />
            <Route
              path={`/folder/:folderId`}
              //render={(routerProps) =>
              //  <Folder folderId={routerProps.match.params.folderId} />
              //}
              component={Folder}
            />
            {/*<Route
              path={`/note/:id`}
              //render={(routerProps) =>
              //  <Note id={routerProps.match.params.id} />
              //}
              component={Note}
            />*/}
            <Route
              path="/addfolder"
              //render={({ history }) =>
              //  <AddFolder
              //    onClickAddFolder={this.addFolder}
              //    onClickGoBack={() => history.goBack()}
              //    onClickCancel={() => history.goBack()} />
              //}
              component={AddFolder}
            />
            <Route
              path="/addnote"
              //render={({ history }) =>
              //  <AddNote
              //    onClickAddFolder={this.addNote}
              //    onClickGoBack={() => history.goBack()}
              //    onClickCancel={() => history.goBack()}
              //    folders={this.state.folders} />
              //}
              component={AddNote}
            />
          </NotefulContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
