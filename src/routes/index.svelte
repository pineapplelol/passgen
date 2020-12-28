<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';
  import generatePassword from '../utils/passgen';

  const getEntropy = (string: s) => Math.floor(Math.random() * 100);

  let numWords = 4;
  let randomCasing = false;
  let numbers = false;
  let special = false;

  let currentPassword: string = generatePassword(
    numWords,
    randomCasing,
    numbers,
    special,
  );
  let strength: number;

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

  $: strength = getEntropy(currentPassword);
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
