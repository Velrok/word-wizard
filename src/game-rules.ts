import { shuffle_array, drop_item_mut } from './util';
import dist from './letter-dist-en.json';
const MAX_WEIGHT: number = Math.max(...dist.map((pair) => Number(pair[1])));

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

export const wordScore = (word: string) => {
  if (word.length <= 2) {
    return 0;
  } else {
    return word.length;
  }
};

export const randomLetters: (arg0: number) => string[] = (count: number) => {
  const maxOccurence = 4;
  let pool = [];
  for (let [l, weight] of dist) {
    let probability = Number(weight) / MAX_WEIGHT;
    let tickets = Math.ceil(probability * maxOccurence);
    console.log(l, 'weight', Number(weight), 'tickets', tickets);
    for (let i = 0; i < tickets; i++) {
      pool.push(String(l));
    }
  }
  console.log('pool', pool);
  return shuffle_array(pool).slice(0, count);
};
