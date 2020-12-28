<script lang="ts">
  export let segment: string;
</script>

<style>
  nav {
    display: flex;
    margin: 42px auto 67px;
    max-width: var(--wide-wrap);
    width: 97.5%;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-left: 30px;
    font-size: 16px;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
    opacity: 1;
  }

  a {
    display: block;
  }

  #logo {
    font-size: 24px;
  }

  #logo span::before {
    content: '*';
    margin-right: 0.5em;
    color: var(--accent);
  }
</style>

<nav>
  <a href="/" id="logo"><span>passgen</span></a>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href="/">home</a>
    </li>
    <li>
      <a
        aria-current={segment === 'philosophy' ? 'page' : undefined}
        href="/philosophy">philosophy</a>
    </li>
    <li>
      <a
        aria-current={segment === 'privacy' ? 'page' : undefined}
        href="/privacy">privacy</a>
    </li>
  </ul>
</nav>
