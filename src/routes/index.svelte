<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';
  import PasswordOptions from '../components/PasswordOptions.svelte';

  import generatePassword from '../utils/passgen';

  // fill for lack of entropy util
  const getEntropy = (s: string): number => Math.floor(Math.random() * 100);

  /* state */

  // state for options

  let numWords = 4;
  let randomCasing = false;
  let numbers = false;
  let special = false;

  // input var

  let currentPassword: string;
  let strength: number;

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

  $: strength = getEntropy(currentPassword);
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
    {strength} />
  <PasswordOptions
    on:updateNumWords={handleOptions}
    on:updateDigits={handleOptions}
    on:updateSymbols={handleOptions}
    on:updateUppercase={handleOptions}
    {numWords}
    {special}
    {randomCasing}
    {numbers} />
</div>
