import React, { FC, useState, useEffect } from "react";
import "./App.css";
import "./Lettergrid.css";
import "./WordSmith.css";
import "./WordTreasure.css";
import { pick_random_letter_en } from "./util";

const Lettergrid: FC<{ letters: string[] }> = ({ letters }) => {
  return (
    <div className="Lettergrid">
      {letters.map((l, i) => (
        <span key={i} className="Lettergrid-letter">
          {l}
        </span>
      ))}
    </div>
  );
};

// TODO restrict or highlight letters that are not in the random_letters list
const WordSmith: FC<{
  onChange: (arg0: string) => void;
  onReturn: (arg0: string) => void;
}> = ({ onChange, onReturn }) => (
  <div className="WordSmith">
    <input
      placeholder="type here"
      onChange={(e) => {
        // console.log(e.target.value);
        onChange(e.target.value);
      }}
      onKeyDown={(e) => e.key === "Enter" && onReturn(e.currentTarget.value)}
      tabIndex={100}
    />
    <button>⏎</button>
  </div>
);

const WordTreasure: FC<{ words: string[] }> = ({ words }) => (
  <div className="WordTreasure">
    <ol>
      {words.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ol>
  </div>
);

function App() {
  const [currWord, setCurrWord] = useState("");
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    const random_letters: string[] = [];

    for (let i = 0; i < 16; i++) {
      random_letters.push(pick_random_letter_en());
    }
    setLetters(random_letters);
  }, []);

  // TODO spellcheck entered word to see if it exists
  // TODO score each valid word
  // TODO display word scores and totals

  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Finder</h1>
      </header>
      <Lettergrid letters={letters} />
      <WordSmith
        onChange={(s) => setCurrWord(s)}
        onReturn={(s) => console.log(s)}
      />
      <WordTreasure words={["mine", "all"]} />
    </div>
  );
}

export default App;
