import React, { FC } from 'react';
import './WordTreasure.css';

const WordTreasure: FC<{ words: string[] }> = ({ words }) => (
  <div className="WordTreasure">
    <ol>
      {words.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ol>
  </div>
);

export default WordTreasure;
