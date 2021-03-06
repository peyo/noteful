import React from "react";
import { Route, Link } from "react-router-dom";
import Main from "./01-Main";
import Folder from "./02-Folder";
import Note from "./03-Note";
import AddFolder from "./04-AddFolder";
import AddNote from "./05-AddNote";
import NotefulContext from "./00-NotefulContext";
import ErrorBoundary from "./06-ErrorBoundary";
import "./App.css";
import config from "./config";

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };

  onDeleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  onAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  onAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  getFolder = folder => {
    fetch(config.API_ENDPOINT + `/api/folders`, {
      method: "GET",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(folders => this.setState({ folders }))
      .catch(error => this.setState({ error }))
  }

  getNotes = () => {
    fetch(config.API_ENDPOINT + `/api/notes`, {
      method: "GET",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(notes => this.setState({ notes }))
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.getFolder()
    this.getNotes()
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes || [],
      onDeleteNote: this.onDeleteNote,
      onAddFolder: this.onAddFolder,
      onAddNote: this.onAddNote,
      getFolder: this.getFolder,
      getNotes: this.getNotes
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
              render={() => (
                <ErrorBoundary>
                  <Main />
                </ErrorBoundary>
              )}
            />
            <Route
              path={`/folders/:folderId`}
              render={(props) => (
                <ErrorBoundary>
                  <Folder {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              path={`/notes/:noteId`}
              render={(props) => (
                <ErrorBoundary>
                  <Note {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/addfolder"
              render={() => (
                <ErrorBoundary>
                  <AddFolder />
                </ErrorBoundary>
              )}
            />
            <Route
              path="/addnote"
              render={() => (
                <ErrorBoundary>
                  <AddNote />
                </ErrorBoundary>
              )}
            />
          </NotefulContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
