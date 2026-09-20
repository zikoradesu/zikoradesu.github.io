<script>
  export let notes = [];
</script>

<footer class="notes">
  <ul>
    {#each notes as note}
      <li>{note}</li>
    {/each}
  </ul>
</footer>
