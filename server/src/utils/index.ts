export const coinFlip = () => Math.random() < 0.5;

export const getRandomBetween = (min: number, max: number): number => {
  return parseInt(Math.random() * (max - min) + min + '');
};
