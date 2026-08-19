<script>
  export let navigate;
</script>

<main class="page home-page">
  <p class="eyebrow">Hello, I am</p>
  <h1>Zikora<span>.</span></h1>
  <p class="intro">I make things, learn in public, and keep a few notes along the way.</p>
  <a class="text-link" href="/study" on:click={(event) => navigate(event, '/study')}>Visit the study →</a>
</main>
