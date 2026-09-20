<script>
  export let phases = [];
  export let currentPhaseIndex = 0;
</script>

<section class="timeline">
  <h2>Four phases to N2</h2>
  <div class="phase-track">
    {#each phases as phase, index}
      <div class:active={index === currentPhaseIndex} class="phase-box" data-phase={phase.id}>
        {#if index === currentPhaseIndex}
          <span class="now-tag">Now</span>
        {/if}
        <div class="pname">{phase.name}</div>
        <div class="pdate">{phase.range}</div>
        <div class="pfocus">{phase.focus}</div>
      </div>
    {/each}
  </div>
</section>
