const getPossiblities = (
  password: string,
  numWords: number,
  randomCasing: boolean,
  numbers: boolean,
  special: boolean,
  additionalChar: Array<string>,
): number => {
  const base = randomCasing ? 14000 : 7000;
  let possibilities = Math.pow(base, numWords);
  if (numbers) possibilities *= 100;
  if (special) possibilities *= 100;
  for (const x of additionalChar) {
    if (x === '+') possibilities *= (password.length - 1) * 72;
    if (x === '-') possibilities *= password.length;
  }
  return possibilities;
};

const getScaledEntropy = (possibilities: number): number => {
  const entropy = Math.log2(possibilities);
  const maxEntropy = 80;
  if (entropy > maxEntropy) return 100;
  return (entropy / maxEntropy) * 100;
};

const getHackTime = (possibilities: number): [number, string] => {
  const hashesPerSecond = 1100000;
  const seconds = possibilities / hashesPerSecond;
  const hours = seconds / 3600;
  if (hours < 24) return [+hours.toFixed(2), 'hours'];
  const days = hours / 24;
  if (days < 7) return [+days.toFixed(2), 'days'];
  const weeks = days / 7;
  if (weeks < 52) return [+weeks.toFixed(2), 'weeks'];
  let years = weeks / 52;
  return [+years.toFixed(2), 'years'];
};

export { getPossiblities, getScaledEntropy, getHackTime };
