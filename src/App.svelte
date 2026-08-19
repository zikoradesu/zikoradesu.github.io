<script>
  import { onMount } from 'svelte';
  import Home from './Home.svelte';
  import Study from './Study.svelte';

  let path = window.location.pathname;

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
  <title>{path === '/study' || path === '/study/' ? 'Study | Zikora' : 'Zikora'}</title>
</svelte:head>

<header class="site-header">
  <a class="brand" href="/" on:click={(event) => navigate(event, '/')}>zikora<span>.</span></a>
  <nav aria-label="Main navigation">
    <a class:active={path === '/study' || path === '/study/'} href="/study" on:click={(event) => navigate(event, '/study')}>Study</a>
  </nav>
</header>

{#if path === '/study' || path === '/study/'}
  <Study />
{:else}
  <Home {navigate} />
{/if}

<footer>
  <span>© {new Date().getFullYear()} Zikora</span>
  <span>Built with care</span>
</footer>