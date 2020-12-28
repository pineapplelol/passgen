<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let strength: number;
  export let currentPassword: string;
  const dispatch = createEventDispatcher();

  function generatePassword() {
    dispatch('generate');
  }

  const copyToClipboard = (s: string) => {
    // copies received string into clipboard
  };
</script>

<style>
  div {
    width: 100%;
    display: flex;
  }

  #field {
    height: 69px;
  }

  #bar {
    height: 8px;
    background-color: white;
    display: flex;
  }

  #bar span {
    background-color: var(--green);
  }

  input {
    flex: 8;
    background: none;
    border: none;
    font-size: 24px;
    color: var(--font);
    font-family: var(--mono);
    padding-left: 26px;
  }

  button {
    flex: 1;
    background: none;
    color: var(--accent);
    font-size: 32px;
    border: none;
    outline: none;
    cursor: pointer;
  }
</style>

<section>
  <div id="field" role="form">
    <input value={currentPassword} />
    <button on:click={generatePassword}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <title>Copy this password</title>
        <path d="M13 7H7V5H13V7Z" fill="currentColor" />
        <path d="M13 11H7V9H13V11Z" fill="currentColor" />
        <path d="M7 15H13V13H7V15Z" fill="currentColor" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
          fill="currentColor" />
      </svg>
    </button>
    <button on:click={generatePassword}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <title>Generate a new password</title>
        <path
          d="M4.56079 10.6418L6.35394 3.94971L8.25402 5.84979C11.7312 3.6588 16.3814 4.07764 19.41 7.1063L17.9958 8.52052C15.7536 6.27827 12.3686 5.87519 9.71551 7.31128L11.2529 8.84869L4.56079 10.6418Z"
          fill="currentColor" />
        <path
          d="M19.4392 13.3581L17.646 20.0502L15.7459 18.1501C12.2688 20.3411 7.61857 19.9223 4.58991 16.8936L6.00413 15.4794C8.24638 17.7217 11.6313 18.1247 14.2844 16.6887L12.747 15.1512L19.4392 13.3581Z"
          fill="currentColor" />
      </svg>
    </button>
  </div>
  <div id="bar" role="progressbar">
    <span style={`width: ${strength || 0}%`} />
  </div>
</section>
