<script lang="ts">
  import Nav from '../components/Nav.svelte';

  // get random accent color
  const accents = ['#00ffff', '#F081D8', '#EBC748', '#EF4646'];
  let accent = accents[Math.floor(Math.random() * accents.length)];

  export let segment: string;
</script>

<style>
  main {
    position: relative;
    max-width: 890px;
    width: 95%;
    background-color: inherit;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<span style={`--accent: ${accent}`}>
  <Nav {segment} />

  <main>
    <slot />
  </main>
</span>
