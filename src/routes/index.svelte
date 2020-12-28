<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';
  import generatePassword from '../utils/passgen';

  // fill for lack of entropy util
  const getEntropy = (s: string) => Math.floor(Math.random() * 100);

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

  function handleGenerate(_) {
    currentPassword = generatePassword(
      numWords,
      randomCasing,
      numbers,
      special,
    );
  }

  function handleInput(e: any) {
    currentPassword = e.detail?.newPassword || '';
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
<PasswordField
  on:generate={handleGenerate}
  on:updateCurrentPassword={handleInput}
  {currentPassword}
  {strength} />
