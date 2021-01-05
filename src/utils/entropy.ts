/**
 * Will generate how many variations of the given password and settings are possible, assuming
 * that everything is known about the system that generated the password.
 * @param {string} password - the password that's generated
 * @param {number} numWords - the number of words that are pulled from the dictionary
 * @param {boolean} randomCasing - whether or not random uppercasing was used
 * @param {boolean} numbers - whether or not numbers were included
 * @param {boolean} special - whether or not special characters were included
 * @param {Array<string>} additionalChar - a list of modifications made to the password, with + representing
 *                         an additional character and - representing a removal
 */
const getKerckhoffsPossibilities = (
  password: string,
  numWords: number,
  randomCasing: boolean,
  numbers: boolean,
  special: boolean,
  additionalChar: Array<string>,
): number => {
  const base = randomCasing ? 14000 : 7000;
  let possibilities = base ** numWords;
  if (numbers) possibilities *= 100;
  if (special) possibilities *= 100;
  for (const x of additionalChar) {
    if (x === '+') possibilities *= (password.length - 1) * 72;
    if (x === '-') possibilities *= password.length;
  }
  return possibilities;
};

/**
 * Will generate how many variations of the given password are possible given the charset
 * of the password and no prior information about the generation system.
 * @param {string} password - the password that's generated
 */
const getRandomPossibilities = (password: string): number => {
  let charset = 26;
  if (
    password.toLowerCase() !== password &&
    password.toUpperCase() !== password
  ) {
    charset += 26;
  }
  if (/\d/.test(password)) {
    charset += 10;
  }
  const strippedPass = password.replace(/[^A-Za-z0-9]/g, '');
  if (strippedPass !== password) {
    charset += 10;
  }
  return charset ** password.length;
};

/**
 * Returns the minimum number of possible variations of a given password
 * given both the options of knowledge and no knowledge of the system
 * @param {string} password - the password that's generated
 * @param {number} numWords - the number of words that are pulled from the dictionary
 * @param {boolean} randomCasing - whether or not random uppercasing was used
 * @param {boolean} numbers - whether or not numbers were included
 * @param {boolean} special - whether or not special characters were included
 * @param {Array<string>} additionalChar - a list of modifications made to the password, with + representing
 *                         an additional character and - representing a removal
 */
const getPossibilities = (
  password: string,
  numWords: number,
  randomCasing: boolean,
  numbers: boolean,
  special: boolean,
  additionalChar: Array<string>,
): number => {
  const kerckhoff = getKerckhoffsPossibilities(
    password,
    numWords,
    randomCasing,
    numbers,
    special,
    additionalChar,
  );
  const random = getRandomPossibilities(password);
  return Math.min(kerckhoff, random);
};

/**
 * Returns the entropy of the password given number of possible variations that exist
 * @param {number} possibilities - number of variations of the password that are possible
 */
const getEntropy = (possibilities: number): number => {
  return Math.log2(possibilities);
};

/**
 * Returns the scaled entropy value from a scale of 0-100
 * @param {number} entropy - entropy of the password
 * @param {number} maxEntropy - max entropy value
 */
const getScaledEntropy = (entropy: number, maxEntropy: number): number => {
  if (entropy > maxEntropy) return 100;
  return (entropy / maxEntropy) * 100;
};

/**
 * Returns how long it would take a hacker to crack a passord
 * @param {number} possibilities - number of possible variations of the password
 * @param {number} hashesPerSecond - the number of password attempts per second
 */
const getHackTime = (
  possibilities: number,
  hashesPerSecond: number,
): [number, string] => {
  const seconds = possibilities / hashesPerSecond;
  if (seconds < 1) return [Number.NaN, 'no time at all'];
  if (seconds < 60) return [+seconds.toFixed(2), 'seconds'];
  const minutes = seconds / 60;
  if (minutes < 60) return [+minutes.toFixed(2), 'minutes'];
  const hours = minutes / 3600;
  if (hours < 24) return [+hours.toFixed(2), 'hours'];
  const days = hours / 24;
  if (days < 7) return [+days.toFixed(2), 'days'];
  const weeks = days / 7;
  if (weeks < 52) return [+weeks.toFixed(0), 'weeks'];
  let years = weeks / 52;
  return [+years.toFixed(0), 'years'];
};

const getColorFromEntropy = (entropy: number): string => {
  if (entropy > 60) return 'var(--green)';
  if (entropy < 30) return 'var(--red)';
  return 'var(--yellow)';
};

export {
  getPossibilities,
  getEntropy,
  getScaledEntropy,
  getHackTime,
  getColorFromEntropy,
};
