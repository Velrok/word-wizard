import React, { FC, useCallback } from 'react';
import './WordTreasure.css';
import { wordScore } from './game-rules';

const isLatest = (words: string[], index: number) => index === words.length - 1;

const getClasses = (words: string[], index: number, sortedIndex: number) => {
  let classes = ['WordTreasure_word_item'];
  if (isLatest(words, index)) {
    classes.push('WordTreasure_word--newest');
  }
  if (isLatest(words, index) && sortedIndex === 0) {
    classes.push('WordTreasure_word--new-highscore');
  }
  return classes.join(' ');
};

const Item: FC<{
  words: string[];
  index: number;
  sortedIndex: number;
  word: string;
}> = ({ words, index, sortedIndex, word }) => {
  const scrollingRef = useCallback(
    (el) => {
      el &&
        el.classList.contains('WordTreasure_word--newest') &&
        el.scrollIntoView({
          behavior: 'smooth',
        });
    },
    [] // only once
  );
  return (
    <li
      ref={scrollingRef}
      key={word}
      className={getClasses(words, index, sortedIndex)}
    >
      <span className="WordTreasure_word">{word} </span>
      <span className="WordTreasure_word_score">{wordScore(word)}</span>
    </li>
  );
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
            <Item
              words={words}
              index={index}
              sortedIndex={sortedIndex}
              word={w}
            />
          ))}
      </ol>
    </div>
  );
};

export default WordTreasure;
