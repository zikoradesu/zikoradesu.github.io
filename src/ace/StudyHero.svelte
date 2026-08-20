<script>
  export let title = 'N2 study plan';
  export let subtitle = 'N3 → N2 · Aug 11 – Dec 6, 2026 · built for ~3+ hrs weekdays, 4–6 hrs weekends';
  export let daysLeft = 0;
  export let currentPhase = 1;
  export let examDate = 'Sun, Dec 6, 2026';
</script>

<header class="hero">
  <div class="eyebrow">日本語能力試験 &middot; JLPT preparation</div>
  <h1>{title}</h1>
  <p class="sub">{subtitle}</p>
  <div class="countdown-row">
    <div class="countdown-stat">
      <span>{daysLeft}</span>
      <span class="countdown-label">days to exam</span>
    </div>
    <div class="countdown-stat">
      <span>{currentPhase}</span>
      <span class="countdown-label">current phase</span>
    </div>
    <div class="exam-badge">
      <div class="stamp">N2</div>
      <div class="exam-text">Exam day<br><strong>{examDate}</strong></div>
    </div>
  </div>
</header>
