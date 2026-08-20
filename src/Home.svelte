<script>
    import { onMount } from 'svelte';
    import initDrawer from './home.js';
    import githubIcon from './icons/github.svg';
    import instagramIcon from './icons/instagram.svg';
    import twitterIcon from './icons/twitter.svg';
    import signatureGraphic from './icons/signature.svg?raw';

    const bioText = `Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words are the truncation of dolorem ipsum ("pain itself"). `;
    const jobTitle = 'Software Engineer';

    onMount(() => initDrawer());

</script>

<main>
    <div class="home-layout">
        <section class="light-panel">
            <div class="light-panel-top">
                <p class="handle-label">@ZIKORADESU</p>
                <div class="light-rule"></div>
                <div class="social-links">
                    <a href="https://www.instagram.com/zikoradesu" class="social-link">
                        <img src={instagramIcon} alt="" aria-hidden="true" />
                        <span>Instagram</span>
                    </a>
                    <a href="https://twitter.com/zikoradesu" class="social-link">
                        <img src={twitterIcon} alt="" aria-hidden="true" />
                        <span>Twitter</span>
                    </a>
                    <a href="https://github.com/zikoradesu" class="social-link">
                        <img src={githubIcon} alt="" aria-hidden="true" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
            <p class="location">London, UK</p>
        </section>

        <section class="dark-panel" id="drawer">
            <div class="drawer-handle" id="handle"></div>
            <div class="dark-panel-body">
                <div>
                    <h1 class="font-furi">ゼ ィ コ ラ ・ オ ブ ア グ</h1>
                    <h2 class="font-lead">ZIKORA OGBUAGU</h2>
                    <p class="work-title">{jobTitle}</p>
                    <div class="dark-rule"></div>
                    <p id="bioText">{bioText}</p>
                    <div class="signature">{@html signatureGraphic}</div>
                </div>
                <nav class="site-nav">
                    <a href="/" class="nav-item active">Bio</a>
                    <a href="/" class="nav-item">Resume</a>
                    <a href="/" class="nav-item">Projects</a>
                </nav>
            </div>
        </section>
    </div>
</main>
