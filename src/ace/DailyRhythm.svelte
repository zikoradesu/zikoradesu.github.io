<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let activeTab = 'weekday';
  export let tabs = [];

  function selectTab(tabId) {
    dispatch('changeTab', tabId);
  }
</script>

<section>
  <h2>Daily rhythm</h2>
  <div class="tabs" role="tablist">
    {#each tabs as tab}
      <button
        type="button"
        class:active={activeTab === tab.id}
        class="tab"
        data-tab={tab.id}
        on:click={() => selectTab(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  {#each tabs as tab}
    <div class:active={activeTab === tab.id} class="tab-panel" id={`panel-${tab.id}`}>
      <div class="timetable">
        {#each tab.rows as row}
          <div class="trow">
            <span class="ttime">{row.time}</span>
            <span class="tapp">{row.app}</span>
            <span class="tactivity">{row.activity}</span>
            <span class="tdur">{row.duration}</span>
          </div>
        {/each}
      </div>
      {#if tab.total}<div class="ttotal">{tab.total}</div>{/if}
      {#if tab.note}<div class="tnote">{tab.note}</div>{/if}
    </div>
  {/each}
</section>
