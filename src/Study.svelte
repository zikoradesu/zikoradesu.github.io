<script>
  import StudyHero from './ace/StudyHero.svelte';
  import PhaseTimeline from './ace/PhaseTimeline.svelte';
  import TodayPanel from './ace/TodayPanel.svelte';
  import DailyRhythm from './ace/DailyRhythm.svelte';
  import PhaseCards from './ace/PhaseCards.svelte';
  import StudyFooter from './ace/StudyFooter.svelte';

  const phasePlan = [
    {
      id: 'p1',
      name: 'Foundation sprint',
      range: 'Aug 11 – Sep 21',
      focus: 'Vocab + kanji from scratch, grammar begins'
    },
    {
      id: 'p2',
      name: 'Build-up',
      range: 'Sep 22 – Oct 26',
      focus: 'N2-level reading, weekly sectional mocks'
    },
    {
      id: 'p3',
      name: 'Exam simulation',
      range: 'Oct 27 – Nov 30',
      focus: 'Pure review, full mocks, timed reading'
    },
    {
      id: 'p4',
      name: 'Taper',
      range: 'Dec 1 – Dec 6',
      focus: 'Rest, light review, exam day'
    }
  ];

  const phaseCards = [
    {
      title: 'Phase 1 · Foundation sprint',
      range: 'Aug 11 – Sep 21 · 6 weeks',
      focus: 'Build the entire N2 vocabulary and kanji base from a standing start, while introducing grammar systematically. Reading stays at N3 level so comprehension doesn\'t stall while vocab ramps up.',
      stats: [
        { label: 'Anki', value: '~20–25 new words/day + reviews' },
        { label: 'Kanji Dojo', value: '~8–10 new kanji/day + reviews' },
        { label: 'Renshuu', value: '~2–3 new grammar points/day' },
        { label: 'Reading', value: 'N3-level, comprehension-focused' },
        { label: 'Immersion', value: 'Casual, JP subtitles, no pressure' },
        { label: 'Migii', value: 'None — one baseline diagnostic in week 1' }
      ]
    },
    {
      title: 'Phase 2 · Build-up',
      range: 'Sep 22 – Oct 26 · 5 weeks',
      focus: 'Finish new vocabulary and grammar intake, move reading up to N2-level material, and start weekly mock testing. Immersion becomes more structured.',
      stats: [
        { label: 'Anki', value: '~15–18 new words/day, tapering' },
        { label: 'Kanji Dojo', value: 'Mostly review, clear stragglers early' },
        { label: 'Renshuu', value: 'Finish grammar list, drill confusable pairs' },
        { label: 'Reading', value: 'N2-level short/medium passages, timed' },
        { label: 'Immersion', value: 'YouTube/podcasts + weekend films, JP subs' },
        { label: 'Migii', value: 'Weekly sectional mock, Sundays' }
      ]
    },
    {
      title: 'Phase 3 · Exam simulation',
      range: 'Oct 27 – Nov 30 · 5 weeks',
      focus: 'Stop adding new material — this phase is pure reinforcement and exam conditioning. Reading moves to full timed passages, immersion shifts toward listening without subtitles, and mock tests go full-length.',
      stats: [
        { label: 'Anki', value: 'Reviews only, clear leeches' },
        { label: 'Kanji Dojo', value: 'Reviews only' },
        { label: 'Renshuu', value: 'Targeted review of weak points' },
        { label: 'Reading', value: 'Full N2 section, timed, 2–3x/week' },
        { label: 'Immersion', value: 'Podcasts/dramas w/o subtitles — listening prep' },
        { label: 'Migii', value: 'Full mock weekly + Monday error review' }
      ]
    },
    {
      title: 'Phase 4 · Taper',
      range: 'Dec 1 – Dec 6 · 1 week',
      focus: 'Protect energy, keep only light maintenance, and sharpen exam-day rhythm. No heavy grind in the final stretch.',
      stats: [
        { label: 'Anki', value: 'Very light review only' },
        { label: 'Kanji Dojo', value: 'Touch-ups, no new load' },
        { label: 'Renshuu', value: 'Only weak-point refreshers' },
        { label: 'Reading', value: 'Short passages, confidence-building' },
        { label: 'Immersion', value: 'Light listening, lower cognitive load' },
        { label: 'Migii', value: 'Final light review, no stress testing' }
      ]
    }
  ];

  const rhythmTabs = [
    {
      id: 'weekday',
      label: 'Weekday',
      rows: [
        { time: '19:00–19:25', app: 'Anki', activity: 'Vocabulary reviews (SRS)', duration: '25 min' },
        { time: '19:25–20:00', app: 'Kanji Dojo', activity: 'New kanji + reviews', duration: '35 min' },
        { time: '20:00–20:45', app: 'Renshuu', activity: 'Grammar: new point + drills', duration: '45 min' },
        { time: '20:45–21:30', app: 'Reading', activity: 'Passage practice, level rises by phase', duration: '45 min' },
        { time: '21:30–22:05', app: 'Immersion', activity: 'YouTube / podcast', duration: '35 min' }
      ],
      total: '≈ 3 hr 5 min total',
      note: 'Clock times are just one example block — shift the whole thing earlier or later, the order and durations are what matter.'
    },
    {
      id: 'saturday',
      label: 'Saturday',
      rows: [
        { time: '10:00–10:40', app: 'Anki + Kanji Dojo', activity: 'Combined review session', duration: '40 min' },
        { time: '10:40–11:40', app: 'Reading', activity: 'Extended passage or short story', duration: '60 min' },
        { time: '11:40–12:25', app: 'Renshuu', activity: 'Weak-point grammar drilling', duration: '45 min' },
        { time: '14:00–16:00', app: 'Immersion', activity: 'Film or long-form video, Japanese subs', duration: '90–120 min' }
      ],
      total: '≈ 4–4.5 hr total'
    },
    {
      id: 'sunday',
      label: 'Sunday',
      rows: [
        { time: '10:00–12:00', app: 'Migii', activity: 'Mock test — sectional in phase 2, full in phase 3', duration: '90–150 min' },
        { time: '12:00–13:00', app: 'Review', activity: 'Error log: redo and understand mistakes', duration: '45–60 min' },
        { time: '13:00–13:30', app: 'Anki + Kanji Dojo', activity: 'Light maintenance review', duration: '30 min' },
        { time: 'Afternoon', app: 'Free', activity: 'Rest, flex, or extra immersion', duration: '—' }
      ],
      total: '≈ 3–4.5 hr total, plus flex time',
      note: 'In phase 1 (before mocks start), swap the Migii block for a lighter review-and-rest morning instead.'
    }
  ];

  const examDate = new Date('2026-12-06T00:00:00');
  const today = new Date();
  const todayDisplay = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  let activeTab = 'weekday';
  let currentPhaseIndex = 0;
  let checklist = [
    { category: 'Anki', label: 'Review vocabulary queue', duration: '25 min', done: false },
    { category: 'Kanji', label: 'Finish today’s kanji set', duration: '35 min', done: false },
    { category: 'Grammar', label: 'Drill the new grammar point', duration: '45 min', done: false },
    { category: 'Reading', label: 'Complete one passage', duration: '45 min', done: false },
    { category: 'Immersion', label: 'Listen or watch Japanese for 35 min', duration: '35 min', done: false }
  ];

  $: daysLeft = Math.max(0, Math.ceil((examDate - today) / 86400000));
  $: phaseLabel = phasePlan[currentPhaseIndex].name;
  $: todayPhaseLabel = `Phase ${currentPhaseIndex + 1} · ${phaseLabel}`;

  function toggleTask(event) {
    const index = event.detail;
    checklist = checklist.map((item, itemIndex) =>
      itemIndex === index ? { ...item, done: !item.done } : item
    );
  }

  function resetChecklist() {
    checklist = checklist.map((item) => ({ ...item, done: false }));
  }

  function handleTabChange(event) {
    activeTab = event.detail;
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<main class="study-page">
  <div class="container">
    <StudyHero
      title="N2 study plan"
      subtitle="N3 → N2 · Aug 11 – Dec 6, 2026 · built for ~3+ hrs weekdays, 4–6 hrs weekends"
      daysLeft={daysLeft}
      currentPhase={currentPhaseIndex + 1}
      examDate="Sun, Dec 6, 2026"
    />

    <PhaseTimeline phases={phasePlan} currentPhaseIndex={currentPhaseIndex} />

    <TodayPanel
      dateLabel={todayDisplay}
      phaseLabel={todayPhaseLabel}
      items={checklist}
      on:toggle={toggleTask}
      on:reset={resetChecklist}
    />

    <DailyRhythm tabs={rhythmTabs} activeTab={activeTab} on:changeTab={handleTabChange} />

    <PhaseCards phases={phaseCards} />

    <StudyFooter />
  </div>
</main>
