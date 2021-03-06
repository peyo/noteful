import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  onDeleteNote: () => { },
  onAddFolder: () => { },
  onAddNote: () => { },
  getNotes: () => { }
})

export default NotefulContext;