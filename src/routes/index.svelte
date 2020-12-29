<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';
  import PasswordOptions from '../components/PasswordOptions.svelte';

  import generatePassword from '../utils/passgen';

  // fill for lack of entropy util
  const getEntropy = (
    numWords: number,
    randomCasing: boolean,
    numbers: boolean,
    special: boolean,
  ): number => {
    const base = randomCasing ? 14000 : 7000;
    let possibilities = Math.pow(base, numWords);
    if (numbers) possibilities *= 100;
    if (special) possibilities *= 100;
    return Math.log2(possibilities);
  };

  /* state */

  // state for options

  let numWords = 4;
  let randomCasing = false;
  let numbers = false;
  let special = false;

  // input var

  let currentPassword: string;
  let entropy: number;

  /* event handlers */

  function handleGenerate(_: any): void {
    currentPassword = generatePassword(
      numWords,
      randomCasing,
      numbers,
      special,
    );
  }

  function handleInput(e: any): void {
    currentPassword = e.detail?.newPassword || '';
  }

  function handleOptions(e: any): void {
    const _isValid = (v: any): any => typeof v !== 'undefined' && v !== null;

    const { newNumWords, newDigits, newUppercase, newSymbols } = e.detail;

    if (_isValid(newNumWords)) {
      numWords = newNumWords;
    }
    if (_isValid(newDigits)) {
      numbers = newDigits;
    }
    if (_isValid(newUppercase)) {
      randomCasing = newUppercase;
    }
    if (_isValid(newSymbols)) {
      special = newSymbols;
    }
  }
  /* calculated state */

  $: entropy = getEntropy(numWords, randomCasing, numbers, special);
  $: currentPassword = generatePassword(
    numWords,
    randomCasing,
    numbers,
    special,
  );
</script>

<style>
  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 0.5em 0;
    line-height: 1.1;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  p {
    opacity: 1;
    font-size: 20px;
    font-family: var(--mono);
    font-weight: 700;
  }

  p a {
    opacity: 1;
    text-decoration: underline;
  }
</style>

<svelte:head>
  <title>Passgen</title>
</svelte:head>

<h1>Generate memorable, secure passwords.</h1>
<div role="form" aria-label="generate a password">
  <PasswordField
    on:generate={handleGenerate}
    on:updateCurrentPassword={handleInput}
    {currentPassword}
    {entropy} />
  <PasswordOptions
    on:updateNumWords={handleOptions}
    on:updateDigits={handleOptions}
    on:updateSymbols={handleOptions}
    on:updateUppercase={handleOptions}
    {numWords}
    {special}
    {randomCasing}
    {numbers} />
  <p>
    It would take a hacker
    <span style="color: var(--accent)">{entropy}</span>
    hours to crack this password.
    <a href="/philosophy">Learn More</a>.
  </p>
</div>
