<script lang="ts">
  import PasswordField from '../components/PasswordField.svelte';

  const generatePassword = () =>
    new Array(4)
      .fill(0)
      .map((_) =>
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 4 + Math.floor(Math.random() * 5)),
      )
      .join(' ');

  let currentPassword: string = generatePassword();

  function handleGenerate(_) {
    currentPassword = generatePassword();
  }
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
<PasswordField on:generate={handleGenerate} {currentPassword} strength={60} />
