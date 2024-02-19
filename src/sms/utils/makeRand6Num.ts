export const makeRand6Num = (): string => {
  const randNum = Math.floor(Math.random() * 1000000);
  return randNum.toString().padStart(6, '0');
};
