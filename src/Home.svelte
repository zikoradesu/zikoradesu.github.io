<script>
  import { onMount } from 'svelte';
  import { createTextCycle } from './textCycle.js';

  export let navigate;

  const names = ['Zikora', 'ゼィコラ'];
  const textCycle = createTextCycle(names, { intervalMs: 2000, scrambleMs: 500 });

  let currentName = names[0];

  onMount(() => {
    const stop = textCycle.start((nextValue) => {
      currentName = nextValue;
    });

    return stop;
  });
</script>

<div class="page-shell">
  <div class="graph-grid" aria-hidden="true"></div>
  <main class="page home-page">
    <p class="eyebrow">我が名は、</p>
    <h1><span class="name-cycle">{currentName}</span><span>.</span></h1>
    <span style="margin-top: 20px;"></span>
    <div class="intro-wrap">
      <p class="translation-note">このページを読むなら読むなよ。</p>
      <p class="intro">If you're reading this, dont.</p>
    </div>

    <p><a class="text-link" href="/study" on:click={(event) => navigate(event, '/study')}>JLPT Study Bench →</a></p>
  </main>
</div>
    