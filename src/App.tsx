import React, { FC, useState, useEffect } from 'react';
import './App.css';
import './Lettergrid.css';
import './WordSmith.css';
import './WordTreasure.css';
import { pick_random_letter_en } from './util';

const drop_item_mut: <T>(array: Array<T>, item: T) => Boolean = (
  array,
  item
) => {
  const i = array.indexOf(item);
  if (i >= 0) {
    array.splice(i, 1);
    return true;
  } else {
    return false;
  }
};

const Lettergrid: FC<{ letters: string[]; highlighted: string[] }> = ({
  letters,
  highlighted,
}) => {
  let letter_pool = [...highlighted];
  return (
    <div className="Lettergrid">
      {letters.map((l, i) => {
        let classname = 'Lettergrid-letter';
        if (drop_item_mut(letter_pool, l)) {
          classname += ' Lettergrid-letter-highlighted';
        }
        return (
          <span key={i} className={classname}>
            {l}
          </span>
        );
      })}
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
      onKeyDown={(e) => e.key === 'Enter' && onReturn(e.currentTarget.value)}
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
  const [currWord, setCurrWord] = useState('');
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
  // TODO only allow enterting letters which are not taken yet
  // TODO fancy styling
  // TODO  - grey out (highlight) types letters

  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Finder</h1>
      </header>
      <Lettergrid letters={letters} highlighted={['e']} />
      <WordSmith
        onChange={(s) => {
          console.log('onChange: ', s);
          setCurrWord(s);
        }}
        onReturn={(s) => console.log('onReturn: ', s)}
      />
      <WordTreasure words={['mine', 'all']} />
    </div>
  );
}

export default App;
