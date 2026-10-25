/**
 * Mohamed & Hala - Luxury Wedding Invite Generator Engine (Royal Edition)
 * Features:
 * - Password Gate with default 'me7299'
 * - Secret Backdoor 'wedding_pass_wedding' to change password without code edit
 * - Locked Couple Names: Mohamed & Hala
 * - Dynamic Guest Customization (Default: Mr / Sherief Mohamed)
 * - Ornate Arabic Calligraphy (Aref Ruqaa, Amiri) & Royal Serif (Cinzel Decorative, Cormorant Garamond, Great Vibes)
 * - Scroll-triggered 3D Split Heart Re-attachment animation with shockwave and filigree
 * - Procedural Web Audio API royal wedding orchestra soundtrack
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
    unlockPortal();
  } else {
    errorEl.textContent = 'Incorrect access key. Please try again.';
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
  }
}

function unlockPortal() {
  sessionStorage.setItem('portal_unlocked', 'true');
  
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FCE39E', '#AA771C', '#FFF']
    });
  }

  const modal = document.getElementById('passwordGateModal');
  const app = document.getElementById('appContainer');
  
  modal.classList.remove('active');
  document.body.classList.remove('locked-body');
  app.classList.remove('hidden');
  
  renderPreview();
  showToast('Welcome to Mohamed & Hala Royal Wedding Suite! 💍');
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
// 3. MASTERPIECE ROYAL INVITATION TEMPLATE GENERATOR
// ==========================================================================

function generateInviteHTML(state) {
  const isArabicFirst = state.lang === 'ar';
  const defaultDir = isArabicFirst ? 'rtl' : 'ltr';

  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}`);
  const dateOptionsEn = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormattedEn = eventDateObj.toLocaleDateString('en-US', dateOptionsEn);

  return `<!DOCTYPE html>
<html lang="${isArabicFirst ? 'ar' : 'en'}" dir="${defaultDir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mohamed & Hala | Royal Wedding Invitation - ${state.guestName}</title>
  
  <!-- Premium Fonts: Cinzel Decorative, Cormorant Garamond, Great Vibes, Aref Ruqaa, Amiri, Reem Kufi -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
  
  <!-- FontAwesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script>

  <style>
    :root {
      --gold-100: #FFF9E6;
      --gold-200: #FCE39E;
      --gold-300: #F3CA65;
      --gold-400: #D4AF37;
      --gold-500: #B8860B;
      --gold-gradient: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #9E7412 100%);
      --emerald-darkest: #040F0D;
      --emerald-gold-border: rgba(212, 175, 55, 0.35);
      --font-display-en: 'Cinzel Decorative', 'Cormorant Garamond', serif;
      --font-serif-en: 'Cormorant Garamond', Georgia, serif;
      --font-script-en: 'Great Vibes', 'Alex Brush', cursive;
      --font-quran-ar: 'Amiri', serif;
      --font-calligraphy-ar: 'Aref Ruqaa', 'Amiri', serif;
      --shadow-royal: 0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
      --transition-delicate: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--emerald-darkest);
      color: #E8ECEB;
      font-family: var(--font-serif-en);
      overflow-x: hidden;
      line-height: 1.7;
      background-image: 
        radial-gradient(circle at 10% 15%, rgba(212, 175, 55, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 90% 85%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(14, 41, 35, 0.8) 0%, var(--emerald-darkest) 100%);
      background-attachment: fixed;
    }

    #fxCanvas { position: fixed; inset: 0; pointer-events: none; z-index: 99; }

    .royal-floating-bar {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 999;
      display: flex;
      gap: 12px;
    }

    html[dir="rtl"] .royal-floating-bar { right: auto; left: 24px; }

    .royal-pill-btn {
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid var(--gold-400);
      color: var(--gold-200);
      padding: 10px 20px;
      border-radius: 40px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.25);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: var(--transition-delicate);
    }

    .royal-pill-btn:hover {
      background: var(--gold-gradient);
      color: #0E241F;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
    }

    .royal-pill-btn.audio-playing {
      background: rgba(212, 175, 55, 0.25);
      border-color: #FFF;
      color: #FFF;
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
    }

    .audio-wave { display: inline-flex; align-items: center; gap: 3px; height: 14px; }
    .audio-wave span {
      width: 3px; height: 100%; background: currentColor; border-radius: 2px;
      animation: waveBar 1.2s infinite ease-in-out;
    }
    .audio-wave span:nth-child(2) { animation-delay: 0.2s; }
    .audio-wave span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes waveBar {
      0%, 100% { height: 4px; }
      50% { height: 14px; }
    }

    /* 1. HERO ENVELOPE */
    .envelope-screen {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      perspective: 1200px;
    }

    .envelope-container {
      width: 100%;
      max-width: 640px;
      position: relative;
      cursor: pointer;
      transition: transform 0.6s ease;
    }

    .envelope-container:hover { transform: translateY(-5px); }

    .envelope-shell {
      position: relative;
      width: 100%;
      background: linear-gradient(145deg, #12332C 0%, #081B17 100%);
      border: 2px solid var(--gold-400);
      border-radius: 20px;
      box-shadow: var(--shadow-royal);
      padding: 55px 40px;
      text-align: center;
      overflow: hidden;
    }

    .filigree-corner {
      position: absolute;
      width: 65px;
      height: 65px;
      pointer-events: none;
      opacity: 0.85;
    }
    .filigree-top-left { top: 12px; left: 12px; }
    .filigree-top-right { top: 12px; right: 12px; transform: scaleX(-1); }
    .filigree-bottom-left { bottom: 12px; left: 12px; transform: scaleY(-1); }
    .filigree-bottom-right { bottom: 12px; right: 12px; transform: scale(-1); }

    .bismillah-calligraphy {
      font-family: var(--font-quran-ar);
      font-size: 32px;
      font-weight: 700;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }

    .quran-ayah {
      font-family: var(--font-calligraphy-ar);
      font-size: 22px;
      color: var(--gold-200);
      line-height: 2;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    .gold-separator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 20px 0;
      color: var(--gold-400);
    }
    .gold-separator::before, .gold-separator::after {
      content: '';
      height: 1px;
      flex: 1;
      background: linear-gradient(90deg, transparent, var(--gold-400), transparent);
    }

    .vip-invitation-badge {
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid var(--gold-400);
      border-radius: 12px;
      padding: 18px 24px;
      margin: 25px 0;
      box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.1);
    }

    .vip-tag {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold-300);
      display: block;
      margin-bottom: 6px;
    }

    .vip-guest-title {
      font-size: 30px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 1px;
      text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
    }

    .vip-guest-arabic {
      font-family: var(--font-calligraphy-ar);
      font-size: 24px;
      color: var(--gold-200);
      margin-top: 4px;
    }

    .grand-couple-hero { margin: 30px 0; }
    .couple-title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 25px;
      flex-wrap: wrap;
    }
    .couple-item { display: flex; flex-direction: column; }
    .couple-item .name-en {
      font-family: var(--font-display-en);
      font-size: 48px;
      font-weight: 900;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 2px;
    }
    .couple-item .name-ar {
      font-family: var(--font-calligraphy-ar);
      font-size: 38px;
      color: var(--gold-200);
      margin-top: -4px;
    }
    .couple-ampersand {
      font-family: var(--font-script-en);
      font-size: 70px;
      color: var(--gold-400);
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
      line-height: 1;
    }

    .wax-seal-wrapper { margin: 35px auto 10px; position: relative; display: inline-block; }
    .royal-wax-seal {
      width: 95px;
      height: 95px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #F5CE68, #B8860B 65%, #6E4E04);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4px solid #FDF0AA;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), inset 0 3px 6px rgba(255, 255, 255, 0.6), 0 0 30px rgba(212, 175, 55, 0.4);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation: pulseGlow 3s infinite;
    }
    .royal-wax-seal:hover { transform: scale(1.1) rotate(5deg); }
    .wax-seal-monogram {
      font-family: var(--font-script-en);
      font-size: 34px;
      font-weight: 700;
      color: #FFFDF0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
    .open-invitation-hint {
      margin-top: 14px;
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold-300);
      animation: bounceHint 2s infinite;
    }

    /* 2. SPLIT HEART SECTION */
    .heart-union-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      position: relative;
      background: radial-gradient(circle at center, rgba(14, 41, 35, 0.6) 0%, rgba(4, 15, 13, 0.95) 100%);
      border-top: 1px solid var(--emerald-gold-border);
      border-bottom: 1px solid var(--emerald-gold-border);
      overflow: hidden;
    }
    .heart-header { text-align: center; margin-bottom: 50px; max-width: 600px; }
    .heart-header h2 {
      font-family: var(--font-display-en);
      font-size: 38px;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .heart-header .arabic-quote {
      font-family: var(--font-calligraphy-ar);
      font-size: 26px;
      color: var(--gold-200);
      margin-bottom: 8px;
    }
    .heart-header p { font-size: 14px; color: #A1B5B1; }

    .heart-arena {
      position: relative;
      width: 360px;
      height: 340px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }
    .heart-half {
      position: absolute;
      top: 0;
      width: 170px;
      height: 320px;
      will-change: transform;
      transition: transform 0.1s linear, filter 0.4s ease;
    }
    .heart-half-left { left: 10px; transform-origin: right center; }
    .heart-half-right { right: 10px; transform-origin: left center; }
    .heart-filigree-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.3));
    }
    .heart-name-badge {
      position: absolute;
      top: 48%;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .heart-half-left .heart-name-badge { right: 25px; }
    .heart-half-right .heart-name-badge { left: 25px; }
    .heart-name-en {
      font-family: var(--font-script-en);
      font-size: 34px;
      font-weight: 700;
      color: #FFFDF0;
      text-shadow: 0 2px 6px rgba(0,0,0,0.8);
      line-height: 1;
    }
    .heart-name-ar {
      font-family: var(--font-calligraphy-ar);
      font-size: 22px;
      color: var(--gold-200);
      text-shadow: 0 2px 6px rgba(0,0,0,0.8);
    }

    .heart-shockwave {
      position: absolute;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 2px solid var(--gold-400);
      opacity: 0;
      pointer-events: none;
      transform: scale(0.6);
      transition: all 0.8s ease-out;
    }
    .heart-arena.united .heart-shockwave {
      opacity: 1;
      transform: scale(2.2);
      border-color: rgba(255, 255, 255, 0);
    }
    .heart-arena.united { animation: heartbeatPulse 1.4s infinite ease-in-out; }
    .heart-arena.united .heart-filigree-svg {
      filter: drop-shadow(0 0 35px rgba(212, 175, 55, 0.9)) drop-shadow(0 0 60px rgba(235, 77, 75, 0.4));
    }

    .union-ribbon {
      margin-top: 30px;
      padding: 14px 35px;
      border-radius: 50px;
      background: rgba(14, 41, 35, 0.85);
      border: 1px solid var(--gold-400);
      color: var(--gold-200);
      font-size: 16px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.4s ease;
    }
    .union-ribbon.united {
      background: var(--gold-gradient);
      color: #0E241F;
      font-weight: 700;
      box-shadow: 0 10px 40px rgba(212, 175, 55, 0.5);
      transform: scale(1.05);
    }

    /* 3. COUNTDOWN */
    .countdown-wrapper { padding: 90px 20px; text-align: center; }
    .section-ornate-title {
      font-family: var(--font-display-en);
      font-size: 34px;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 6px;
    }
    .section-arabic-subtitle {
      font-family: var(--font-calligraphy-ar);
      font-size: 24px;
      color: var(--gold-200);
      margin-bottom: 35px;
    }
    .countdown-flex {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      max-width: 700px;
      margin: 0 auto;
    }
    .countdown-dial {
      flex: 1;
      min-width: 120px;
      max-width: 150px;
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid var(--emerald-gold-border);
      border-radius: 18px;
      padding: 24px 14px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      position: relative;
    }
    .countdown-dial::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: var(--gold-gradient);
    }
    .dial-number {
      font-family: var(--font-display-en);
      font-size: 46px;
      font-weight: 700;
      color: #FFFFFF;
      display: block;
      line-height: 1;
      text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
    }
    .dial-label-en {
      font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--gold-300); margin-top: 10px; display: block;
    }
    .dial-label-ar {
      font-family: var(--font-calligraphy-ar);
      font-size: 14px; color: #A1B5B1; display: block;
    }

    /* 4. ITINERARY & VENUE */
    .itinerary-venue-section { padding: 90px 20px; max-width: 900px; margin: 0 auto; }
    .itinerary-box {
      background: rgba(14, 41, 35, 0.7);
      border: 1px solid var(--emerald-gold-border);
      border-radius: 24px;
      padding: 45px 35px;
      box-shadow: var(--shadow-royal);
      margin-bottom: 50px;
    }
    .timeline-schedule {
      display: flex; flex-direction: column; gap: 30px; position: relative; margin-top: 30px;
    }
    .timeline-schedule::before {
      content: ''; position: absolute; top: 10px; bottom: 10px; left: 28px; width: 2px;
      background: linear-gradient(180deg, var(--gold-400), rgba(212, 175, 55, 0.2));
    }
    html[dir="rtl"] .timeline-schedule::before { left: auto; right: 28px; }

    .timeline-node { display: flex; align-items: flex-start; gap: 25px; }
    .timeline-node-icon {
      width: 58px; height: 58px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #F3CA65, #B8860B);
      color: #081B17; display: flex; align-items: center; justify-content: center;
      font-size: 22px; flex-shrink: 0; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      border: 2px solid #FFF8D4; z-index: 2;
    }
    .timeline-content { flex: 1; padding-top: 6px; }
    .timeline-time-badge {
      display: inline-block; padding: 4px 12px; background: rgba(212, 175, 55, 0.15);
      border: 1px solid var(--gold-400); border-radius: 20px; color: var(--gold-200);
      font-size: 13px; font-weight: 700; margin-bottom: 6px;
    }
    .timeline-content h4 { font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; }
    .timeline-content p { font-size: 14px; color: #A1B5B1; }

    .venue-card-grand {
      background: linear-gradient(145deg, #12332C 0%, #081B17 100%);
      border: 1px solid var(--gold-400);
      border-radius: 24px;
      padding: 50px 35px;
      text-align: center;
      box-shadow: var(--shadow-royal);
    }
    .venue-icon-big { font-size: 40px; color: var(--gold-400); margin-bottom: 15px; }
    .venue-name-en { font-family: var(--font-display-en); font-size: 30px; color: #FFFFFF; margin-bottom: 6px; }
    .venue-name-ar { font-family: var(--font-calligraphy-ar); font-size: 24px; color: var(--gold-200); margin-bottom: 12px; }
    .venue-location-desc { font-size: 16px; color: #A1B5B1; margin-bottom: 30px; }

    .btn-maps {
      background: var(--gold-gradient);
      color: #081B17;
      padding: 14px 32px;
      border-radius: 40px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
      transition: var(--transition-delicate);
    }
    .btn-maps:hover { transform: translateY(-3px); }

    .vip-pass-card {
      background: rgba(8, 27, 23, 0.9);
      border: 1px dashed var(--gold-400);
      border-radius: 20px;
      padding: 30px;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }
    .vip-pass-info { text-align: left; }
    html[dir="rtl"] .vip-pass-info { text-align: right; }
    .vip-pass-info h4 { font-size: 20px; color: var(--gold-200); }
    .vip-pass-info p { font-size: 14px; color: #A1B5B1; margin-top: 4px; }
    .dress-code-swatches { display: flex; gap: 10px; margin-top: 10px; }
    .swatch {
      width: 28px; height: 28px; border-radius: 50%; border: 2px solid #FFF;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
    }

    /* 5. RSVP */
    .rsvp-wrapper { padding: 90px 20px 120px; max-width: 650px; margin: 0 auto; }
    .rsvp-card-grand {
      background: rgba(14, 41, 35, 0.85);
      border: 1px solid var(--emerald-gold-border);
      border-radius: 24px;
      padding: 45px 35px;
      box-shadow: var(--shadow-royal);
      text-align: center;
    }
    .rsvp-form-grid {
      display: flex; flex-direction: column; gap: 20px; margin-top: 30px; text-align: left;
    }
    html[dir="rtl"] .rsvp-form-grid { text-align: right; }
    .form-group-royal label {
      display: block; font-size: 13px; color: var(--gold-200); margin-bottom: 6px; font-weight: 600;
    }
    .form-group-royal input, .form-group-royal select, .form-group-royal textarea {
      width: 100%; padding: 14px 18px; background: rgba(6, 20, 17, 0.9);
      border: 1px solid var(--emerald-gold-border); border-radius: 12px; color: #FFFFFF;
      font-family: inherit; font-size: 15px; outline: none; transition: var(--transition-delicate);
    }
    .form-group-royal input:focus, .form-group-royal select:focus, .form-group-royal textarea:focus {
      border-color: var(--gold-400); box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
    }
    .btn-rsvp-submit {
      background: var(--gold-gradient); color: #081B17; border: none; padding: 16px;
      border-radius: 40px; font-size: 17px; font-weight: 700; cursor: pointer;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4); transition: var(--transition-delicate);
      display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 10px;
    }
    .btn-rsvp-submit:hover { transform: translateY(-2px); }
    .rsvp-celebration-toast {
      margin-top: 20px; padding: 18px; border-radius: 14px;
      background: rgba(39, 174, 96, 0.2); border: 1px solid #27AE60; color: #A3E4D7;
      font-weight: 600; display: none;
    }

    footer.royal-footer {
      text-align: center; padding: 60px 20px 90px; color: #7A9590; font-size: 14px;
      border-top: 1px solid rgba(212, 175, 55, 0.15);
    }
    .footer-seal {
      width: 45px; height: 45px; border-radius: 50%; background: var(--gold-gradient);
      color: #081B17; font-family: var(--font-script-en); font-size: 20px; font-weight: bold;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;
    }

    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
      50% { box-shadow: 0 0 35px rgba(212, 175, 55, 0.8); }
    }
    @keyframes bounceHint {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
      60% { transform: translateY(-4px); }
    }
    @keyframes heartbeatPulse {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1); }
      40% { transform: scale(1.02); }
      60% { transform: scale(1.08); }
    }

    @media (max-width: 650px) {
      .envelope-shell { padding: 40px 20px; }
      .couple-item .name-en { font-size: 36px; }
      .couple-item .name-ar { font-size: 28px; }
      .couple-ampersand { font-size: 45px; }
      .heart-arena { width: 300px; height: 280px; }
      .heart-half { width: 140px; height: 270px; }
      .countdown-dial { min-width: 75px; padding: 15px 8px; }
      .dial-number { font-size: 32px; }
    }
  </style>
</head>
<body>

  <div class="royal-floating-bar">
    <button class="royal-pill-btn" id="audioToggleBtn" onclick="toggleRoyalAudio()">
      <div class="audio-wave"><span></span><span></span><span></span></div>
      <span id="audioLabelText">Royal Symphony</span>
    </button>
    <button class="royal-pill-btn" onclick="toggleLanguageMode()">
      <i class="fa-solid fa-earth-americas"></i>
      <span id="langSwitchLabel">${isArabicFirst ? 'English' : 'عربي'}</span>
    </button>
  </div>

  <canvas id="fxCanvas"></canvas>

  <!-- 1. ENVELOPE -->
  <section class="envelope-screen" id="envelopeScreen">
    <div class="envelope-container" onclick="openRoyalInvitation()">
      <div class="envelope-shell">
        
        <svg class="filigree-corner filigree-top-left" viewBox="0 0 100 100">
          <path d="M5,5 L95,5 C70,25 70,70 5,95 Z" fill="none" stroke="url(#cornerGold)" stroke-width="2"/>
          <path d="M12,12 C45,20 60,35 68,68" fill="none" stroke="url(#cornerGold)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="4" fill="url(#cornerGold)"/>
        </svg>
        <svg class="filigree-corner filigree-top-right" viewBox="0 0 100 100">
          <path d="M5,5 L95,5 C70,25 70,70 5,95 Z" fill="none" stroke="url(#cornerGold)" stroke-width="2"/>
          <path d="M12,12 C45,20 60,35 68,68" fill="none" stroke="url(#cornerGold)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="4" fill="url(#cornerGold)"/>
        </svg>
        <svg class="filigree-corner filigree-bottom-left" viewBox="0 0 100 100">
          <path d="M5,5 L95,5 C70,25 70,70 5,95 Z" fill="none" stroke="url(#cornerGold)" stroke-width="2"/>
          <path d="M12,12 C45,20 60,35 68,68" fill="none" stroke="url(#cornerGold)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="4" fill="url(#cornerGold)"/>
        </svg>
        <svg class="filigree-corner filigree-bottom-right" viewBox="0 0 100 100">
          <path d="M5,5 L95,5 C70,25 70,70 5,95 Z" fill="none" stroke="url(#cornerGold)" stroke-width="2"/>
          <path d="M12,12 C45,20 60,35 68,68" fill="none" stroke="url(#cornerGold)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="4" fill="url(#cornerGold)"/>
        </svg>

        <svg style="position: absolute; width: 0; height: 0;">
          <defs>
            <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF9E6"/>
              <stop offset="50%" stop-color="#D4AF37"/>
              <stop offset="100%" stop-color="#9E7412"/>
            </linearGradient>
          </defs>
        </svg>

        <div class="quran-verse-card">
          <div class="bismillah-calligraphy">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <p class="quran-ayah">
            "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
          </p>
        </div>

        <div class="gold-separator"><span>❦</span></div>

        <div class="vip-invitation-badge">
          <span class="vip-tag"><i class="fa-solid fa-crown"></i> Royal VIP Invitation</span>
          <div class="vip-guest-title">${state.guestName}</div>
          <div class="vip-guest-arabic">مع خالص التحية والتقدير: ${state.guestName}</div>
        </div>

        <div class="grand-couple-hero">
          <div class="couple-title-row">
            <div class="couple-item">
              <span class="name-en">${state.groomEn}</span>
              <span class="name-ar">${state.groomAr}</span>
            </div>
            <span class="couple-ampersand">&</span>
            <div class="couple-item">
              <span class="name-en">${state.brideEn}</span>
              <span class="name-ar">${state.brideAr}</span>
            </div>
          </div>
        </div>

        <div class="wax-seal-wrapper">
          <div class="royal-wax-seal">
            <span class="wax-seal-monogram">M & H</span>
          </div>
        </div>
        <div class="open-invitation-hint">
          <i class="fa-solid fa-envelope-open-text"></i> Click Wax Seal to Open
        </div>

      </div>
    </div>
  </section>

  <!-- 2. SPLIT HEART SECTION -->
  <section class="heart-union-section" id="heartSection">
    <div class="heart-header">
      <h2>Two Souls United in Love</h2>
      <div class="arabic-quote">"بارك الله لهما وبارك عليهما وجمع بينهما في خير"</div>
      <p>Scroll gently to watch Mohamed & Hala's hearts join as one</p>
    </div>

    <div class="heart-arena" id="heartArena">
      <div class="heart-shockwave" id="heartShockwave"></div>

      <!-- LEFT HALF: MOHAMED -->
      <div class="heart-half heart-half-left" id="heartHalfLeft">
        <svg class="heart-filigree-svg" viewBox="0 0 170 320">
          <defs>
            <linearGradient id="goldFiligreeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D4"/>
              <stop offset="40%" stop-color="#D4AF37"/>
              <stop offset="85%" stop-color="#8C650A"/>
              <stop offset="100%" stop-color="#5C1D24"/>
            </linearGradient>
            <linearGradient id="rubyShineLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#80101F"/>
              <stop offset="100%" stop-color="#C2273F"/>
            </linearGradient>
          </defs>
          <path d="M168,310 C168,310 12,210 6,105 C0,35 50,6 108,6 C142,6 165,28 168,52 Z" 
                fill="url(#rubyShineLeft)" stroke="url(#goldFiligreeLeft)" stroke-width="4"/>
          <path d="M165,270 C140,220 30,160 25,105 C20,55 58,24 105,24 C135,24 155,42 165,65" 
                fill="none" stroke="url(#goldFiligreeLeft)" stroke-width="2.5" stroke-dasharray="4,2"/>
          <path d="M165,220 C145,180 55,140 50,105 C46,75 75,50 110,50" 
                fill="none" stroke="url(#goldFiligreeLeft)" stroke-width="2"/>
          <path d="M110,6 L120,-8 L135,2 L150,-10 L165,6 Z" fill="url(#goldFiligreeLeft)"/>
        </svg>

        <div class="heart-name-badge">
          <span class="heart-name-en">${state.groomEn}</span>
          <span class="heart-name-ar">${state.groomAr}</span>
        </div>
      </div>

      <!-- RIGHT HALF: HALA -->
      <div class="heart-half heart-half-right" id="heartHalfRight">
        <svg class="heart-filigree-svg" viewBox="0 0 170 320">
          <defs>
            <linearGradient id="goldFiligreeRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D4"/>
              <stop offset="40%" stop-color="#D4AF37"/>
              <stop offset="85%" stop-color="#8C650A"/>
              <stop offset="100%" stop-color="#5C1D24"/>
            </linearGradient>
            <linearGradient id="rubyShineRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#80101F"/>
              <stop offset="100%" stop-color="#C2273F"/>
            </linearGradient>
          </defs>
          <path d="M2,310 C2,310 158,210 164,105 C170,35 120,6 62,6 C28,6 5,28 2,52 Z" 
                fill="url(#rubyShineRight)" stroke="url(#goldFiligreeRight)" stroke-width="4"/>
          <path d="M5,270 C30,220 140,160 145,105 C150,55 112,24 65,24 C35,24 15,42 5,65" 
                fill="none" stroke="url(#goldFiligreeRight)" stroke-width="2.5" stroke-dasharray="4,2"/>
          <path d="M5,220 C25,180 115,140 120,105 C124,75 95,50 60,50" 
                fill="none" stroke="url(#goldFiligreeRight)" stroke-width="2"/>
          <path d="M60,6 L50,-8 L35,2 L20,-10 L5,6 Z" fill="url(#goldFiligreeRight)"/>
        </svg>

        <div class="heart-name-badge">
          <span class="heart-name-en">${state.brideEn}</span>
          <span class="heart-name-ar">${state.brideAr}</span>
        </div>
      </div>
    </div>

    <div class="union-ribbon" id="unionRibbon">
      <i class="fa-solid fa-scroll"></i>
      <span id="unionRibbonText">Scroll to bring Mohamed & Hala together...</span>
    </div>
  </section>

  <!-- 3. COUNTDOWN -->
  <section class="countdown-wrapper">
    <h3 class="section-ornate-title"><i class="fa-regular fa-clock"></i> The Celebration Countdown</h3>
    <div class="section-arabic-subtitle">العد التنازلي لليلة العمر</div>

    <div class="countdown-flex">
      <div class="countdown-dial">
        <span class="dial-number" id="dialDays">00</span>
        <span class="dial-label-en">Days</span>
        <span class="dial-label-ar">أيام</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialHours">00</span>
        <span class="dial-label-en">Hours</span>
        <span class="dial-label-ar">ساعات</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialMinutes">00</span>
        <span class="dial-label-en">Minutes</span>
        <span class="dial-label-ar">دقائق</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialSeconds">00</span>
        <span class="dial-label-en">Seconds</span>
        <span class="dial-label-ar">ثواني</span>
      </div>
    </div>
  </section>

  <!-- 4. ITINERARY & VENUE -->
  <section class="itinerary-venue-section">
    <div class="itinerary-box">
      <h3 class="section-ornate-title" style="text-align: center;"><i class="fa-solid fa-champagne-glasses"></i> Order of Celebration</h3>
      <div class="section-arabic-subtitle" style="text-align: center;">برنامج الحفل والمراسم</div>

      <div class="timeline-schedule">
        <div class="timeline-node">
          <div class="timeline-node-icon"><i class="fa-solid fa-door-open"></i></div>
          <div class="timeline-content">
            <span class="timeline-time-badge">06:00 PM</span>
            <h4>Guest Reception & Harp Music (استقبال الضيوف)</h4>
            <p>Welcoming our beloved guests with drinks & live royal harp performance</p>
          </div>
        </div>

        <div class="timeline-node">
          <div class="timeline-node-icon"><i class="fa-solid fa-heart"></i></div>
          <div class="timeline-content">
            <span class="timeline-time-badge">07:00 PM</span>
            <h4>Grand Zaffa & Royal Entrance (زفة العروسين)</h4>
            <p>Welcoming Mohamed & Hala to the Grand Ballroom with traditional fanfare</p>
          </div>
        </div>

        <div class="timeline-node">
          <div class="timeline-node-icon"><i class="fa-solid fa-utensils"></i></div>
          <div class="timeline-content">
            <span class="timeline-time-badge">08:30 PM</span>
            <h4>Royal Dinner Banquet (مأدبة العشاء الفاخرة)</h4>
            <p>An exquisite culinary feast prepared by royal executive chefs</p>
          </div>
        </div>

        <div class="timeline-node">
          <div class="timeline-node-icon"><i class="fa-solid fa-cake-candles"></i></div>
          <div class="timeline-content">
            <span class="timeline-time-badge">10:00 PM</span>
            <h4>Cake Cutting & Celebration (تقطيع التورتة والاحتفال)</h4>
            <p>Dancing, joyful memories, and honoring our guests</p>
          </div>
        </div>
      </div>
    </div>

    <div class="venue-card-grand">
      <div class="venue-icon-big"><i class="fa-solid fa-landmark"></i></div>
      <h3 class="venue-name-en">${state.venueName}</h3>
      <h4 class="venue-name-ar">قاعة الاحتفالات الملكية - فندق فور سيزونز</h4>
      <p class="venue-location-desc">${state.venueLocation} • Date: ${dateFormattedEn} at ${state.weddingTime}</p>

      <div class="venue-action-btns">
        <a href="https://maps.google.com/?q=${encodeURIComponent(state.venueName + ' ' + state.venueLocation)}" target="_blank" class="btn-maps">
          <i class="fa-solid fa-location-arrow"></i>
          <span>Open in Google Maps / الاتجاهات</span>
        </a>
      </div>

      <div class="vip-pass-card">
        <div class="vip-pass-info">
          <h4><i class="fa-solid fa-user-tie"></i> Dress Code: Black Tie / Formal</h4>
          <p>We invite you to wear our royal palette: Emerald, Champagne & Gold</p>
          <div class="dress-code-swatches">
            <div class="swatch" style="background: #081B17;" title="Deep Emerald"></div>
            <div class="swatch" style="background: #D4AF37;" title="Royal Gold"></div>
            <div class="swatch" style="background: #FAF7F2;" title="Champagne Ivory"></div>
            <div class="swatch" style="background: #5C1D24;" title="Velvet Wine"></div>
          </div>
        </div>
        <div class="vip-qr-badge" style="text-align: center;">
          <i class="fa-solid fa-qrcode" style="font-size: 60px; color: var(--gold-400);"></i>
          <span style="display: block; font-size: 11px; color: var(--gold-300); margin-top: 4px;">VIP ENTRY PASS</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. RSVP -->
  <section class="rsvp-wrapper">
    <div class="rsvp-card-grand">
      <h3 class="section-ornate-title">RSVP / تأكيد الحضور</h3>
      <div class="section-arabic-subtitle">يسعدنا ويشرفنا حضوركم الكريم</div>
      <p style="color: #A1B5B1; font-size: 14px;">Kindly confirm your attendance by November 10th</p>

      <form class="rsvp-form-grid" onsubmit="handleRoyalRSVP(event)">
        <div class="form-group-royal">
          <label>Honored Guest Name / اسم الضيف الكريم</label>
          <input type="text" id="rsvpGuestInput" value="${state.guestName}" required>
        </div>

        <div class="form-group-royal">
          <label>Attendance Status / هل ستشرفنا بالحضور؟</label>
          <select id="rsvpStatus">
            <option value="accept">Joyfully Accepts / يسعدني ويشرفني الحضور بكل سرور ✨</option>
            <option value="decline">Regretfully Declines / للأسف أعتذر لظروف خاصة</option>
          </select>
        </div>

        <div class="form-group-royal">
          <label>Number of Guests / عدد المرافقين</label>
          <select id="rsvpCount">
            <option value="1">1 Person (VIP Pass)</option>
            <option value="2">2 Persons</option>
            <option value="family">Family Table / عائلة</option>
          </select>
        </div>

        <div class="form-group-royal">
          <label>Special Blessing for Mohamed & Hala / كلمة طيبة للعروسين</label>
          <textarea rows="3" placeholder="اكتب دعوة مباركة لمحمد وهالة..."></textarea>
        </div>

        <button type="submit" class="btn-rsvp-submit">
          <i class="fa-solid fa-paper-plane"></i>
          <span>Send Royal RSVP / تأكيد الحضور</span>
        </button>

        <div id="rsvpToast" class="rsvp-celebration-toast">
          💐 بارك الله فيك! تم تأكيد حضورك بنجاح. ننتظرك بكل حب وفرح!
        </div>
      </form>
    </div>
  </section>

  <footer class="royal-footer">
    <div class="footer-seal">M & H</div>
    <p>Mohamed & Hala Royal Wedding Celebration • زفاف محمد & هالة</p>
    <p style="font-size: 12px; margin-top: 6px; color: #58726E;">Created with love & elegance for ${state.guestName}</p>
  </footer>

  <script>
    // Audio Symphony
    let audioCtx = null;
    let isPlaying = false;
    let musicInterval = null;

    function initAudio() {
      if (audioCtx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    const harmonicProgression = [
      { bass: 146.83, chord: [293.66, 369.99, 440.00, 587.33] },
      { bass: 110.00, chord: [220.00, 277.18, 329.63, 440.00] },
      { bass: 123.47, chord: [246.94, 293.66, 369.99, 493.88] },
      { bass: 92.50,  chord: [185.00, 233.08, 277.18, 369.99] },
      { bass: 98.00,  chord: [196.00, 246.94, 293.66, 392.00] },
      { bass: 146.83, chord: [293.66, 369.99, 440.00, 587.33] }
    ];

    function playTone(freq, startTime, duration, type = 'sine', volume = 0.05) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    }

    function startSymphony() {
      if (!audioCtx) initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      isPlaying = true;
      document.getElementById('audioToggleBtn').classList.add('audio-playing');
      document.getElementById('audioLabelText').textContent = 'Symphony Playing';

      let step = 0;
      function nextBar() {
        if (!isPlaying) return;
        const now = audioCtx.currentTime;
        const current = harmonicProgression[step % harmonicProgression.length];
        playTone(current.bass, now, 3.0, 'sine', 0.07);
        current.chord.forEach((freq, idx) => {
          playTone(freq, now + idx * 0.38, 2.2, 'triangle', 0.06);
          if (idx % 2 === 0) playTone(freq * 2, now + idx * 0.38 + 0.1, 1.2, 'sine', 0.02);
        });
        step++;
        musicInterval = setTimeout(nextBar, 2400);
      }
      nextBar();
    }

    function stopSymphony() {
      isPlaying = false;
      clearTimeout(musicInterval);
      document.getElementById('audioToggleBtn').classList.remove('audio-playing');
      document.getElementById('audioLabelText').textContent = 'Royal Symphony';
    }

    function toggleRoyalAudio() {
      if (isPlaying) stopSymphony();
      else startSymphony();
    }

    function openRoyalInvitation() {
      if (!isPlaying) startSymphony();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF9E6', '#B8860B', '#B82538']
        });
      }
      document.getElementById('heartSection').scrollIntoView({ behavior: 'smooth' });
    }

    function toggleLanguageMode() {
      const html = document.documentElement;
      const currentDir = html.getAttribute('dir');
      const isArabic = currentDir === 'rtl';
      if (isArabic) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.getElementById('langSwitchLabel').textContent = 'عربي';
      } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        document.getElementById('langSwitchLabel').textContent = 'English';
      }
    }

    // Split Heart Scroll
    const heartArena = document.getElementById('heartArena');
    const heartLeft = document.getElementById('heartHalfLeft');
    const heartRight = document.getElementById('heartHalfRight');
    const unionRibbon = document.getElementById('unionRibbon');
    let hasUnitedTriggered = false;

    function evaluateHeartScroll() {
      const rect = heartArena.getBoundingClientRect();
      const windowH = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowH / 2;
      const dist = elementCenter - viewportCenter;
      const range = windowH * 0.55;

      let progress = 1 - Math.min(Math.max(dist / range, 0), 1);
      const maxOffset = 130;
      const maxAngle = 20;

      const currentOffset = maxOffset * (1 - progress);
      const currentAngle = maxAngle * (1 - progress);

      heartLeft.style.transform = \`translateX(-\${currentOffset}px) rotate(-\${currentAngle}deg)\`;
      heartRight.style.transform = \`translateX(\${currentOffset}px) rotate(\${currentAngle}deg)\`;

      if (progress >= 0.94) {
        heartArena.classList.add('united');
        unionRibbon.classList.add('united');
        unionRibbon.innerHTML = '<i class="fa-solid fa-heart" style="color: #e74c3c;"></i> Mohamed & Hala United Forever • بارك الله لهما وجمع بينهما في خير';
        if (!hasUnitedTriggered) {
          hasUnitedTriggered = true;
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#D4AF37', '#FFF8D4', '#B82538', '#E3A857']
            });
          }
        }
      } else {
        heartArena.classList.remove('united');
        unionRibbon.classList.remove('united');
        unionRibbon.innerHTML = '<i class="fa-solid fa-scroll"></i> Scroll to bring Mohamed & Hala together...';
        hasUnitedTriggered = false;
      }
    }

    window.addEventListener('scroll', evaluateHeartScroll, { passive: true });
    window.addEventListener('resize', evaluateHeartScroll);
    evaluateHeartScroll();

    // Countdown
    const weddingTargetTime = new Date('${state.weddingDate}T${state.weddingTime}:00').getTime();
    function refreshCountdown() {
      const now = new Date().getTime();
      const diff = weddingTargetTime - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('dialDays').textContent = String(days).padStart(2, '0');
        document.getElementById('dialHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('dialMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('dialSeconds').textContent = String(seconds).padStart(2, '0');
      }
    }
    setInterval(refreshCountdown, 1000);
    refreshCountdown();

    function handleRoyalRSVP(e) {
      e.preventDefault();
      document.getElementById('rsvpToast').style.display = 'block';
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 }, colors: ['#D4AF37', '#27AE60', '#FFF'] });
      }
    }

    // Canvas
    const canvas = document.getElementById('fxCanvas');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        size: Math.random() * 4 + 2,
        speedY: Math.random() * 1.0 + 0.5, speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360, rotSpeed: Math.random() * 2 - 1,
        color: i % 2 === 0 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(184, 37, 56, 0.35)'
      });
    }

    function renderDust() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotSpeed;
        if (p.y > h) { p.y = -10; p.x = Math.random() * w; }
      });
      requestAnimationFrame(renderDust);
    }
    renderDust();
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
  const filename = `Mohamed_and_Hala_Royal_Invite_${sanitizedGuest}.html`;

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
  
  if (params.has('guest')) {
    const passedGuest = params.get('guest');
    inviteState.guestName = passedGuest;
    const input = document.getElementById('guestNameInput');
    if (input) input.value = passedGuest;
    const label = document.getElementById('previewGuestLabel');
    if (label) label.textContent = passedGuest;
  }

  if (params.get('view') === 'invite') {
    document.body.innerHTML = generateInviteHTML(inviteState);
    return;
  }

  const isUnlocked = sessionStorage.getItem('portal_unlocked') === 'true';
  if (isUnlocked) {
    unlockPortal();
  }
});
