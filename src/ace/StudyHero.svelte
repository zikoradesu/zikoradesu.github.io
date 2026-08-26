<script>
  export let eyebrow = '';
  export let title = '';
  export let subtitle = '';
  export let daysLeft = 0;
  export let currentPhase = 1;
  export let totalPhases = 4;
  export let daysToExamLabel = '';
  export let currentPhaseLabel = '';
</script>

<header class="hero">
  <div class="eyebrow">{eyebrow}</div>
  <h1>{title}</h1>
  <p class="sub">{subtitle}</p>
  <div class="countdown-row">
    <div class="countdown-stat">
      <span>{daysLeft}</span>
      <span class="countdown-label">{daysToExamLabel}</span>
    </div>
    <div class="countdown-stat">
      <span>{currentPhase} of {totalPhases}</span>
      <span class="countdown-label">{currentPhaseLabel}</span>
    </div>
  </div>
</header>
