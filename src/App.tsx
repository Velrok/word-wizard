import React, { useState, useEffect } from 'react';
import './App.css';
import { Typo } from 'typo-js-ts';
import Lettergrid from './Lettergrid';
import WordSmith from './WordSmith';
import WordTreasure from './WordTreasure';
import Score from './Score';
import { wordScore, allowedAddition, randomLetters } from './game-rules';
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
  Link,
} from 'react-router-dom';
import qs from 'query-string';
import msgpack from 'msgpack-lite';
import { Base64 } from 'js-base64';

type AppParams = {
  letters?: string;
  treasure?: string[];
  targetScore?: string;
};

const encodeWords: (words: string[]) => string = (words) => {
  const msg = msgpack.encode(words);
  return Base64.fromUint8Array(msg, true);
};

const decodeWords: (arg0: string) => string[] = (encoded) => {
  const decoded = Base64.toUint8Array(encoded);
  return msgpack.decode(decoded);
};

function App() {
  const { search } = useLocation();
  const urlParams: AppParams = qs.parse(search);
  const history = useHistory();

  const update_query_params = (updates: {}) => {
    const new_params: AppParams = { ...urlParams, ...updates };
    if (qs.stringify(urlParams) !== qs.stringify(new_params)) {
      history.push({ search: '?' + qs.stringify(new_params) });
      console.log('new query params > ', new_params);
    }
  };

  const given_letters =
    (urlParams['letters'] && String(urlParams['letters']).split('')) || [];

  const [score, setScore] = useState(0);
  const [currWord, setCurrWord] = useState('');
  const [letters, _setLetters] = useState<string[]>(given_letters);
  const setLetters = (letters: string[]) => {
    update_query_params({ letters: letters.join('') });
    _setLetters(letters);
  };

  const givenTreasure =
    (urlParams['treasure'] && decodeWords(String(urlParams['treasure']))) || [];
  const [treasureList, _setTreasureList] = useState<string[]>(givenTreasure);
  const setTreasureList = (words: string[]) => {
    update_query_params({ treasure: encodeWords(words) });
    _setTreasureList(words);
  };

  const num_letters = letters.length;

  useEffect(() => {
    if (num_letters === 0) {
      setLetters(randomLetters(20));
    }
    // eslint-disable-next-line
  }, [num_letters]);

  useEffect(() => {
    setScore(treasureList.reduce((score, word) => score + wordScore(word), 0));
  }, [treasureList]);

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
            if (spellchecked && treasureList.indexOf(s) === -1) {
              setTreasureList([...treasureList, s]);
              setCurrWord('');
              return true;
            } else {
              return false;
            }
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
          }}
        >
          <Link
            style={{
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
              marginBottom: '1rem',
            }}
            className="btn"
            to={'.'}
            onClick={(_) => {
              setTreasureList([]);
              setCurrWord('');
              setLetters([]);
            }}
          >
            New Game
          </Link>
          <Link
            className="btn"
            style={{
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
              marginBottom: '1rem',
            }}
            target="_blank"
            to={{
              pathname: '.',
              search: qs.stringify({
                letters: letters.join(''),
                targetScore: score,
              }),
            }}
          >
            Challenge
          </Link>
        </div>
      </div>
      <div className="outputs">
        <Score
          score={score}
          target={Number(urlParams['targetScore'] || undefined)}
        />
        <WordTreasure words={treasureList} />
      </div>
    </div>
  );
}

const AppStack = () => (
  <Router>
    <App />
  </Router>
);

export default AppStack;
