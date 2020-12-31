/**
 * Will generate how many variations of the given password and settings are possible.
 * The beginning calculation before entropy.
 * @param {string} password - the password that's generated
 * @param {number} numWords - the number of words that are pulled from the dictionary
 * @param {boolean} randomCasing - whether or not random uppercasing was used
 * @param {boolean} numbers - whether or not numbers were included
 * @param {boolean} special - whether or not special characters were included
 * @param {Array<string>} additionalChar - a list of modifications made to the password, with + representing
 *                         an additional character and - representing a removal
 */
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

/**
 * Returns the scaled entropy value from a scale of 0-100
 * @param {number} possibilities - number of possible variations of the password
 * @param {number} maxEntropy - max entropy value
 */
const getScaledEntropy = (
  possibilities: number,
  maxEntropy: number,
): number => {
  const entropy = Math.log2(possibilities);
  if (entropy > maxEntropy) return 100;
  return (entropy / maxEntropy) * 100;
};

/**
 * Returns how long it would take a hacker to crack a passord.
 * @param {number} possibilities - number of possible variations of the password
 * @param {number} hashesPerSecond - the number of password attempts per second
 */
const getHackTime = (
  possibilities: number,
  hashesPerSecond: number,
): [number, string] => {
  const seconds = possibilities / hashesPerSecond;
  const hours = seconds / 3600;
  if (hours < 24) return [+hours.toFixed(2), 'hours'];
  const days = hours / 24;
  if (days < 7) return [+days.toFixed(2), 'days'];
  const weeks = days / 7;
  if (weeks < 52) return [+weeks.toFixed(0), 'weeks'];
  let years = weeks / 52;
  return [+years.toFixed(0), 'years'];
};

export { getPossiblities, getScaledEntropy, getHackTime };
