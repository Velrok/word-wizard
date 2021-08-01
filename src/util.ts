export const drop_item_mut: <T>(array: Array<T>, item: T) => Boolean = (
  array,
  item
) => {
  const i = array.indexOf(item);
  if (i >= 0) {
    array.splice(i, 1);
    return true;
  } else {
    return false;
  }
};

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle_array: <T>(arr: Array<T>) => Array<T> = (arr) => {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
