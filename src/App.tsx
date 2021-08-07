import React, { useState, useEffect } from 'react';
import './App.css';
import { Typo } from 'typo-js-ts';
import Lettergrid from './Lettergrid';
import WordSmith from './WordSmith';
import WordTreasure from './WordTreasure';
import Score from './Score';
import { allowedAddition, randomLetters } from './game-rules';

function App() {
  const [currWord, setCurrWord] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [treasureList, setTreasureList] = useState<string[]>([]);

  useEffect(() => {
    setLetters(randomLetters(20));
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
      <p className="App_description">
        Conjure as many british english words as possible from this set of
        letters. One and two letter words are worthless.
      </p>
      <div className="inputs">
        <Lettergrid
          onClick={(l) => {
            allowedAddition(letters, currWord, l) && setCurrWord(currWord + l);
          }}
          letters={letters}
          highlighted={currWord.split('')}
        />
        <WordSmith
          isValidAddition={allowedAddition}
          spellcheck={(word: string) => (dict && dict.check(word)) || false}
          currentWord={currWord}
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
      </div>
      <div className="outputs">
        <Score score={score} />
        <WordTreasure words={treasureList} />
      </div>
    </div>
  );
}

export default App;
