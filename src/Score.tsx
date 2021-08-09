import React, { FC } from 'react';
import './Score.css';

const Score: FC<{ score: number; target?: number }> = ({ score, target }) =>
  target ? (
    <div className="Score">
      Score: {score} / {target}
    </div>
  ) : (
    <div className="Score">Score: {score}</div>
  );

export default Score;
