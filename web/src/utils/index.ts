export const coinFlip = () => Math.random() < 0.5;

export const getRandomBetween = (min: number, max: number): number => {
  return parseInt(Math.random() * (max - min) + min + '');
};

export var generateNumber = function (min: number, max: number) {
  if (min > max) {
    throw new Error('Minimum value should be smaller than maximum value.');
  }
  var range = max - min;
  return min + range * Math.random();
};
