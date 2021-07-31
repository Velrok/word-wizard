import React, { FC, useState, useEffect } from 'react';
import './App.css';
import './Lettergrid.css';
import './WordSmith.css';
import './WordTreasure.css';
import { pick_random_letter_en } from './util';
import { Typo } from 'typo-js-ts';

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
  letters: string[];
  onChange: (arg0: string) => void;
  onReturn: (arg0: string) => Boolean;
}> = ({ onChange, onReturn, letters }) => (
  <div className="WordSmith">
    <input
      placeholder="type here"
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (onReturn(e.currentTarget.value)) {
            e.currentTarget.value = '';
          }
          return true;
        } else if (e.key >= 'a' && e.key <= 'z') {
          // Note: this is ugly, because it mutes the taken field as a side
          // effect
          let taken = e.currentTarget.value.split('');
          let available = letters.filter((l) => !drop_item_mut(taken, l));

          if (available.includes(e.key)) {
            return true;
          } else {
            e.preventDefault();
            return false;
          }
        }
      }}
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

const Score: FC<{ score: number }> = ({ score }) => (
  <div className="Score">Score: {score}</div>
);

function App() {
  const [currWord, setCurrWord] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [treasureList, setTreasureList] = useState<string[]>([]);

  useEffect(() => {
    const random_letters: string[] = [];

    console.log('loading random letters');
    for (let i = 0; i < 16; i++) {
      random_letters.push(pick_random_letter_en());
    }
    setLetters(random_letters);
  }, []);

  const [dict, setDict] = useState<Typo>();
  useEffect(() => {
    console.log('loading spellchecker');
    new Typo('en_GB', undefined, undefined, {
      flags: {},
      dictionaryPath: process.env.PUBLIC_URL + '/dictionaries',
    }).ready
      .then((d) => {
        console.log('dictionary loaded');
        setDict(d);
      })
      .catch(console.log);
  }, []);

  // TODO spellcheck entered word to see if it exists
  // TODO score each valid word
  // TODO display word scores and totals
  // TODO only allow enterting letters which are not taken yet
  // TODO fancy styling
  // TODO  - grey out (highlight) types letters

  let score = treasureList.reduce((score, word) => score + word.length, 0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Finder</h1>
      </header>
      <Lettergrid letters={letters} highlighted={currWord.split('')} />
      <WordSmith
        letters={letters}
        onChange={(s) => {
          setCurrWord(s);
        }}
        onReturn={(s) => {
          let spellchecked = dict && dict.check(s);
          if (spellchecked) {
            let uniq = new Set([...treasureList, s]);
            setTreasureList(Array.from(uniq).sort());
            setCurrWord('');
            return true;
          } else {
            return false;
          }
        }}
      />
      <Score score={score} />
      <WordTreasure words={treasureList} />
    </div>
  );
}

export default App;
