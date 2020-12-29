<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ShadowClipboard from './ShadowClipboard.svelte';

  /* props */
  export let prettyHackTime: string;
  export let currentPassword: string;

  // state for applying spinning animation
  let isSpinning = false;

  /* create dispatcher */
  const dispatch = createEventDispatcher();

  /* dispatchers */

  function generatePassword(): void {
    isSpinning = true;
    dispatch('generate');
    window.setTimeout(() => (isSpinning = false), 1000);
  }

  function updateCurrentPassword(): void {
    dispatch('updateCurrentPassword', { newPassword: currentPassword });
  }

  /* utils */

  /**
   * copies contents of `currentPassword` state to clipboard
   */
  const copyToClipboard = (): void => {
    const app = new ShadowClipboard({
      target: document.getElementById('clipboard'),
      props: { name: currentPassword },
    });
    app.$destroy();
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
    transition: padding 0.2s ease-in-out;
  }

  input {
    flex: 8;
    background: none;
    border: none;
    font-size: 24px;
    font-weight: 700;
    color: var(--font);
    font-family: var(--mono);
    padding-left: 26px;
  }

  #field/*:focus-within*/ {
    background-color: #ffffff07;
  }

  input:focus {
    outline: none;
  }

  button {
    flex: 1;
    background: none;
    color: var(--accent);
    font-size: 32px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform 2s;
  }

  button:active svg {
    transform: scale(1.15, -1);
  }

  button.grow:active svg {
    transform: scale(1.15);
  }

  button.spin svg {
    transition: none;
    animation: spin 1s 1;
    transform: scale(1, -1);
  }

  @-moz-keyframes spin {
    from {
      -moz-transform: scale(1, -1) rotate(0deg);
    }
    to {
      -moz-transform: scale(1, -1) rotate(-360deg);
    }
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: scale(1, -1) rotate(0deg);
    }
    to {
      -webkit-transform: scale(1, -1) rotate(-360deg);
    }
  }
  @keyframes spin {
    from {
      transform: scale(1, -1) rotate(0deg);
    }
    to {
      transform: scale(1, -1) rotate(-360deg);
    }
  }
</style>

<section>
  <div id="field" role="textbox">
    <!-- current password field -->
    <input bind:value={currentPassword} on:input={updateCurrentPassword} />
    <!-- copy to clipboard -->
    <button on:click={copyToClipboard} class="grow">
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
    <!-- generate password -->
    <button
      on:click={generatePassword}
      class={isSpinning ? 'spin' : ''}
      type="submit">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        transform="scale(1, -1)"
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
  <!-- entropy rating -->
  <div
    id="bar"
    role="progressbar"
    aria-valuenow={prettyHackTime || '0'}
    aria-valuemin="0"
    aria-valuemax="100">
    <span style={`padding-left: ${prettyHackTime || '0'}%`} />
  </div>
</section>

<!-- Shadow app container for copying to clipboard -->
<div id="clipboard" />
