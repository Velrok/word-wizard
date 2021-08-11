import React, { FC } from 'react';
import './WordTreasure.css';
import { wordScore } from './game-rules';

const WordTreasure: FC<{ words: string[] }> = ({ words }) => {
  const indexed_words: Array<[string, number]> = words.map((item, index) => [
    item,
    index,
  ]);
  return (
    <div className="WordTreasure">
      <ol>
        {indexed_words
          .sort(([a, _aa], [b, _bb]) => wordScore(b) - wordScore(a))
          .map(([w, index]) => (
            <li
              key={w}
              className={
                (index == words.length - 1 && 'WordTreasure_word--newest') || ''
              }
            >
              <span className="WordTreasure_word">{w} </span>
              <span className="WordTreasure_word_score">({wordScore(w)})</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default WordTreasure;
