/**
 * Mohamed & Hala - Luxury Wedding Invite Generator Engine
 * Features:
 * - Password Gate with default 'me7299'
 * - Secret Backdoor 'wedding_pass_wedding' to change password without code edit
 * - Locked Couple Names: Mohamed & Hala
 * - Dynamic Guest Customization (Default: Mr / Sherief Mohamed)
 * - Bilingual Arabic / English luxury wedding invite template
 * - Scroll-triggered Split Heart Re-attachment animation
 * - Procedural Web Audio API romantic wedding piano soundtrack
 * - Standalone HTML file exporter
 */

const DEFAULT_PASSWORD = 'me7299';
const SECRET_BACKDOOR = 'wedding_pass_wedding';
const STORAGE_PASS_KEY = 'wedding_invite_site_pass';

// Global Invite State
const inviteState = {
  groomEn: 'Mohamed',
  groomAr: 'محمد',
  brideEn: 'Hala',
  brideAr: 'هالة',
  guestName: 'Mr / Sherief Mohamed',
  weddingDate: '2026-11-20',
  weddingTime: '18:00',
  venueName: 'The Royal Ballroom, Four Seasons Hotel',
  venueLocation: 'Nile Plaza, Garden City, Cairo',
  lang: 'bilingual', // bilingual | ar | en
};

// ==========================================================================
// 1. PASSWORD GATE & ADMIN BACKDOOR LOGIC
// ==========================================================================

function getStoredPassword() {
  return localStorage.getItem(STORAGE_PASS_KEY) || DEFAULT_PASSWORD;
}

function handleGateSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('gatePassInput');
  const val = input.value.trim();
  const errorEl = document.getElementById('gateError');
  const adminPanel = document.getElementById('adminSecretPanel');

  errorEl.textContent = '';

  // 1. Secret Backdoor Check
  if (val === SECRET_BACKDOOR) {
    adminPanel.classList.remove('hidden');
    input.value = '';
    showToast('✨ Master Admin Backdoor Unlocked! You can set a new password below.');
    return;
  }

  // 2. Normal Password Check
  const currentPass = getStoredPassword();
  if (val === currentPass) {
    // Correct password!
    unlockPortal();
  } else {
    // Incorrect password
    errorEl.textContent = 'Incorrect access key. Please try again.';
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
  }
}

function unlockPortal() {
  sessionStorage.setItem('portal_unlocked', 'true');
  
  // Confetti celebration
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F7E7CE', '#AA771C']
    });
  }

  const modal = document.getElementById('passwordGateModal');
  const app = document.getElementById('appContainer');
  
  modal.classList.remove('active');
  document.body.classList.remove('locked-body');
  app.classList.remove('hidden');
  
  // Render Initial Preview
  renderPreview();
  showToast('Welcome to Mohamed & Hala Wedding Invite Generator! 💍');
}

function saveNewPassword() {
  const newPassInput = document.getElementById('newPassInput');
  const newPass = newPassInput.value.trim();
  const msgEl = document.getElementById('adminSuccessMsg');

  if (!newPass) {
    alert('Please enter a valid password');
    return;
  }

  localStorage.setItem(STORAGE_PASS_KEY, newPass);
  msgEl.textContent = `Password successfully changed to: "${newPass}"!`;
  newPassInput.value = '';
  showToast('Password updated! You can now use your new password.');

  setTimeout(() => {
    msgEl.textContent = '';
    unlockPortal();
  }, 1200);
}

function resetToDefaultPassword() {
  localStorage.setItem(STORAGE_PASS_KEY, DEFAULT_PASSWORD);
  const msgEl = document.getElementById('adminSuccessMsg');
  msgEl.textContent = `Password reset to default ("${DEFAULT_PASSWORD}")`;
  showToast('Password reset to default (me7299)');
}

function togglePassVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function openPasswordChangeModal() {
  const newPass = prompt('Enter new access password for the portal:');
  if (newPass && newPass.trim()) {
    localStorage.setItem(STORAGE_PASS_KEY, newPass.trim());
    showToast(`Password updated successfully to "${newPass.trim()}"`);
  }
}

function logout() {
  sessionStorage.removeItem('portal_unlocked');
  location.reload();
}

// ==========================================================================
// 2. GENERATOR CONTROLS & STATE UPDATES
// ==========================================================================

function updateGuestName(name) {
  inviteState.guestName = name.trim() || 'Honored Guest';
  document.getElementById('previewGuestLabel').textContent = inviteState.guestName;
  renderPreview();
}

function setQuickGuest(name) {
  document.getElementById('guestNameInput').value = name;
  updateGuestName(name);
}

function updateEventDetails() {
  inviteState.weddingDate = document.getElementById('weddingDateInput').value;
  inviteState.weddingTime = document.getElementById('weddingTimeInput').value;
  inviteState.venueName = document.getElementById('venueNameInput').value;
  inviteState.venueLocation = document.getElementById('venueLocationInput').value;
  renderPreview();
}

function setInitialLang(lang) {
  inviteState.lang = lang;
  document.querySelectorAll('.lang-choice-btn').forEach(btn => btn.classList.remove('active'));
  if (lang === 'bilingual') document.getElementById('langChoiceBilingual').classList.add('active');
  if (lang === 'ar') document.getElementById('langChoiceAr').classList.add('active');
  if (lang === 'en') document.getElementById('langChoiceEn').classList.add('active');
  renderPreview();
}

function setPreviewDevice(mode) {
  const wrapper = document.getElementById('previewFrameWrapper');
  const btnDesktop = document.getElementById('btnModeDesktop');
  const btnMobile = document.getElementById('btnModeMobile');

  if (mode === 'mobile') {
    wrapper.classList.add('mobile');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
  } else {
    wrapper.classList.remove('mobile');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
  }
}

// ==========================================================================
// 3. WEDDING INVITATION HTML TEMPLATE GENERATOR
// ==========================================================================

function generateInviteHTML(state) {
  const isArabicFirst = state.lang === 'ar';
  const isEnglishFirst = state.lang === 'en';
  const defaultDir = isArabicFirst ? 'rtl' : 'ltr';

  // Format date display
  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}`);
  const dateOptionsEn = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormattedEn = eventDateObj.toLocaleDateString('en-US', dateOptionsEn);
  
  const dateOptionsAr = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormattedAr = eventDateObj.toLocaleDateString('ar-EG', dateOptionsAr);

  return `<!DOCTYPE html>
<html lang="${isArabicFirst ? 'ar' : 'en'}" dir="${defaultDir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Invitation | Mohamed & Hala - ${state.guestName}</title>
  
  <!-- Google Fonts: Amiri (Arabic Calligraphy), Cormorant Garamond, Alex Brush -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script>

  <style>
    :root {
      --gold-primary: #D4AF37;
      --gold-light: #F7E7CE;
      --gold-dark: #996515;
      --gold-gradient: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
      --emerald-dark: #0A1C19;
      --emerald-surface: #102B26;
      --cream-bg: #FAF7F2;
      --cream-card: #FFFFFF;
      --text-dark: #2C2621;
      --text-gold: #966C1E;
      --rose-accent: #E3A857;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-arabic: 'Amiri', 'Traditional Arabic', serif;
      --font-cursive: 'Alex Brush', cursive;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--cream-bg);
      color: var(--text-dark);
      font-family: var(--font-serif);
      overflow-x: hidden;
      line-height: 1.6;
      background-image: 
        radial-gradient(circle at 15% 10%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 85% 90%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
    }

    /* Floating Canvas for Rose Petals & Sparkles */
    #fxCanvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
    }

    /* Floating Audio & Language Bar */
    .floating-nav {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
      display: flex;
      gap: 10px;
    }

    html[dir="rtl"] .floating-nav {
      right: auto;
      left: 20px;
    }

    .nav-pill-btn {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid var(--gold-primary);
      color: var(--gold-dark);
      padding: 8px 16px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .nav-pill-btn:hover {
      background: var(--gold-gradient);
      color: #172421;
      transform: translateY(-2px);
    }

    .nav-pill-btn.playing {
      background: var(--gold-primary);
      color: white;
      animation: pulse 1.5s infinite;
    }

    /* 1. HERO & WAX SEAL OPENING ENVELOPE */
    .hero-envelope-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      position: relative;
      text-align: center;
    }

    .envelope-box {
      width: 100%;
      max-width: 580px;
      background: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 20px;
      padding: 50px 35px;
      box-shadow: 0 25px 60px rgba(153, 101, 21, 0.12), 0 0 30px rgba(212, 175, 55, 0.1);
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease;
    }

    .envelope-box::before {
      content: '';
      position: absolute;
      inset: 8px;
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 14px;
      pointer-events: none;
    }

    .quran-verse {
      font-family: var(--font-arabic);
      font-size: 20px;
      color: var(--gold-dark);
      margin-bottom: 25px;
      line-height: 2;
    }

    .bismillah {
      font-family: var(--font-arabic);
      font-size: 26px;
      color: var(--gold-dark);
      margin-bottom: 15px;
      font-weight: bold;
    }

    .vip-badge-wrapper {
      margin: 25px auto;
      display: inline-block;
      padding: 6px 20px;
      border-top: 1px solid var(--gold-primary);
      border-bottom: 1px solid var(--gold-primary);
    }

    .vip-label {
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-gold);
      display: block;
      margin-bottom: 4px;
    }

    .vip-guest-name {
      font-size: 26px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 1px;
    }

    .couple-grand-names {
      margin: 30px 0;
    }

    .couple-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .name-block {
      display: flex;
      flex-direction: column;
    }

    .name-en {
      font-size: 44px;
      font-weight: 700;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
    }

    .name-ar {
      font-family: var(--font-arabic);
      font-size: 32px;
      color: var(--gold-dark);
      margin-top: -6px;
    }

    .ampersand {
      font-family: var(--font-cursive);
      font-size: 55px;
      color: var(--gold-primary);
      line-height: 1;
    }

    .wax-seal-button {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #e6a739, #a36511 80%, #633c04);
      margin: 30px auto 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(100, 60, 4, 0.35), inset 0 2px 4px rgba(255,255,255,0.4);
      border: 3px solid #fce39e;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .wax-seal-button:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 35px rgba(100, 60, 4, 0.5);
    }

    .wax-seal-button span {
      font-family: var(--font-cursive);
      font-size: 30px;
      color: #fff9e6;
      font-weight: bold;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    }

    .open-prompt {
      font-size: 13px;
      letter-spacing: 1px;
      color: var(--text-gold);
      margin-top: 8px;
      animation: bounce 2s infinite;
    }

    /* 2. THE SPLIT HEART RE-ATTACHMENT SECTION (SCROLL TRIGGERED) */
    .split-heart-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      position: relative;
      background: #FFFFFF;
      overflow: hidden;
      border-top: 1px solid rgba(212, 175, 55, 0.15);
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
    }

    .heart-section-title {
      text-align: center;
      margin-bottom: 40px;
    }

    .heart-section-title h2 {
      font-size: 36px;
      font-weight: 600;
      color: var(--gold-dark);
      letter-spacing: 1px;
    }

    .heart-section-title p {
      font-size: 16px;
      color: #666;
      margin-top: 5px;
    }

    /* Split Heart Stage */
    .heart-stage-container {
      position: relative;
      width: 320px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }

    .heart-half-wrapper {
      position: absolute;
      top: 0;
      width: 150px;
      height: 280px;
      transition: transform 0.1s linear, filter 0.3s ease;
      will-change: transform;
    }

    .heart-half-left {
      left: 10px;
      transform-origin: right center;
    }

    .heart-half-right {
      right: 10px;
      transform-origin: left center;
    }

    .heart-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 10px 20px rgba(212, 175, 55, 0.3));
    }

    .heart-label {
      position: absolute;
      top: 45%;
      font-family: var(--font-cursive);
      font-size: 26px;
      font-weight: bold;
      color: #FFFFFF;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      pointer-events: none;
    }

    .heart-half-left .heart-label {
      right: 25px;
    }

    .heart-half-right .heart-label {
      left: 25px;
    }

    /* Locked Heart Pulse when joined */
    .heart-stage-container.locked {
      animation: heartBeating 1.2s infinite ease-in-out;
    }

    .heart-stage-container.locked .heart-svg {
      filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.8));
    }

    .union-status-badge {
      margin-top: 25px;
      padding: 10px 28px;
      border-radius: 30px;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid var(--gold-primary);
      color: var(--gold-dark);
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      transition: all 0.4s ease;
    }

    .union-status-badge.united {
      background: var(--gold-gradient);
      color: #172421;
      font-weight: 700;
      box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
    }

    /* 3. COUNTDOWN SECTION */
    .countdown-section {
      padding: 80px 20px;
      text-align: center;
      background: radial-gradient(circle, #FAF7F2 0%, #F3EDE4 100%);
    }

    .countdown-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .countdown-box {
      width: 100px;
      background: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 14px;
      padding: 18px 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .countdown-val {
      font-size: 38px;
      font-weight: 700;
      color: var(--gold-dark);
      display: block;
      line-height: 1;
    }

    .countdown-lbl {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #777;
      margin-top: 6px;
      display: block;
    }

    /* 4. EVENT DETAILS & ITINERARY */
    .details-section {
      padding: 80px 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .timeline-card {
      background: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 45px rgba(0,0,0,0.04);
      margin-bottom: 40px;
    }

    .timeline-title {
      text-align: center;
      font-size: 32px;
      color: var(--gold-dark);
      margin-bottom: 30px;
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 25px;
      position: relative;
    }

    .timeline-item {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .timeline-icon-wrap {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.15);
      color: var(--gold-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .timeline-info h4 {
      font-size: 18px;
      font-weight: 600;
      color: #222;
    }

    .timeline-info p {
      font-size: 14px;
      color: #666;
    }

    /* Venue Card */
    .venue-card {
      background: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 20px 45px rgba(0,0,0,0.04);
    }

    .venue-title {
      font-size: 30px;
      color: var(--gold-dark);
      margin-bottom: 10px;
    }

    .venue-address {
      font-size: 16px;
      color: #555;
      margin-bottom: 25px;
    }

    .maps-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--gold-gradient);
      color: #172421;
      padding: 14px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
      transition: all 0.3s ease;
    }

    .maps-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
    }

    /* 5. RSVP & WISHES SECTION */
    .rsvp-section {
      padding: 80px 20px;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    .rsvp-card {
      background: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 20px;
      padding: 40px 30px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.05);
    }

    .rsvp-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 25px;
      text-align: initial;
    }

    .rsvp-form input, .rsvp-form textarea, .rsvp-form select {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-family: inherit;
      font-size: 15px;
      outline: none;
      transition: border 0.3s;
    }

    .rsvp-form input:focus, .rsvp-form textarea:focus {
      border-color: var(--gold-primary);
    }

    .rsvp-btn-submit {
      background: var(--gold-gradient);
      color: #172421;
      border: none;
      padding: 14px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .rsvp-btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }

    .rsvp-success-box {
      margin-top: 20px;
      padding: 15px;
      border-radius: 10px;
      background: #e8f8f0;
      color: #157347;
      font-weight: 600;
      display: none;
    }

    /* Footer */
    footer {
      text-align: center;
      padding: 50px 20px 80px;
      color: #777;
      font-size: 14px;
    }

    footer .heart-icon {
      color: #e25555;
    }

    /* Animations */
    @keyframes heartBeating {
      0%, 100% { transform: scale(1); }
      30% { transform: scale(1.12); }
      60% { transform: scale(0.98); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
      60% { transform: translateY(-4px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  </style>
</head>
<body>

  <!-- Floating Audio & Language Controls -->
  <div class="floating-nav">
    <button class="nav-pill-btn" id="audioToggleBtn" onclick="toggleAudioMelody()">
      <i class="fa-solid fa-music"></i>
      <span id="audioStatusText">Play Melody</span>
    </button>
    <button class="nav-pill-btn" onclick="toggleInviteLanguage()">
      <i class="fa-solid fa-language"></i>
      <span id="currentLangLabel">${isArabicFirst ? 'English' : 'عربي'}</span>
    </button>
  </div>

  <canvas id="fxCanvas"></canvas>

  <!-- ============================================ -->
  <!-- 1. LUXURY ENVELOPE & VIP GREETING            -->
  <!-- ============================================ -->
  <section class="hero-envelope-section" id="envelopeSection">
    
    <div class="envelope-box">
      
      <!-- Quranic Blessing -->
      <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      <p class="quran-verse">
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
      </p>

      <p class="intro-blessing" style="color: #666; font-size: 15px;">
        Together with our families, we joyfully invite you to celebrate our wedding
      </p>

      <!-- VIP GUEST PERSONALIZED BADGE -->
      <div class="vip-badge-wrapper">
        <span class="vip-label">Special Invitation For</span>
        <div class="vip-guest-name" id="heroGuestName">${state.guestName}</div>
      </div>

      <!-- COUPLE NAMES (LOCKED) -->
      <div class="couple-grand-names">
        <div class="couple-row">
          <div class="name-block">
            <span class="name-en">${state.groomEn}</span>
            <span class="name-ar">${state.groomAr}</span>
          </div>
          <span class="ampersand">&</span>
          <div class="name-block">
            <span class="name-en">${state.brideEn}</span>
            <span class="name-ar">${state.brideAr}</span>
          </div>
        </div>
      </div>

      <!-- WAX SEAL INTERACTIVE OPENER -->
      <div class="wax-seal-button" onclick="openEnvelopeCard()">
        <span>M & H</span>
      </div>
      <div class="open-prompt">
        <i class="fa-solid fa-envelope-open"></i> Click Wax Seal to Open
      </div>

    </div>

  </section>


  <!-- ============================================ -->
  <!-- 2. SCROLL-TRIGGERED SPLIT HEART ANIMATION   -->
  <!-- ============================================ -->
  <section class="split-heart-section" id="splitHeartSection">
    
    <div class="heart-section-title">
      <h2>Two Souls, One Heart</h2>
      <p>روحان يجمعهما قلب واحد • Scroll to unite Mohamed & Hala</p>
    </div>

    <div class="heart-stage-container" id="heartStage">
      
      <!-- Left Half: Mohamed -->
      <div class="heart-half-wrapper heart-half-left" id="heartHalfLeft">
        <svg class="heart-svg" viewBox="0 0 150 280">
          <defs>
            <linearGradient id="goldHeartGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FCF6BA" />
              <stop offset="50%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA771C" />
            </linearGradient>
          </defs>
          <!-- Left side of heart path -->
          <path d="M148,270 C148,270 10,180 5,90 C0,30 45,5 95,5 C125,5 145,25 148,45 Z" 
                fill="url(#goldHeartGradLeft)" 
                stroke="#FAF7F2" 
                stroke-width="3" />
        </svg>
        <span class="heart-label">${state.groomEn}</span>
      </div>

      <!-- Right Half: Hala -->
      <div class="heart-half-wrapper heart-half-right" id="heartHalfRight">
        <svg class="heart-svg" viewBox="0 0 150 280">
          <defs>
            <linearGradient id="goldHeartGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FCF6BA" />
              <stop offset="50%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA771C" />
            </linearGradient>
          </defs>
          <!-- Right side of heart path -->
          <path d="M2,270 C2,270 140,180 145,90 C150,30 105,5 55,5 C25,5 5,25 2,45 Z" 
                fill="url(#goldHeartGradRight)" 
                stroke="#FAF7F2" 
                stroke-width="3" />
        </svg>
        <span class="heart-label">${state.brideEn}</span>
      </div>

    </div>

    <div class="union-status-badge" id="unionStatusBadge">
      <i class="fa-solid fa-scroll"></i> Keep scrolling to unite the hearts...
    </div>

  </section>


  <!-- ============================================ -->
  <!-- 3. WEDDING COUNTDOWN TIMER                   -->
  <!-- ============================================ -->
  <section class="countdown-section">
    <h3 style="font-size: 28px; color: var(--gold-dark);"><i class="fa-regular fa-clock"></i> The Countdown to the Big Day</h3>
    <p style="color: #666; margin-top: 5px;">We cannot wait to celebrate with you, ${state.guestName}</p>

    <div class="countdown-grid">
      <div class="countdown-box">
        <span class="countdown-val" id="cntDays">00</span>
        <span class="countdown-lbl">Days / أيام</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-val" id="cntHours">00</span>
        <span class="countdown-lbl">Hours / ساعات</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-val" id="cntMinutes">00</span>
        <span class="countdown-lbl">Minutes / دقائق</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-val" id="cntSeconds">00</span>
        <span class="countdown-lbl">Seconds / ثواني</span>
      </div>
    </div>
  </section>


  <!-- ============================================ -->
  <!-- 4. TIMELINE & VENUE LOCATION                 -->
  <!-- ============================================ -->
  <section class="details-section">
    
    <div class="timeline-card">
      <h3 class="timeline-title">Event Schedule & Itinerary</h3>
      
      <div class="timeline-list">
        <div class="timeline-item">
          <div class="timeline-icon-wrap"><i class="fa-solid fa-champagne-glasses"></i></div>
          <div class="timeline-info">
            <h4>06:00 PM • Guest Welcome & Reception (استقبال الضيوف)</h4>
            <p>Welcome drinks & harp musical accompaniment</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon-wrap"><i class="fa-solid fa-heart"></i></div>
          <div class="timeline-info">
            <h4>07:00 PM • Grand Entrance & Zaffa (دخول العروسين والزفة)</h4>
            <p>Welcoming Mohamed & Hala to the ballroom</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon-wrap"><i class="fa-solid fa-utensils"></i></div>
          <div class="timeline-info">
            <h4>08:30 PM • Royal Dinner Banquet (مأدبة العشاء)</h4>
            <p>Gourmet dinner & celebratory performances</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon-wrap"><i class="fa-solid fa-cake-candles"></i></div>
          <div class="timeline-info">
            <h4>10:00 PM • Cake Cutting & Party (تقطيع التورتة)</h4>
            <p>Dancing, photography and celebration</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Venue Card -->
    <div class="venue-card">
      <h3 class="venue-title"><i class="fa-solid fa-location-dot"></i> The Venue</h3>
      <p style="font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px;">${state.venueName}</p>
      <p class="venue-address">${state.venueLocation}</p>
      <p style="color: #666; margin-bottom: 25px;">Date: ${dateFormattedEn} at ${state.weddingTime}</p>

      <a href="https://maps.google.com/?q=${encodeURIComponent(state.venueName + ' ' + state.venueLocation)}" target="_blank" class="maps-btn">
        <i class="fa-solid fa-diamond-turn-right"></i>
        <span>Open in Google Maps / الاتجاهات</span>
      </a>
    </div>

  </section>


  <!-- ============================================ -->
  <!-- 5. RSVP INTERACTIVE FORM                     -->
  <!-- ============================================ -->
  <section class="rsvp-section">
    <div class="rsvp-card">
      <h3 style="font-size: 28px; color: var(--gold-dark); margin-bottom: 8px;">RSVP / تأكيد الحضور</h3>
      <p style="color: #666;">Kindly confirm your attendance by November 10th</p>

      <form class="rsvp-form" onsubmit="submitRSVP(event)">
        <div>
          <label style="font-size: 13px; color: #555; display: block; margin-bottom: 4px;">Your Name / الاسم</label>
          <input type="text" id="rsvpGuestName" value="${state.guestName}" required>
        </div>

        <div>
          <label style="font-size: 13px; color: #555; display: block; margin-bottom: 4px;">Will you attend? / هل ستشرفنا بالحضور؟</label>
          <select id="rsvpAttendance">
            <option value="yes">Joyfully Accepts / يسعدني الحضور بكل سرور</option>
            <option value="regret">Regretfully Declines / للأسف أعتذر عن الحضور</option>
          </select>
        </div>

        <div>
          <label style="font-size: 13px; color: #555; display: block; margin-bottom: 4px;">Number of Guests / عدد المرافقين</label>
          <select id="rsvpGuestCount">
            <option value="1">1 Person (Just Me)</option>
            <option value="2">2 Persons</option>
            <option value="3">3 Persons</option>
            <option value="family">Family / عائلة</option>
          </select>
        </div>

        <div>
          <label style="font-size: 13px; color: #555; display: block; margin-bottom: 4px;">Warm Wish / تهنئة للعروسين</label>
          <textarea rows="3" placeholder="Write a blessing for Mohamed & Hala..."></textarea>
        </div>

        <button type="submit" class="rsvp-btn-submit">
          <i class="fa-solid fa-paper-plane"></i> Send RSVP Confirmation
        </button>

        <div id="rsvpSuccessMsg" class="rsvp-success-box">
          🎉 Thank you, ${state.guestName}! Your RSVP has been confirmed with love.
        </div>
      </form>
    </div>
  </section>

  <footer>
    <p>Honored to celebrate our special day with you • Mohamed & Hala</p>
    <p style="margin-top: 6px;">Made with <i class="fa-solid fa-heart heart-icon"></i> for Mohamed & Hala</p>
  </footer>

  <script>
    // 1. Web Audio API Procedural Wedding Melody
    let audioCtx = null;
    let isPlaying = false;
    let melodyTimer = null;

    function initWeddingAudio() {
      if (audioCtx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    // Gentle harp/piano chord sequence (D major romantic harmony)
    const chords = [
      [293.66, 369.99, 440.00, 587.33], // D maj
      [220.00, 277.18, 329.63, 440.00], // A maj
      [246.94, 293.66, 369.99, 493.88], // B min
      [196.00, 246.94, 293.66, 392.00]  // G maj
    ];

    function playNote(freq, time, duration = 1.2) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      // Envelope: gentle attack, lingering soft decay
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.08, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + duration);
    }

    function startMelodyLoop() {
      if (!audioCtx) initWeddingAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      isPlaying = true;
      document.getElementById('audioToggleBtn').classList.add('playing');
      document.getElementById('audioStatusText').textContent = 'Melody Playing';

      let chordIndex = 0;
      function scheduleNextChord() {
        if (!isPlaying) return;
        const currentChord = chords[chordIndex % chords.length];
        const now = audioCtx.currentTime;

        // Arpeggiate
        currentChord.forEach((note, idx) => {
          playNote(note, now + idx * 0.35, 2.0);
        });

        chordIndex++;
        melodyTimer = setTimeout(scheduleNextChord, 2200);
      }

      scheduleNextChord();
    }

    function stopMelody() {
      isPlaying = false;
      clearTimeout(melodyTimer);
      document.getElementById('audioToggleBtn').classList.remove('playing');
      document.getElementById('audioStatusText').textContent = 'Play Melody';
    }

    function toggleAudioMelody() {
      if (isPlaying) stopMelody();
      else startMelodyLoop();
    }

    function openEnvelopeCard() {
      if (!isPlaying) startMelodyLoop();
      
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#F7E7CE', '#E3A857']
        });
      }

      document.getElementById('splitHeartSection').scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Language Switcher
    function toggleInviteLanguage() {
      const html = document.documentElement;
      const currentDir = html.getAttribute('dir');
      const isCurrentlyRtl = currentDir === 'rtl';

      if (isCurrentlyRtl) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.getElementById('currentLangLabel').textContent = 'عربي';
      } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        document.getElementById('currentLangLabel').textContent = 'English';
      }
    }

    // 3. Scroll-Driven Split Heart Animation Engine
    const heartStage = document.getElementById('heartStage');
    const heartLeft = document.getElementById('heartHalfLeft');
    const heartRight = document.getElementById('heartHalfRight');
    const unionBadge = document.getElementById('unionStatusBadge');
    let hasTriggeredHeartCelebration = false;

    function handleHeartScroll() {
      const stageRect = heartStage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of heart section on screen (0 = below viewport, 1 = centered)
      const elementCenter = stageRect.top + stageRect.height / 2;
      const screenCenter = windowHeight / 2;
      
      // Distance from center
      const distance = elementCenter - screenCenter;
      const range = windowHeight * 0.6; // Transition range

      // Progress goes from 0 (split) to 1 (joined together)
      let progress = 1 - Math.min(Math.max(distance / range, 0), 1);

      // Interpolate positions:
      // Start: left is -100px, right is +100px
      // End: left is 0px, right is 0px
      const maxOffset = 110;
      const maxAngle = 18;
      
      const currentOffset = maxOffset * (1 - progress);
      const currentAngle = maxAngle * (1 - progress);

      heartLeft.style.transform = \`translateX(-\${currentOffset}px) rotate(-\${currentAngle}deg)\`;
      heartRight.style.transform = \`translateX(\${currentOffset}px) rotate(\${currentAngle}deg)\`;

      if (progress >= 0.95) {
        // Locked together!
        heartStage.classList.add('locked');
        unionBadge.classList.add('united');
        unionBadge.innerHTML = '<i class="fa-solid fa-heart" style="color: #e25555;"></i> Mohamed & Hala United Forever • بارك الله لهما وجمع بينهما في خير';

        if (!hasTriggeredHeartCelebration) {
          hasTriggeredHeartCelebration = true;
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 60,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#D4AF37', '#e25555', '#FCF6BA']
            });
          }
        }
      } else {
        heartStage.classList.remove('locked');
        unionBadge.classList.remove('united');
        unionBadge.innerHTML = '<i class="fa-solid fa-scroll"></i> Keep scrolling to unite the hearts...';
        hasTriggeredHeartCelebration = false;
      }
    }

    window.addEventListener('scroll', handleHeartScroll, { passive: true });
    window.addEventListener('resize', handleHeartScroll);
    handleHeartScroll();

    // 4. Countdown Timer Engine
    const targetDate = new Date('${state.weddingDate}T${state.weddingTime}').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cntDays').textContent = String(days).padStart(2, '0');
        document.getElementById('cntHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cntMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cntSeconds').textContent = String(seconds).padStart(2, '0');
      }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. RSVP Submission
    function submitRSVP(e) {
      e.preventDefault();
      const successBox = document.getElementById('rsvpSuccessMsg');
      successBox.style.display = 'block';

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }

    // 6. Floating Rose Petals / Golden Sparkles Canvas
    const canvas = document.getElementById('fxCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 2,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 2 - 1,
        color: i % 2 === 0 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(235, 178, 185, 0.4)'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  <\/script>
</body>
</html>`;
}

// ==========================================================================
// 4. LIVE PREVIEW ENGINE
// ==========================================================================

function renderPreview() {
  const iframe = document.getElementById('invitePreviewIframe');
  const generatedHtml = generateInviteHTML(inviteState);
  
  // Update iframe with new content
  const doc = iframe.contentWindow || iframe.contentDocument;
  if (doc.document) {
    doc.document.open();
    doc.document.write(generatedHtml);
    doc.document.close();
  } else {
    iframe.srcdoc = generatedHtml;
  }
}

// ==========================================================================
// 5. EXPORT & DOWNLOAD ACTIONS
// ==========================================================================

function downloadStandaloneInvite() {
  const htmlContent = generateInviteHTML(inviteState);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const sanitizedGuest = inviteState.guestName.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '_');
  const filename = `Mohamed_and_Hala_Wedding_Invite_${sanitizedGuest}.html`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`✅ Successfully downloaded ${filename}!`);
}

function copyPersonalizedLink() {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('guest', inviteState.guestName);
  currentUrl.searchParams.set('view', 'invite');
  
  navigator.clipboard.writeText(currentUrl.toString()).then(() => {
    showToast(`🔗 Copied VIP Invite link for "${inviteState.guestName}"!`);
  }).catch(() => {
    prompt('Copy VIP Invite Link:', currentUrl.toString());
  });
}

function openPreviewFullscreen() {
  const htmlContent = generateInviteHTML(inviteState);
  const win = window.open('', '_blank');
  win.document.open();
  win.document.write(htmlContent);
  win.document.close();
}

// ==========================================================================
// 6. BATCH GUEST GENERATOR
// ==========================================================================

function openBatchModal() {
  document.getElementById('batchModal').classList.remove('hidden');
}

function closeBatchModal() {
  document.getElementById('batchModal').classList.add('hidden');
}

function generateBatchLinks() {
  const textarea = document.getElementById('batchGuestsTextarea');
  const lines = textarea.value.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  if (lines.length === 0) {
    alert('Please enter at least one guest name');
    return;
  }

  const resultsContainer = document.getElementById('batchResultsContainer');
  const listEl = document.getElementById('batchLinksList');
  listEl.innerHTML = '';

  const baseUrl = new URL(window.location.href);
  baseUrl.searchParams.set('view', 'invite');

  lines.forEach(name => {
    baseUrl.searchParams.set('guest', name);
    const link = baseUrl.toString();

    const row = document.createElement('div');
    row.className = 'batch-item-link';
    row.innerHTML = `
      <span><strong>${name}</strong></span>
      <button style="background: var(--gold-primary); border: none; padding: 4px 10px; border-radius: 4px; color: #112; cursor: pointer; font-size: 11px;"
              onclick="navigator.clipboard.writeText('${link}').then(() => showToast('Copied link for ${name}!'))">
        Copy Link
      </button>
    `;
    listEl.appendChild(row);
  });

  resultsContainer.classList.remove('hidden');
}

// Toast helper
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold-primary);"></i> ${msg}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

// ==========================================================================
// 7. INITIALIZATION & QUERY PARAMETER SUPPORT
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  
  // If ?guest=... is passed in the URL
  if (params.has('guest')) {
    const passedGuest = params.get('guest');
    inviteState.guestName = passedGuest;
    const input = document.getElementById('guestNameInput');
    if (input) input.value = passedGuest;
    const label = document.getElementById('previewGuestLabel');
    if (label) label.textContent = passedGuest;
  }

  // If directly opened as invitation view: ?view=invite
  if (params.get('view') === 'invite') {
    document.body.innerHTML = generateInviteHTML(inviteState);
    return;
  }

  // Check if session was previously unlocked
  const isUnlocked = sessionStorage.getItem('portal_unlocked') === 'true';
  if (isUnlocked) {
    unlockPortal();
  }
});
