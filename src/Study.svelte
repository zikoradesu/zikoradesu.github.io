<script>
  import StudyHero from './ace/StudyHero.svelte';
  import PhaseTimeline from './ace/PhaseTimeline.svelte';
  import TodayPanel from './ace/TodayPanel.svelte';
  import DailyRhythm from './ace/DailyRhythm.svelte';
  import PhaseCards from './ace/PhaseCards.svelte';
  import StudyFooter from './ace/StudyFooter.svelte';
  import studyData from './study-plan.json';

  const phasePlan = studyData.phases.map((phase) => ({
    ...phase,
    start: new Date(`${phase.start}T00:00:00`),
    end: new Date(`${phase.end}T23:59:59`)
  }));

  const phaseCards = studyData.phases.map((phase) => phase.card);
  const rhythmTabs = studyData.rhythmTabs;

  const examDate = new Date(`${studyData.examDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDisplay = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  let activeTab = 'weekday';
  let currentPhaseIndex = phasePlan.findIndex((phase) => today >= phase.start && today <= phase.end);
  if (currentPhaseIndex === -1) {
    currentPhaseIndex = today < phasePlan[0].start ? 0 : phasePlan.length - 1;
  }

  function getTasks(dayOfWeek, phaseId, date) {
    if (phaseId === 'p4') {
      return studyData.tasks.taper[String(date.getDate())] || studyData.tasks.taper['6'];
    }

    let tasks;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) tasks = studyData.tasks.weekday;
    else if (dayOfWeek === 6) tasks = studyData.tasks.saturday;
    else tasks = studyData.tasks.sunday[phaseId];

    return tasks.map((task) => ({
      ...task,
      label: task.label || task.labelByPhase[phaseId]
    }));
  }

  const dateKey = `checklist:${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tasks = getTasks(today.getDay(), phasePlan[currentPhaseIndex].id, today);
  let checklist = tasks.map((task) => ({ ...task, done: false }));

  if (typeof localStorage !== 'undefined') {
    try {
      const checkedIds = JSON.parse(localStorage.getItem(dateKey) || '[]');
      checklist = checklist.map((task) => ({ ...task, done: checkedIds.includes(task.id) }));
    } catch (error) {
      console.error('Could not load checklist:', error);
    }
  }

  $: daysLeft = Math.max(0, Math.ceil((examDate - today) / 86400000));
  $: phaseLabel = phasePlan[currentPhaseIndex].name;
  $: todayPhaseSuffix = today < phasePlan[0].start
    ? ' (starts soon)'
    : today > phasePlan[phasePlan.length - 1].end ? ' (exam has passed)' : '';
  $: todayPhaseLabel = `Phase ${currentPhaseIndex + 1} · ${phaseLabel}${todayPhaseSuffix}`;

  function toggleTask(event) {
    const index = event.detail;
    checklist = checklist.map((item, itemIndex) =>
      itemIndex === index ? { ...item, done: !item.done } : item
    );
    saveChecklist();
  }

  function resetChecklist() {
    checklist = checklist.map((item) => ({ ...item, done: false }));
    if (typeof localStorage !== 'undefined') localStorage.removeItem(dateKey);
  }

  function saveChecklist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(dateKey, JSON.stringify(checklist.filter((item) => item.done).map((item) => item.id)));
    }
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
    <!-- <section class="study-account" aria-label="Study account">
      <button class="signout-button" type="button">Sign out</button>
      <div class="profile">
        <img class="profile-picture" src={studyData.hero.profile.image} alt={studyData.hero.profile.imageAlt} />
        <div class="profile-details">
          <strong>{studyData.hero.profile.name}</strong>
          <span>{studyData.hero.profile.levelTransition}</span>
        </div>
      </div>
    </section> -->

    <StudyHero
      {...studyData.hero}
      daysLeft={daysLeft}
      currentPhase={currentPhaseIndex + 1}
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

    <StudyFooter notes={studyData.footerNotes} />
  </div>
</main>
