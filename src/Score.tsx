import React, { FC } from 'react';
import './Score.css';

const Score: FC<{ score: number }> = ({ score }) => (
  <div className="Score">Score: {score}</div>
);

export default Score;
