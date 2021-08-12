import React, { FC } from 'react';
import './WordSmith.css';

const WordSmith: FC<{
  letters: string[];
  spellcheck: (word: string) => boolean;
  currentWord: string;
  isValidAddition: (arg0: string[], arg1: string, arg2: string) => Boolean;
  onChange: (arg0: string) => void;
  onReturn: (arg0: string) => Boolean;
}> = ({
  spellcheck,
  isValidAddition,
  currentWord,
  onChange,
  onReturn,
  letters,
}) => (
  <div className="WordSmith">
    <input
      spellCheck="false"
      className={`WordSmith_input ${
        spellcheck(currentWord) && 'WordSmith_input_valid'
      }`}
      value={currentWord}
      placeholder="type here"
      onChange={(e) => onChange(e.currentTarget.value.toLowerCase())}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (onReturn(e.currentTarget.value)) {
            e.currentTarget.value = '';
          }
          return true;
        } else if (e.key === 'Backspace') {
          return true;
        } else if (
          (e.key >= 'a' && e.key <= 'z') ||
          (e.key >= 'A' && e.key <= 'Z')
        ) {
          if (isValidAddition(letters, currentWord, e.key.toLowerCase())) {
            return true;
          } else {
            e.preventDefault();
            return false;
          }
        }
      }}
      tabIndex={100}
    />
    <button
      className="btn WordSmith_enter"
      disabled={!spellcheck(currentWord)}
      onClick={(_e) => onReturn(currentWord)}
    >
      ⏎
    </button>
    <button
      className="btn WordSmith_backspace"
      onClick={(_e) => onChange(currentWord.slice(0, -1))}
    >
      ⌫
    </button>
  </div>
);

export default WordSmith;
