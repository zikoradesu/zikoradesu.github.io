<script>
  export let phases = [];
</script>

<section>
  <h2>Phase by phase</h2>

  {#each phases as phase}
    <div class="phase-card">
      <div class="phase-card-head">
        <h3>{phase.title}</h3>
        <span class="pdate">{phase.range}</span>
      </div>
      <p class="focus">{phase.focus}</p>
      <div class="phase-stats">
        {#each phase.stats as stat}
          <div>
            <b>{stat.label}</b>
            <span>{stat.value}</span>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
