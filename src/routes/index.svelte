<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';
  import PasswordOptions from '../components/PasswordOptions.svelte';

  import generatePassword from '../utils/passgen';
  import {
    getPossibilities,
    getEntropy,
    getScaledEntropy,
    getHackTime,
    getColorFromEntropy,
  } from '../utils/entropy';

  const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  /* state */

  // state for options

  let numWords = 4;
  let randomCasing = true;
  let numbers = true;
  let special = false;

  // input var
  let generatedPassword: string;
  let currentPassword: string;
  let possibilities: number;
  let hackTime: [number, string];
  let prettyHackTime: string;

  let entropyColor = 'inherit';

  /* event handlers */

  function handleGenerate(_: any): void {
    generatedPassword = generatePassword(
      numWords,
      randomCasing,
      numbers,
      special,
    );
    currentPassword = generatedPassword;
  }

  function handleInput(e: any): void {
    currentPassword = e.detail?.newPassword || '';
  }

  function handleOptions(e: any): void {
    const _isValid = (v: any): any => typeof v !== 'undefined' && v !== null;

    const { newNumWords, newDigits, newUppercase, newSymbols } = e.detail;

    if (_isValid(newNumWords)) numWords = newNumWords;
    if (_isValid(newDigits)) numbers = newDigits;
    if (_isValid(newUppercase)) randomCasing = newUppercase;
    if (_isValid(newSymbols)) special = newSymbols;
  }
  /* calculated state */

  $: possibilities = getPossibilities(
    generatedPassword,
    currentPassword,
    numWords,
    randomCasing,
    numbers,
    special,
  );
  $: entropy = getEntropy(possibilities);
  $: scaledEntropy = getScaledEntropy(entropy, 80);
  $: hackTime = getHackTime(possibilities, 1100000);
  $: prettyHackTime = !isNaN(hackTime[0])
    ? `${numberWithCommas(hackTime[0])} ${hackTime[1]}`
    : hackTime[1];
  $: entropyColor = getColorFromEntropy(scaledEntropy);
  $: generatedPassword = generatePassword(
    numWords,
    randomCasing,
    numbers,
    special,
  );
  $: currentPassword = generatedPassword;
</script>

<style>
  h1 {
    font-size: 2em;
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

  p > br {
    display: none;
  }

  @media (max-width: 830px) {
    p > br {
      display: block;
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
    {scaledEntropy} />
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
    <span style={`color: ${entropyColor}`}>{prettyHackTime}</span>
    to crack this password.<br />
    <a href="/philosophy">Learn More</a>.
  </p>
</div>
