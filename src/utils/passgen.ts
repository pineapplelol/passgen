import * as words from '../data/words.json';

const SPECIAL_CHARS = ['#', '!', '$', '&', '%', '*', '+', '?', '@', '_'];

const generatePassword = (
  numWords: number,
  randomCasing: boolean,
  numbers: boolean,
  special: boolean,
) => {
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
