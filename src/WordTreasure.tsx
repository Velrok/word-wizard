import React, { FC } from 'react';
import './WordTreasure.css';
import { wordScore } from './game-rules';

const getClasses = (words: string[], index: number, sortedIndex: number) => {
  const isLatest = (index: number) => index === words.length - 1;
  let classes = ['WordTreasure_word_item'];
  if (isLatest(index)) {
    classes.push('WordTreasure_word--newest');
  }
  if (isLatest(index) && sortedIndex === 0) {
    classes.push('WordTreasure_word--new-highscore');
  }
  return classes.join(' ');
};

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
          .map(([w, index], sortedIndex) => (
            <li key={w} className={getClasses(words, index, sortedIndex)}>
              <span className="WordTreasure_word">{w} </span>
              <span className="WordTreasure_word_score">{wordScore(w)}</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default WordTreasure;
