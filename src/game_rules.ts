import { drop_item_mut } from './util';

export const allowedAddition = (
letters: string[],
currentWord: string,
newLetter: string
) => {
  // Note: this is ugly, because it mutes the taken field as a side
  // effect
  let taken = `${currentWord}`.split('');
  let available = letters.filter((l) => !drop_item_mut(taken, l));
  return available.includes(newLetter);
};


export const wordScore = (
word: string
) => {
  if (word.length <= 2) {
    return 0
  } else {
    return word.length
  }
};
