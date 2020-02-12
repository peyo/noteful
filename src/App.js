import React from "react";
import { Route, Link } from "react-router-dom";
import Main from "./01-Main";
import Folder from "./02-Folder";
import Note from "./03-Note";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <header>
            <h1>
              <Link to="/">Noteful</Link>
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
        </main>
      </div>
    );
  }
}

export default App;