import React, { FC } from "react";
import "./App.css";
import "./Lettergrid.css";
import "./WordSmith.css";
import "./WordTreasure.css";
import { pick_random_letter_en } from "./util";

const Lettergrid: FC<{ letters: string[] }> = ({ letters }) => {
  return (
    <div className="Lettergrid">
      {letters.map((l) => (
        <span className="Lettergrid-letter">{l}</span>
      ))}
    </div>
  );
};

const WordSmith = () => <input tabIndex={100} className="WordSmith" />;

const WordTreasure: FC<{ words: string[] }> = ({ words }) => (
  <div className="WordTreasure">
    <ol>
      {words.map((w) => (
        <li>{w}</li>
      ))}
    </ol>
  </div>
);

function App() {
  const random_letters: string[] = [];
  for (let i = 0; i < 16; i++) {
    random_letters.push(pick_random_letter_en());
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Finder</h1>
      </header>
      <Lettergrid letters={random_letters} />
      <WordSmith />
      <WordTreasure words={["mine", "all"]} />
    </div>
  );
}

export default App;
