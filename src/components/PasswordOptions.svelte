<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  /* props */
  export let numWords: number;
  export let special: boolean;
  export let numbers: boolean;
  export let randomCasing: boolean;

  /* create dispatcher */
  const dispatch = createEventDispatcher();

  /* reducer */

  function updateOptionsReducer(e): void {
    switch (e.target.name) {
      case 'num-words':
        dispatch('updateNumWords', {
          newNumWords: e.target.value,
        });
        break;
      case 'digits':
        dispatch('updateDigits', {
          newDigits: e.target.checked,
        });
        break;
      case 'symbols':
        dispatch('updateSymbols', {
          newSymbols: e.target.checked,
        });
        break;
      case 'uppercase':
        dispatch('updateUppercase', {
          newUppercase: e.target.checked,
        });
        break;
      default:
        break;
    }
  }
</script>

<style>
  section {
    display: flex;
    justify-content: space-between;
    margin: 31px 0 56px 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  ul > li {
    display: inline-block;
  }

  label {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  li label {
    margin-right: 20px;
  }

  label input {
    margin-right: 13px;
  }

  input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
  }

  input[type='checkbox']:focus {
    outline: none;
  }

  input[type='checkbox']::after {
    content: '';
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 4px;
    border-color: white;
  }

  input[type='checkbox']:checked::after {
    background-color: white;
  }

  input[type='checkbox']:checked::before {
    z-index: 2;
    content: '';
    color: var(--bg-color);
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3.75px;
    top: 1.25px;
    width: 6px;
    height: 10px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    transform-origin: bottom left;
    transform: rotate(45deg) scale(1.33);
  }

  label #label {
    min-width: 4.5em;
    text-align: right;
  }

  input[type='range'] {
    display: block;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: none;
    outline: none;
    cursor: pointer;
    position: relative;
  }

  input[type='range'] ~ #pseudo-bar {
    display: block;
    width: calc(100% - 4.5em - 16px);
    content: '';
    position: absolute;
    left: 3px;
    top: calc(50% - 2px);
    background: #ffffff15;
    border-radius: 4em;
    height: 4px;
    z-index: -1;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px;
    height: 22px;
    background: var(--color);
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 4px;
    height: 22px;
    background: var(--color);
    cursor: pointer;
    border: none;
  }

  @media (max-width: 800px) {
    section {
      display: block;
    }

    section ul {
      margin-bottom: 1em;
    }

    section ul > li {
      display: inline-block;
    }

    section ul > li label {
      font-size: 14px;
    }
  }
</style>

<section>
  <ul role="group">
    <li>
      <label for="uppercase">
        <input
          type="checkbox"
          name="uppercase"
          id="uppercase"
          bind:checked={randomCasing}
          on:input={(e) => updateOptionsReducer(e)} />Uppercase</label>
    </li>
    <li>
      <label for="digits">
        <input
          type="checkbox"
          name="digits"
          id="digits"
          bind:checked={numbers}
          on:input={(e) => updateOptionsReducer(e)} />Digits</label>
    </li>
    <li>
      <label for="symbols">
        <input
          type="checkbox"
          name="symbols"
          id="symbols"
          bind:checked={special}
          on:input={(e) => updateOptionsReducer(e)} />Symbols</label>
    </li>
  </ul>
  <label for="num-words">
    <input
      type="range"
      name="num-words"
      bind:value={numWords}
      on:input={(e) => updateOptionsReducer(e)}
      min={2}
      max={15}
      id="num-words" /><span id="pseudo-bar" /><span /><span id="label">
      {numWords < 10 ? ' ' : ''}{numWords || ' 2'}
      Words</span></label>
</section>
