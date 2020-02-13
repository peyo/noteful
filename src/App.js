import React from "react";
import { Route, Link } from "react-router-dom";
import Main from "./01-Main";
import Folder from "./02-Folder";
import Note from "./03-Note";
import AddFolder from "./04-AddFolder";
import AddNote from "./05-AddNote";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <header>
            <h1>
              <Link
                className="main"
                to="/">Noteful</Link>
            </h1>
          </header>
          <Route
            exact path="/"
            render={() => 
              <Main />
            }
          />
          <Route
            path={`/folder/:folderId`}
            render={(routerProps) =>
              <Folder folderId={routerProps.match.params.folderId} />
            }
          />
          <Route
            path={`/note/:id`}
            render={(routerProps) =>
              <Note id={routerProps.match.params.id} />
            }
          />
          <Route
            path="/addfolder"
            render={({ history }) =>
              <AddFolder
                onClickAddFolder={this.addFolder}
                onClickGoBack={() => history.goBack()}
                onClickCancel={() => history.goBack()} />
            }
          />
          <Route
            path="/addnote"
            render={({ history }) =>
              <AddNote
                onClickAddFolder={this.addNote}
                onClickGoBack={() => history.goBack()}
                onClickCancel={() => history.goBack()} />
            }
          />
        </main>
      </div>
    );
  }
}

export default App;