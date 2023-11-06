import React from "react";
import "./styles.css";
import FormLocal from "./Components/FormLocal";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyles />
      <h1>Aula de Local Storage</h1>
      <FormLocal />
    </div>
  );
}

export default App;
