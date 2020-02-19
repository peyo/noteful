import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  onDeleteNote: () => {},
})

export default NotefulContext;