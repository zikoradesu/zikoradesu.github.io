<script>
  import Home from './Home.svelte';
  import Study from './Study.svelte';
  import homeStylesheet from './styles/home.css?url';
  import studyStylesheet from './ace/study.css?url';

  const currentPath = window.location.pathname;
  const isStudyPath = currentPath === '/study' || currentPath === '/study/';
  const stylesheet = isStudyPath ? studyStylesheet : homeStylesheet;
</script>

<svelte:head>
  <title>{isStudyPath ? 'Study | Zikora' : 'Zikora'}</title>
  <link rel="stylesheet" href={stylesheet} />
</svelte:head>

{#if isStudyPath}
  <Study />
{:else}
  <Home />
{/if}