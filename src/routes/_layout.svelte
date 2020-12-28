<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';

  // get random accent color
  const accents = ['#00ffff', '#F081D8', '#EBC748', '#EF4646'];
  let accent = accents[Math.floor(Math.random() * accents.length)];

  export let segment: string;
</script>

<style>
  main {
    position: relative;
    max-width: var(--narrow-wrap);
    width: 95%;
    background-color: inherit;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
  }

  #page-wrap {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    min-height: 100vh;
  }
</style>

<span id="page-wrap">
  <div style={`--accent: ${accent}`}>
    <Nav {segment} />
    <main>
      <slot />
    </main>
  </div>

  <Footer />
</span>
