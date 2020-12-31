import * as words from '../data/words.json';

const SPECIAL_CHARS = ['#', '!', '$', '&', '%', '*', '+', '?', '@', '_'];

/**
 * Generates a random password from the word dictionary and given options.
 * @param {number} numWords - number of words to include in the password
 * @param {boolean} randomCasing - if each word should have a 50% chance of starting with an uppercase letter
 * @param {boolean} numbers - if numbers should be appended in the form `-[][]`
 * @param {boolean} special - if special characters should be appended in the form `[][]`
 */
const generatePassword = (
  numWords: number,
  randomCasing: boolean,
  numbers: boolean,
  special: boolean,
): string => {
  const allWords = words['words'];
  let password = '';

  for (let i = 0; i < numWords; i += 1) {
    let w = allWords[Math.floor(Math.random() * allWords.length)];
    if (randomCasing && Math.random() <= 0.5)
      w = w.charAt(0).toUpperCase() + w.slice(1);
    password += `${w}-`;
  }

  if (!numbers) password = password.slice(0, -1);
  if (numbers) {
    password += Math.floor(Math.random() * 10).toString();
    password += Math.floor(Math.random() * 10).toString();
  }

  if (special) {
    password += SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)];
    password += SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)];
  }

  return password;
};

export default generatePassword;
