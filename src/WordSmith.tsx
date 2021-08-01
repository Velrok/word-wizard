import React, { FC } from 'react';
import { drop_item_mut } from './util';
import './WordSmith.css';

const WordSmith: FC<{
  letters: string[];
  onChange: (arg0: string) => void;
  onReturn: (arg0: string) => Boolean;
}> = ({ onChange, onReturn, letters }) => (
  <div className="WordSmith">
    <input
      placeholder="type here"
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (onReturn(e.currentTarget.value)) {
            e.currentTarget.value = '';
          }
          return true;
        } else if (e.key >= 'a' && e.key <= 'z') {
          // Note: this is ugly, because it mutes the taken field as a side
          // effect
          let taken = e.currentTarget.value.split('');
          let available = letters.filter((l) => !drop_item_mut(taken, l));

          if (available.includes(e.key)) {
            return true;
          } else {
            e.preventDefault();
            return false;
          }
        }
      }}
      tabIndex={100}
    />
    {
      // <button>⏎</button>
    }
  </div>
);

export default WordSmith;
