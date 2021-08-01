import React, { FC, useState, useEffect } from 'react';
import './App.css';
import { pick_random_letter_en } from './util';
import { Typo } from 'typo-js-ts';
import Lettergrid from './Lettergrid';
import WordSmith from './WordSmith';
import WordTreasure from './WordTreasure';
import Score from './Score';


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

  let score = treasureList.reduce((score, word) => score + word.length, 0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Wizard</h1>
      </header>
      <p>
        Conjure as many british english words as possible from this set of
        letters.
      </p>
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
