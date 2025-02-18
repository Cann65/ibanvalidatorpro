import * as React from "react";
import { useEffect } from "react";
import IbanChecker from "./components/IbanChecker";
import "./App.css";
import findDeadCode from "./utils/findDeadCode";

function App() {
  useEffect(() => {
    findDeadCode(); // Startet die Suche nach unbenutztem Code
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>IBAN Checker</h1>
        <p>Gib eine IBAN ein oder wähle ein Land im Dropdown:</p>
        <IbanChecker />
      </div>
    </div>
  );
}

export default App;
