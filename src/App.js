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
    console.log(folder)
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  onAddNote = note => {
    console.log(note)
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  componentDidMount() {
    fetch("http://localhost:9090/folders", {
      method: "GET",
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(folders => this.setState({ folders }))
    .catch(error => this.setState({ error }));

    fetch("http://localhost:9090/notes", {
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

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes || [],
      onDeleteNote: this.onDeleteNote,
      onAddFolder: this.onAddFolder,
      onAddNote: this.onAddNote
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
              path={`/folder/:folderId`}
              render={() => (
                <ErrorBoundary>
                  <Folder />
                </ErrorBoundary>
          )}
        />
            <Route
              path={`/note/:id`}
              render={() => (
                <ErrorBoundary>
                  <Note />
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
