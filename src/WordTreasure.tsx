import React, { FC } from 'react';
import './WordTreasure.css';
import { wordScore } from './game-rules';

const WordTreasure: FC<{ words: string[] }> = ({ words }) => (
  <div className="WordTreasure">
    <ol>
      {words
        .sort((a, b) => wordScore(b) - wordScore(a))
        .map((w) => (
          <li key={w}>
            <span className="WordTreasure_word">{w} </span>
            <span className="WordTreasure_word_score">({wordScore(w)})</span>
          </li>
        ))}
    </ol>
  </div>
);

export default WordTreasure;
