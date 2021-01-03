<script lang="ts">
  export let segment: string;
</script>

<style>
  nav {
    display: flex;
    margin: 42px auto 67px;
    max-width: var(--wide-wrap);
    width: 95%;
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
    opacity: 1;
  }

  #logo span::before {
    content: '*';
    margin-right: 0.5em;
    color: var(--accent);
  }

  @media (max-width: 830px) {
    #home-link {
      display: none;
    }

    ul {
      text-align: right;
    }

    ul > li > a {
      text-align: right;
    }
  }
</style>

<nav>
  <a href="/" id="logo"><span>passgen</span></a>
  <ul>
    <li id="home-link">
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
