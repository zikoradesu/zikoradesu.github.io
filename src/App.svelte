<script>
  import { onMount } from 'svelte';
  import Home from './Home.svelte';
  import Study from './Study.svelte';
  import homeStylesheet from './styles/home.css?url';
  import studyStylesheet from './styles/study.css?url';

  let path = window.location.pathname;
  $: isStudyPath = path === '/study' || path === '/study/';
  $: stylesheet = isStudyPath ? studyStylesheet : homeStylesheet;

  onMount(() => {
    const updatePath = () => {
      path = window.location.pathname;
    };

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  });

  function navigate(event, destination) {
    event.preventDefault();
    window.history.pushState({}, '', destination);
    path = destination;
  }
</script>

<svelte:head>
  <title>{isStudyPath ? 'Study | Zikora' : 'Zikora'}</title>
  <link rel="stylesheet" href={stylesheet} />
</svelte:head>

{#if isStudyPath}
  <Study />
{:else}
  <Home {navigate} />
{/if}