/**
 * Royal Wedding Invitation Studio & Generator Engine
 * 100% Coded Luxury Card Builder Architecture
 * Features:
 * - 8 Unique Coded Card Archetypes (Acrylic Arch, Emerald Velvet, Deckle Edge, Burgundy Baroque, Moroccan Arch, Minimalist, Celestial Navy, Blush Botanical)
 * - Names & Details rendered directly INSIDE the coded card
 * - Fully customizable Groom, Bride, Guest, Host, Date, Venue, Verse, and Itinerary
 * - Interactive 3D Wax Seal Stamp with custom monogram
 * - Web Audio API Procedural Royal Symphony
 * - 1-Click Standalone HTML Card Exporter
 */

const DEFAULT_PASSWORD = 'me7299';
const SECRET_BACKDOOR = 'wedding_pass_wedding';
const STORAGE_PASS_KEY = 'wedding_invite_site_pass';

// Studio State
const cardStudioState = {
  activeStyle: 'acrylic-arch', // acrylic-arch | emerald-velvet | deckle-edge | burgundy-baroque | moroccan-arch | minimalist-arch | midnight-celestial | blush-botanical
  groomEn: 'Mohamed',
  groomAr: 'محمد',
  brideEn: 'Hala',
  brideAr: 'هالة',
  guestEn: 'Mr / Sherief Mohamed',
  guestAr: 'السيد / شريف محمد',
  verseText: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  hostLine: 'Together with their families, joyfully invite you to celebrate the marriage of',
  weddingDate: '2026-11-20',
  weddingTime: '18:00',
  venueNameEn: 'The Royal Ballroom, Four Seasons Hotel',
  venueNameAr: 'قاعة الاحتفالات الملكية - فندق فور سيزونز',
  venueAddress: 'Nile Plaza, Garden City, Cairo, Egypt',
  venueMapLink: 'https://maps.google.com/?q=The+Royal+Ballroom+Four+Seasons+Hotel+Nile+Plaza+Cairo',
  itinerary: [
    { time: '06:00 PM', desc: 'Guest Reception & Welcome Drinks' },
    { time: '07:00 PM', desc: 'Grand Entrance & Royal Zaffa' },
    { time: '08:30 PM', desc: 'Royal Dinner Banquet Feast' },
    { time: '10:00 PM', desc: 'Cake Cutting & Celebration' }
  ],
  waxSealMonogram: 'M & H',
  waxSealColor: 'gold',
  audioStyle: 'symphony',
  enablePetals: true,
  enableCountdown: true,
  enableRSVP: true
};

const STYLE_NAMES = {
  'acrylic-arch': 'Modern Arched Frosted Acrylic',
  'emerald-velvet': 'Royal Emerald Velvet & Gold Foil',
  'deckle-edge': 'Deckle Edge Paper & Silk Wax Seal',
  'burgundy-baroque': 'Velvet Burgundy Baroque Crest',
  'moroccan-arch': 'Moroccan Arabesque Horseshoe Arch',
  'minimalist-arch': 'Minimalist Modern Editorial Arch',
  'midnight-celestial': 'Celestial Midnight Navy & Star Gold',
  'blush-botanical': 'Romantic Blush & Rose Gold Botanical'
};

// ==========================================================================
// 1. PASSWORD GATE & ADMIN BACKDOOR
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

  if (val === SECRET_BACKDOOR) {
    adminPanel.classList.remove('hidden');
    input.value = '';
    showToast('✨ Master Admin Backdoor Unlocked! You can set a new password below.');
    return;
  }

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
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF8D4', '#B8860B']
    });
  }

  document.getElementById('passwordGateModal').classList.remove('active');
  document.body.classList.remove('locked-body');
  document.getElementById('appContainer').classList.remove('hidden');

  renderCardPreview();
  showToast('Welcome to Royal Wedding Invitation Studio! 💍✨');
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
  document.getElementById('adminSuccessMsg').textContent = `Password reset to default ("${DEFAULT_PASSWORD}")`;
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
  const newPass = prompt('Enter new access password for the studio:');
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
// 2. TAB NAVIGATION & STYLE SELECTION
// ==========================================================================
function switchSidebarTab(tabName) {
  document.querySelectorAll('.sidebar-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  if (tabName === 'styles') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[0].classList.add('active');
    document.getElementById('tabContentStyles').classList.add('active');
  } else if (tabName === 'names') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[1].classList.add('active');
    document.getElementById('tabContentNames').classList.add('active');
  } else if (tabName === 'event') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[2].classList.add('active');
    document.getElementById('tabContentEvent').classList.add('active');
  } else if (tabName === 'finishing') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[3].classList.add('active');
    document.getElementById('tabContentFinishing').classList.add('active');
  }
}

function selectCardStyle(styleKey) {
  cardStudioState.activeStyle = styleKey;
  
  document.querySelectorAll('.style-choice-card').forEach(card => card.classList.remove('active'));
  const activeEl = document.getElementById(`cardStyle_${styleKey}`);
  if (activeEl) activeEl.classList.add('active');

  const styleName = STYLE_NAMES[styleKey] || styleKey;
  document.getElementById('previewActiveStyleLabel').textContent = styleName;

  renderCardPreview();
  showToast(`✨ Switched to Coded Architecture: ${styleName}`);
}

function updateAllCardData() {
  cardStudioState.groomEn = document.getElementById('groomEnInput').value.trim() || 'Mohamed';
  cardStudioState.groomAr = document.getElementById('groomArInput').value.trim() || 'محمد';
  cardStudioState.brideEn = document.getElementById('brideEnInput').value.trim() || 'Hala';
  cardStudioState.brideAr = document.getElementById('brideArInput').value.trim() || 'هالة';
  cardStudioState.guestEn = document.getElementById('guestNameInput').value.trim() || 'Honored Guest';
  cardStudioState.guestAr = document.getElementById('guestNameArInput').value.trim() || 'الضيف الكريم';
  cardStudioState.verseText = document.getElementById('customVerseTextarea').value.trim();
  cardStudioState.hostLine = document.getElementById('hostLineInput').value.trim();
  cardStudioState.weddingDate = document.getElementById('eventDateInput').value;
  cardStudioState.weddingTime = document.getElementById('eventTimeInput').value;
  cardStudioState.venueNameEn = document.getElementById('venueNameEnInput').value.trim();
  cardStudioState.venueNameAr = document.getElementById('venueNameArInput').value.trim();
  cardStudioState.venueAddress = document.getElementById('venueAddressInput').value.trim();
  cardStudioState.venueMapLink = document.getElementById('venueMapLinkInput').value.trim();

  // Read Itinerary items
  const itinItems = [];
  document.querySelectorAll('.itinerary-edit-item').forEach(item => {
    const time = item.querySelector('.itin-time').value.trim();
    const desc = item.querySelector('.itin-desc').value.trim();
    if (time && desc) itinItems.push({ time, desc });
  });
  if (itinItems.length > 0) cardStudioState.itinerary = itinItems;

  cardStudioState.waxSealMonogram = document.getElementById('waxSealMonogramInput').value.trim() || 'M & H';
  cardStudioState.waxSealColor = document.getElementById('waxSealColorSelect').value;
  cardStudioState.audioStyle = document.getElementById('audioStyleSelect').value;
  cardStudioState.enablePetals = document.getElementById('petalsToggle').checked;
  cardStudioState.enableCountdown = document.getElementById('countdownToggle').checked;
  cardStudioState.enableRSVP = document.getElementById('rsvpToggle').checked;

  renderCardPreview();
}

function setGuestPreset(en, ar) {
  document.getElementById('guestNameInput').value = en;
  document.getElementById('guestNameArInput').value = ar;
  updateAllCardData();
}

function applyVersePreset(val) {
  const textarea = document.getElementById('customVerseTextarea');
  if (val === 'ayah1') {
    textarea.value = '"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"';
  } else if (val === 'ayah2') {
    textarea.value = '"بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"';
  } else if (val === 'quote1') {
    textarea.value = '"Two souls with but a single thought, two hearts that beat as one."';
  }
  updateAllCardData();
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
// 3. MASTER CODED INVITATION CARD ARCHITECTURE GENERATOR
// ==========================================================================
function generateCodedCardHTML(state) {
  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}:00`);
  const dateFormattedEn = eventDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const dateFormattedAr = eventDateObj.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Wax seal color variables
  let sealBg = 'radial-gradient(circle at 35% 30%, #F5CE68, #B8860B 65%, #6E4E04)';
  let sealBorder = '#FDF0AA';
  if (state.waxSealColor === 'ruby') {
    sealBg = 'radial-gradient(circle at 35% 30%, #E74C3C, #922B21 65%, #4A120E)';
    sealBorder = '#F5B7B1';
  } else if (state.waxSealColor === 'emerald') {
    sealBg = 'radial-gradient(circle at 35% 30%, #2ECC71, #145A32 65%, #0B331C)';
    sealBorder = '#A9DFBF';
  } else if (state.waxSealColor === 'pearl') {
    sealBg = 'radial-gradient(circle at 35% 30%, #FADBD8, #D98880 65%, #78281F)';
    sealBorder = '#FDEBD0';
  }

  const itineraryHTML = state.itinerary.map(item => `
    <div class="itinerary-pill-item">
      <span class="itinerary-pill-time">${item.time}</span>
      <span class="itinerary-pill-desc">${item.desc}</span>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.groomEn} & ${state.brideEn} | Wedding Invitation - ${state.guestEn}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script>

  <style>
    /* -------------------------------------------------------------
       CORE DESIGN TOKENS
       ------------------------------------------------------------- */
    :root {
      --gold-primary: #D4AF37;
      --gold-foil: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #9E7412 100%);
      --gold-shimmer: linear-gradient(90deg, #D4AF37, #FFF9E6, #D4AF37);
      --font-display-en: 'Cinzel Decorative', 'Cormorant Garamond', serif;
      --font-serif-en: 'Cormorant Garamond', Georgia, serif;
      --font-script-en: 'Great Vibes', 'Alex Brush', cursive;
      --font-quran-ar: 'Amiri', serif;
      --font-calligraphy-ar: 'Aref Ruqaa', 'Amiri', serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #06110F;
      color: #E8ECEB;
      font-family: var(--font-serif-en);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 16px 80px;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 40%);
    }

    #fxCanvas { position: fixed; inset: 0; pointer-events: none; z-index: 99; }

    /* Top Floating Controls */
    .top-action-bar {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
      display: flex;
      gap: 10px;
    }
    .top-btn {
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid var(--gold-primary);
      color: #FFF9E6;
      padding: 8px 16px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
    }
    .top-btn:hover { background: var(--gold-foil); color: #081B17; transform: translateY(-2px); }

    /* -------------------------------------------------------------
       THE INVITATION CARD CONTAINER & 8 CODED ARCHITECTURES
       ------------------------------------------------------------- */
    .card-stage-wrapper {
      width: 100%;
      max-width: 580px;
      margin: 20px auto 40px;
      perspective: 1200px;
    }

    .invitation-coded-card {
      position: relative;
      width: 100%;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.2);
      padding: 55px 35px;
      text-align: center;
      overflow: hidden;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* =============================================================
       STYLE 1: MODERN ARCHED FROSTED ACRYLIC
       ============================================================= */
    .style-acrylic-arch {
      border-radius: 260px 260px 20px 20px;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border: 2px solid rgba(212, 175, 55, 0.6);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1);
    }
    .style-acrylic-arch::before {
      content: '';
      position: absolute;
      inset: 12px;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 245px 245px 12px 12px;
      pointer-events: none;
    }

    /* =============================================================
       STYLE 2: ROYAL EMERALD VELVET & GOLD FOIL
       ============================================================= */
    .style-emerald-velvet {
      border-radius: 20px;
      background: radial-gradient(circle at 50% 30%, #0E362C 0%, #071C17 70%, #03100D 100%);
      border: 3px double var(--gold-primary);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(212, 175, 55, 0.15);
    }
    .style-emerald-velvet::before {
      content: '';
      position: absolute;
      inset: 10px;
      border: 1px dashed rgba(212, 175, 55, 0.5);
      border-radius: 12px;
      pointer-events: none;
    }

    /* =============================================================
       STYLE 3: DECKLE EDGE COTTON PAPER & SILK WAX SEAL
       ============================================================= */
    .style-deckle-edge {
      border-radius: 4px;
      background: #FAF6F0;
      color: #2D2319;
      border: 1px solid #E6D8C3;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), inset 0 0 50px rgba(184, 134, 11, 0.08);
      filter: contrast(102%);
    }
    .style-deckle-edge .card-quran-ayah { color: #8A6214 !important; }
    .style-deckle-edge .card-couple-en { color: #8A6214 !important; -webkit-text-fill-color: initial !important; }
    .style-deckle-edge .card-guest-title { color: #1B150F !important; }

    /* Silk ribbon hanging down */
    .deckle-silk-ribbon {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 100%;
      background: linear-gradient(90deg, #E8A87C, #F4D3C4, #D98880);
      opacity: 0.85;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      pointer-events: none;
      z-index: 1;
    }

    /* =============================================================
       STYLE 4: VELVET BURGUNDY BAROQUE CREST
       ============================================================= */
    .style-burgundy-baroque {
      border-radius: 24px;
      background: radial-gradient(circle at 50% 30%, #5A121D 0%, #3D0C13 65%, #24050A 100%);
      border: 2px solid var(--gold-primary);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
    }
    .style-burgundy-baroque::before {
      content: '';
      position: absolute;
      inset: 12px;
      border: 2px solid rgba(212, 175, 55, 0.4);
      border-radius: 16px;
      pointer-events: none;
    }

    /* =============================================================
       STYLE 5: MOROCCAN ARABESQUE HORSESHOE ARCH
       ============================================================= */
    .style-moroccan-arch {
      border-radius: 200px 200px 16px 16px;
      background: linear-gradient(160deg, #0D2620 0%, #04100D 100%);
      border: 2px solid var(--gold-primary);
    }
    .style-moroccan-arch::before {
      content: '';
      position: absolute;
      inset: 12px;
      border: 1px solid rgba(212, 175, 55, 0.5);
      border-radius: 188px 188px 8px 8px;
      pointer-events: none;
    }

    /* =============================================================
       STYLE 6: MINIMALIST MODERN EDITORIAL ARCH
       ============================================================= */
    .style-minimalist-arch {
      border-radius: 220px 220px 8px 8px;
      background: #FAF7F2;
      color: #171717;
      border: 1.5px solid #D8CEBE;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }
    .style-minimalist-arch .card-quran-ayah { color: #666 !important; }
    .style-minimalist-arch .card-couple-en {
      font-family: 'Playfair Display', serif !important;
      color: #111 !important;
      -webkit-text-fill-color: initial !important;
      font-size: 38px !important;
      letter-spacing: 3px !important;
    }
    .style-minimalist-arch .card-guest-title { color: #111 !important; }

    /* =============================================================
       STYLE 7: CELESTIAL MIDNIGHT NAVY & STAR GOLD
       ============================================================= */
    .style-midnight-celestial {
      border-radius: 20px;
      background: radial-gradient(circle at 50% 20%, #0F2042 0%, #081226 60%, #030712 100%);
      border: 2px solid var(--gold-primary);
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(30, 80, 160, 0.2);
    }
    .style-midnight-celestial::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, #D4AF37 1.2px, transparent 1.2px);
      background-size: 24px 24px;
      opacity: 0.35;
      pointer-events: none;
    }

    /* =============================================================
       STYLE 8: ROMANTIC BLUSH & ROSE GOLD BOTANICAL
       ============================================================= */
    .style-blush-botanical {
      border-radius: 24px;
      background: linear-gradient(145deg, #FFF6F5 0%, #F8E6E4 100%);
      color: #4A2E2B;
      border: 2px solid #E5AA9C;
      box-shadow: 0 25px 60px rgba(180, 100, 90, 0.2);
    }
    .style-blush-botanical .card-quran-ayah { color: #8C534D !important; }
    .style-blush-botanical .card-couple-en {
      background: linear-gradient(135deg, #C26D60, #E5AA9C, #A04D40) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
    }
    .style-blush-botanical .card-guest-title { color: #361E1C !important; }

    /* -------------------------------------------------------------
       ELEMENTS INSIDE THE CODED INVITATION CARD
       ------------------------------------------------------------- */
    .card-content-inner {
      position: relative;
      z-index: 2;
    }

    .card-header-crest {
      width: 50px;
      height: 50px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: var(--gold-primary);
      filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4));
    }

    .card-bismillah {
      font-family: var(--font-quran-ar);
      font-size: 28px;
      font-weight: 700;
      background: var(--gold-foil);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }

    .card-quran-ayah {
      font-family: var(--font-calligraphy-ar);
      font-size: 20px;
      color: var(--gold-primary);
      line-height: 1.8;
      margin-bottom: 20px;
      padding: 0 10px;
    }

    .card-host-line {
      font-size: 13px;
      letter-spacing: 1px;
      opacity: 0.85;
      margin-bottom: 20px;
    }

    /* VIP Guest Certificate Box inside Card */
    .card-vip-guest-box {
      margin: 22px auto;
      padding: 14px 20px;
      border-top: 1px solid rgba(212, 175, 55, 0.5);
      border-bottom: 1px solid rgba(212, 175, 55, 0.5);
      display: inline-block;
      max-width: 90%;
    }

    .card-vip-tag {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold-primary);
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
    }

    .card-guest-title {
      font-size: 28px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 1px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    .card-guest-arabic {
      font-family: var(--font-calligraphy-ar);
      font-size: 22px;
      color: var(--gold-primary);
      margin-top: 2px;
    }

    /* Couple Names inside Card */
    .card-couple-block {
      margin: 25px 0;
    }

    .card-couple-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    .card-couple-item {
      display: flex;
      flex-direction: column;
    }

    .card-couple-en {
      font-family: var(--font-script-en);
      font-size: 48px;
      font-weight: 700;
      background: var(--gold-foil);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
      filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3));
    }

    .card-couple-ar {
      font-family: var(--font-calligraphy-ar);
      font-size: 32px;
      color: var(--gold-primary);
      margin-top: -6px;
    }

    .card-ampersand {
      font-family: var(--font-display-en);
      font-size: 36px;
      color: var(--gold-primary);
      opacity: 0.8;
    }

    /* Date & Venue inside Card */
    .card-event-date-row {
      margin: 20px 0 10px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .card-venue-title {
      font-family: var(--font-display-en);
      font-size: 20px;
      font-weight: 700;
      color: var(--gold-primary);
      margin-bottom: 4px;
    }

    .card-venue-address {
      font-size: 13px;
      opacity: 0.8;
      margin-bottom: 25px;
    }

    /* 3D Wax Seal Stamp directly on the Card */
    .card-wax-seal-stamp {
      width: 85px;
      height: 85px;
      margin: 25px auto 10px;
      border-radius: 50%;
      background: ${sealBg};
      border: 3px solid ${sealBorder};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .card-wax-seal-stamp:hover { transform: scale(1.08) rotate(4deg); }
    .card-wax-seal-monogram {
      font-family: var(--font-script-en);
      font-size: 30px;
      font-weight: bold;
      color: #FFFDF0;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
    }

    /* -------------------------------------------------------------
       BELOW-CARD ACCORDION / INTERACTIVE SECTIONS
       ------------------------------------------------------------- */
    .card-interactive-drawer {
      width: 100%;
      max-width: 580px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Countdown Dials */
    .countdown-pill-card {
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 18px;
      padding: 20px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    }
    .countdown-val {
      font-family: var(--font-display-en);
      font-size: 36px;
      font-weight: 700;
      color: #FFF;
      display: block;
      line-height: 1;
    }
    .countdown-lbl {
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--gold-primary);
      margin-top: 6px;
      display: block;
    }

    /* Itinerary Schedule */
    .itinerary-pill-card {
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 18px;
      padding: 24px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    }
    .itinerary-card-title {
      font-family: var(--font-display-en);
      font-size: 20px;
      color: var(--gold-primary);
      text-align: center;
      margin-bottom: 16px;
    }
    .itinerary-pill-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .itinerary-pill-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 8px 12px;
      background: rgba(255,255,255,0.03);
      border-radius: 8px;
    }
    .itinerary-pill-time {
      font-size: 13px;
      font-weight: 700;
      color: var(--gold-primary);
      min-width: 75px;
    }
    .itinerary-pill-desc {
      font-size: 14px;
      color: #DDD;
    }

    /* Navigation button */
    .map-pill-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--gold-foil);
      color: #081B17;
      padding: 14px 24px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
      transition: transform 0.3s;
    }
    .map-pill-btn:hover { transform: translateY(-2px); }

    /* RSVP Card */
    .rsvp-pill-card {
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 18px;
      padding: 24px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      text-align: center;
    }
    .rsvp-card-title {
      font-family: var(--font-display-en);
      font-size: 22px;
      color: var(--gold-primary);
      margin-bottom: 12px;
    }
    .rsvp-form-row {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 15px;
      text-align: left;
    }
    .rsvp-input {
      width: 100%;
      padding: 12px;
      background: rgba(4, 14, 12, 0.9);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }
    .rsvp-submit-btn {
      background: var(--gold-foil);
      color: #081B17;
      border: none;
      padding: 14px;
      border-radius: 30px;
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;
    }
    .rsvp-success-toast {
      margin-top: 12px;
      padding: 12px;
      border-radius: 8px;
      background: rgba(39, 174, 96, 0.2);
      border: 1px solid #27AE60;
      color: #A3E4D7;
      display: none;
      font-weight: 600;
    }

    /* Print styles */
    @media print {
      body { background: white !important; color: black !important; padding: 0 !important; }
      .top-action-bar, .card-interactive-drawer, #fxCanvas { display: none !important; }
      .invitation-coded-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    }
  </style>
</head>
<body>

  <!-- Floating Audio & Language Buttons -->
  <div class="top-action-bar">
    <button class="top-btn" id="audioToggleBtn" onclick="toggleRoyalAudio()">
      <i class="fa-solid fa-music"></i>
      <span id="audioStatusText">Royal Symphony</span>
    </button>
    <button class="top-btn" onclick="triggerCardCelebration()">
      <i class="fa-solid fa-sparkles"></i> Celebrate
    </button>
  </div>

  <canvas id="fxCanvas"></canvas>

  <!-- =============================================================
       THE ACTUAL 100% CODED LUXURY WEDDING CARD
       ============================================================= -->
  <div class="card-stage-wrapper">
    <div class="invitation-coded-card style-${state.activeStyle}" id="mainCodedCard">
      
      <!-- Optional Silk Ribbon for Deckle Edge -->
      ${state.activeStyle === 'deckle-edge' ? '<div class="deckle-silk-ribbon"></div>' : ''}

      <div class="card-content-inner">
        
        <!-- Royal Header Crest -->
        <div class="card-header-crest">
          <i class="fa-solid fa-crown"></i>
        </div>

        <!-- Bismillah & Quranic Verse -->
        <div class="card-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <p class="card-quran-ayah">${state.verseText}</p>

        <p class="card-host-line">${state.hostLine}</p>

        <!-- SPECIAL VIP GUEST BADGE (NAME DIRECTLY INSIDE CARD) -->
        <div class="card-vip-guest-box">
          <span class="card-vip-tag"><i class="fa-solid fa-gem"></i> VIP Guest Invitation</span>
          <div class="card-guest-title" id="cardGuestEn">${state.guestEn}</div>
          <div class="card-guest-arabic" id="cardGuestAr">${state.guestAr}</div>
        </div>

        <!-- COUPLE NAMES (DIRECTLY INSIDE CARD) -->
        <div class="card-couple-block">
          <div class="card-couple-row">
            <div class="card-couple-item">
              <span class="card-couple-en">${state.groomEn}</span>
              <span class="card-couple-ar">${state.groomAr}</span>
            </div>
            <span class="card-ampersand">&</span>
            <div class="card-couple-item">
              <span class="card-couple-en">${state.brideEn}</span>
              <span class="card-couple-ar">${state.brideAr}</span>
            </div>
          </div>
        </div>

        <!-- Date & Venue -->
        <div class="card-event-date-row">
          <span>${dateFormattedEn} at ${state.weddingTime}</span>
        </div>
        <div class="card-venue-title">${state.venueNameEn}</div>
        <div class="card-venue-address">${state.venueAddress}</div>

        <!-- 3D Wax Seal Stamp on Card -->
        <div class="card-wax-seal-stamp" onclick="triggerCardCelebration()">
          <span class="card-wax-seal-monogram">${state.waxSealMonogram}</span>
        </div>

      </div>

    </div>
  </div>

  <!-- =============================================================
       INTERACTIVE ACCORDION / DETAILS BELOW CARD
       ============================================================= -->
  <div class="card-interactive-drawer">
    
    <!-- Countdown Clock -->
    ${state.enableCountdown ? `
    <div class="countdown-pill-card">
      <div>
        <span class="countdown-val" id="cntDays">00</span>
        <span class="countdown-lbl">Days / أيام</span>
      </div>
      <div>
        <span class="countdown-val" id="cntHours">00</span>
        <span class="countdown-lbl">Hours / ساعات</span>
      </div>
      <div>
        <span class="countdown-val" id="cntMinutes">00</span>
        <span class="countdown-lbl">Minutes / دقائق</span>
      </div>
      <div>
        <span class="countdown-val" id="cntSeconds">00</span>
        <span class="countdown-lbl">Seconds / ثواني</span>
      </div>
    </div>
    ` : ''}

    <!-- Itinerary -->
    <div class="itinerary-pill-card">
      <h3 class="itinerary-card-title"><i class="fa-solid fa-champagne-glasses"></i> Order of Celebration</h3>
      <div class="itinerary-pill-list">
        ${itineraryHTML}
      </div>
    </div>

    <!-- Google Maps Button -->
    <a href="${state.venueMapLink}" target="_blank" class="map-pill-btn">
      <i class="fa-solid fa-location-arrow"></i>
      <span>Open in Google Maps / الاتجاهات إلى القاعة</span>
    </a>

    <!-- RSVP Confirmation -->
    ${state.enableRSVP ? `
    <div class="rsvp-pill-card">
      <h3 class="rsvp-card-title">RSVP / تأكيد الحضور</h3>
      <p style="font-size: 13px; opacity: 0.8;">Kindly confirm your attendance</p>
      
      <form class="rsvp-form-row" onsubmit="handleRSVP(event)">
        <input type="text" class="rsvp-input" value="${state.guestEn}" placeholder="Your Name" required>
        <select class="rsvp-input">
          <option value="yes">Joyfully Accepts / يسعدني الحضور بكل سرور ✨</option>
          <option value="no">Regretfully Declines / للأسف أعتذر لظروف خاصة</option>
        </select>
        <button type="submit" class="rsvp-submit-btn">Send RSVP Confirmation</button>
        <div id="rsvpSuccessMsg" class="rsvp-success-toast">🎉 Thank you, ${state.guestEn}! Your RSVP is confirmed with love.</div>
      </form>
    </div>
    ` : ''}

  </div>

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

    const chords = [
      { bass: 146.83, chord: [293.66, 369.99, 440.00, 587.33] },
      { bass: 110.00, chord: [220.00, 277.18, 329.63, 440.00] },
      { bass: 123.47, chord: [246.94, 293.66, 369.99, 493.88] },
      { bass: 98.00,  chord: [196.00, 246.94, 293.66, 392.00] }
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
      document.getElementById('audioStatusText').textContent = 'Melody Playing';

      let step = 0;
      function nextBar() {
        if (!isPlaying) return;
        const now = audioCtx.currentTime;
        const current = chords[step % chords.length];
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
      document.getElementById('audioStatusText').textContent = 'Royal Symphony';
    }

    function toggleRoyalAudio() {
      if (isPlaying) stopSymphony();
      else startSymphony();
    }

    function triggerCardCelebration() {
      if (!isPlaying) startSymphony();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF8D4', '#B8860B', '#E74C3C']
        });
      }
    }

    // Countdown Timer
    const weddingTargetTime = new Date('${state.weddingDate}T${state.weddingTime}:00').getTime();
    function refreshCountdown() {
      const now = new Date().getTime();
      const diff = weddingTargetTime - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const dEl = document.getElementById('cntDays');
        if (dEl) {
          dEl.textContent = String(days).padStart(2, '0');
          document.getElementById('cntHours').textContent = String(hours).padStart(2, '0');
          document.getElementById('cntMinutes').textContent = String(minutes).padStart(2, '0');
          document.getElementById('cntSeconds').textContent = String(seconds).padStart(2, '0');
        }
      }
    }
    setInterval(refreshCountdown, 1000);
    refreshCountdown();

    function handleRSVP(e) {
      e.preventDefault();
      document.getElementById('rsvpSuccessMsg').style.display = 'block';
      triggerCardCelebration();
    }

    // Floating Petals
    const canvas = document.getElementById('fxCanvas');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        size: Math.random() * 4 + 2,
        speedY: Math.random() * 1.0 + 0.5, speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360, rotSpeed: Math.random() * 2 - 1,
        color: i % 2 === 0 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(235, 170, 180, 0.35)'
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
function renderCardPreview() {
  const iframe = document.getElementById('invitePreviewIframe');
  if (!iframe) return;
  const generatedHtml = generateCodedCardHTML(cardStudioState);

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
  const htmlContent = generateCodedCardHTML(cardStudioState);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const sanitizedNames = `${cardStudioState.groomEn}_and_${cardStudioState.brideEn}_for_${cardStudioState.guestEn}`.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '_');
  const filename = `Wedding_Card_${cardStudioState.activeStyle}_${sanitizedNames}.html`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`✅ Successfully downloaded standalone coded card: ${filename}!`);
}

function printCard() {
  const iframe = document.getElementById('invitePreviewIframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }
}

function copyPersonalizedLink() {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('style', cardStudioState.activeStyle);
  currentUrl.searchParams.set('groom', cardStudioState.groomEn);
  currentUrl.searchParams.set('bride', cardStudioState.brideEn);
  currentUrl.searchParams.set('guest', cardStudioState.guestEn);
  currentUrl.searchParams.set('view', 'card');

  navigator.clipboard.writeText(currentUrl.toString()).then(() => {
    showToast(`🔗 Copied VIP Invite link for "${cardStudioState.guestEn}"!`);
  }).catch(() => {
    prompt('Copy VIP Invite Link:', currentUrl.toString());
  });
}

function openPreviewFullscreen() {
  const htmlContent = generateCodedCardHTML(cardStudioState);
  const win = window.open('', '_blank');
  win.document.open();
  win.document.write(htmlContent);
  win.document.close();
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold-primary);"></i> ${msg}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

// ==========================================================================
// 6. INITIALIZATION
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has('style')) cardStudioState.activeStyle = params.get('style');
  if (params.has('groom')) cardStudioState.groomEn = params.get('groom');
  if (params.has('bride')) cardStudioState.brideEn = params.get('bride');
  if (params.has('guest')) cardStudioState.guestEn = params.get('guest');

  // Direct standalone card view via URL parameter ?view=card
  if (params.get('view') === 'card') {
    document.body.innerHTML = generateCodedCardHTML(cardStudioState);
    return;
  }

  const isUnlocked = sessionStorage.getItem('portal_unlocked') === 'true';
  if (isUnlocked) {
    unlockPortal();
  }
});
