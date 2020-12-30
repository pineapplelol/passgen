<svelte:head>
  <title>Philosophy | Passgen</title>
</svelte:head>

<span class="page">
  <h1>Philosophy</h1>

  <p>
    Passwords are used multiple times a day, but have you thought out how your
    password is generated? Do you use a simple password like ‘password’, or do
    you use a string of random letts and characters that you can barely
    remember. Chances are you use one of the two.
  </p>
  <p>
    This platform was inspired by an
    <a
      href="https://xkcd.com/936/"
      target="_blank"
      rel="noreferrer noopener">XKCD</a>, which brings both easy to remember and
    strong passwords into one. This is important, because without easy to
    remember passwords, users are more prone to storing it in unsafe places and
    using the same password across many different platforms,
    <a
      href="NIST Special Publication 800-63B
    https://pages.nist.gov/800-63-3/sp800-63b.html#sec10"
      target="_blank"
      rel="noreferrer noopener">which counteracts security measures</a>.
  </p>

  <h2>Password Attacks</h2>

  <p>
    Its important to understand the ways your password can be compromised. There
    are many different ways that a hacker will be able to obtain your password.
  </p>
  <p>
    Most of the time if your passwords are compromised, its not because your
    passwords were ‘cracked’. Instead, it is because it was sniped off the
    internet – whether it come from a data breach for a service you use, logging
    in over Starbucks wifi, or falling prone to a phishing attack. To this
    degree, the strength of your password is less important than how you keep
    it. Even if your password can be cracked in 100 tries, services you use will
    throttle the number of login attempts anyways. That means if a user cannot
    login after 4 tries, they will suspend anymore login attempts. In this case,
    the tradeoff between ease of memory and strength of the password can become
    more balanced.
  </p>
  <p>
    Another type of attacks are offline attacks. This occurs when a hacker gains
    access to a set of hashed passwords that are stored. They run sepcific
    software targeted at being able to decipher these. This is the main attack
    that having a ‘strong’ password will help prevent, and the standard for
    measuring time it takes to crack a password.
  </p>

  <h2>Password Strength</h2>

  <p>
    Entropy is a measure of how many possibilities your passwords can take, and
    how many guesses it will take a hacker to get your password. Specifically,
    2^(entropy bits) is number of possibilities.
  </p>
  <p>
    Normally this is calculated by looking at the complete character set
    (letters, numbers, special charcaters) and iterating through all of the
    possibilities. However, this is an incorrect way to calculate. Based on
    Kerckoff’s principle, we assume that the hacker knows everything about the
    system that generated the password. Given this, we have a specific way of
    calculating password strength.
  </p>
  <p>
    Specifically, we have to look at the dictionary set from which the words are
    drawn, and consider how many words are used for the password. If 4 words are
    used from a dictionary set of 7000, then the number of possibilities is
    7000^4. From there we track modifications and additional characters. We use
    the scale:
  </p>
  <ul>
    <li>&lt; 29 → weak</li>
    <li>30-59 → moderate</li>
    <li>&gt; 60 → strong</li>
  </ul>
  <p>
    From there, we think about the number of hashes per second a hacker can try
    to guess the password. Given the latest software
    <a
      href="
    https://gist.github.com/Chick3nman/e4fcee00cb6d82874dace72106d73fef"
      target="_blank"
      rel="noreferrer noopener">Hashcat on an RTX 3090</a>, they can guess 1.1
    MH/s, which is 1.1 million password attempts per second.
  </p>
</span>
