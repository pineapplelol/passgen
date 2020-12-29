<style>
  footer {
    display: flex;
    margin: 0 auto;
    max-width: var(--wide-wrap);
    width: 97.5%;
    justify-content: space-between;
    align-items: center;
    padding: 42px 0;
  }

  a {
    display: block;
  }

  a svg {
    margin-left: 0.5em;
    width: 1em;
    height: 1em;
    margin-bottom: -0.125em;
  }
</style>

<footer>
  <a href="https://pineapple.lol">
    &copy;
    {new Date().getFullYear()}
    pineapple.lol
  </a>
  <a
    href="https://vercel.com?utm_source=pineapplelol&utm_campaign=oss"
    rel="noopener noreferrer"
    target="_blank">powered by<svg
      width="116"
      height="100"
      viewBox="0 0 116 100"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg">
      <title>Vercel</title>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M57.5 0L115 100H0L57.5 0z" />
    </svg>
  </a>
</footer>
