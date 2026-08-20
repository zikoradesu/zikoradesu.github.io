<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let dateLabel = '—';
  export let phaseLabel = '—';
  export let items = [];

  $: completed = items.filter((item) => item.done).length;
  $: progressText = `${completed} / ${items.length} done`;

  function toggleTask(index) {
    dispatch('toggle', index);
  }

  function resetChecklist() {
    dispatch('reset');
  }
</script>

<section>
  <h2>Today</h2>
  <div class="today-panel">
    <div class="today-head">
      <div>
        <div class="today-date">{dateLabel}</div>
        <div class="today-phase">{phaseLabel}</div>
      </div>
      <div class="today-progress">{progressText}</div>
    </div>

    <ul class="checklist">
      {#each items as item, index}
        <li class:done={item.done}>
          <input
            type="checkbox"
            checked={item.done}
            on:change={() => toggleTask(index)}
          />
          <span class="capp">{item.category}</span>
          <span class="task">{item.label}</span>
          <span class="dur">{item.duration}</span>
        </li>
      {/each}
    </ul>

    <button class="reset-btn" type="button" on:click={resetChecklist}>Reset today's checklist</button>
  </div>
</section>
