import "./App.css";
import characters from "./loadCharacters";
import { Select } from "semantic-ui-react";
import React from "react";

class App extends React.Component {
  render() {
    return <Select placeholder="Select character" options={characters} />;
  }
}

export default App;
