import dist from "./letter-dist-en.json";
const TOTAL_WEIGHT: number = dist.reduce((agg, item) => {
  // its not smart enought to understnad the _letter means I know I dont' need it but I need a placeholder
  // eslint-disable-next-line
  const [_letter, weight] = item;
  return agg + Number(weight);
}, 0);

export const pick_random_letter_en: () => string = () => {
  const target = Math.random() * TOTAL_WEIGHT;
  let x = 0;
  for (const [letter, w] of dist) {
    const weight = Number(w);
    if (x + weight >= target) {
      return String(letter);
    } else {
      x += weight;
    }
  }
  throw new Error("A letter should have been found.");
};
