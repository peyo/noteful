import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  onDeleteNote: () => { },
  onAddFolder: () => { },
  onAddNote: () => { }
})

export default NotefulContext;