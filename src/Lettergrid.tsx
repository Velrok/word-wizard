import React, { FC } from 'react';
import { drop_item_mut } from './util';
import './Lettergrid.css';

const Lettergrid: FC<{
  letters: string[];
  highlighted: string[];
  onClick?: (arg0: string) => void;
}> = ({ letters, highlighted, onClick }) => {
  let letter_pool = [...highlighted];
  return (
    <div className="Lettergrid">
      {letters.map((l, i) => {
        let classname = 'Lettergrid-letter';
        if (drop_item_mut(letter_pool, l)) {
          classname += ' Lettergrid-letter-highlighted';
        }
        return (
          <span
            key={i}
            className={classname}
            onClick={(_e) => {
              onClick && onClick(l);
            }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
};

export default Lettergrid;
