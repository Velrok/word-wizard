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
    return (
      word.length *
      word.split('').reduce((score: number, letter: string) => {
        switch (letter) {
          case 'a':
          case 'e':
          case 'i':
          case 'l':
          case 'n':
          case 'o':
          case 'r':
          case 's':
          case 't':
          case 'u':
            return 1 + score;
          case 'd':
          case 'g':
            return 2 + score;
          case 'b':
          case 'c':
          case 'm':
          case 'p':
            return 3 + score;
          case 'f':
          case 'h':
          case 'v':
          case 'w':
          case 'y':
            return 4 + score;
          case 'k':
            return 5 + score;
          case 'j':
          case 'x':
            return 7 + score;
          case 'q':
          case 'z':
            return 8 + score;
          default:
            return score;
        }
      }, 0)
    );
  }
};

export const randomLetters: (arg0: number) => string[] = (count: number) => {
  const maxOccurence = 4;
  let pool = [];
  for (let [l, weight] of dist) {
    let probability = Number(weight) / MAX_WEIGHT;
    let tickets = Math.ceil(probability * maxOccurence);
    for (let i = 0; i < tickets; i++) {
      pool.push(String(l));
    }
  }
  return shuffle_array(pool).slice(0, count);
};
