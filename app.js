/**
 * Royal Wedding Invitation Studio & Generator Engine
 * 82 Reference Designs Coded Architecture
 */

const DEFAULT_PASSWORD = 'me7299';
const SECRET_BACKDOOR = 'wedding_pass_wedding';
const STORAGE_PASS_KEY = 'wedding_invite_site_pass';

// Studio State
var cardStudioState = {
  activeDesignId: 'design-13', // Default: Islamic Bismillah & Eucalyptus Marble Suite
  groomEn: 'Mohamed',
  groomAr: 'محمد',
  brideEn: 'Hala',
  brideAr: 'هالة',
  guestEn: 'Mr / Sherief Mohamed',
  guestAr: 'السيد / شريف محمد',
  scriptFont: 'Pinyon Script',
  textColorTheme: 'gold',
  coupleSize: 44,
  offsetY: 0,
  plaqueStyle: 'frosted',
  plaqueOpacity: 85,
  plaqueWidth: 88,
  plaqueBorder: 'gold-thin',
  eventDate: '2026-11-20',
  eventTime: '18:00',
  dateDivider: 'divider',
  verseText: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  venueNameEn: 'The Royal Ballroom, Four Seasons Hotel',
  venueNameAr: 'قاعة الاحتفالات الملكية - فندق فور سيزونز',
  venueAddress: 'Nile Plaza, Garden City, Cairo, Egypt',
  venueMapLink: 'https://maps.google.com/?q=Four+Seasons+Hotel+Cairo+Nile+Plaza',
  waxSealMonogram: 'M & H',
  waxSealColor: 'gold',
  audioStyle: 'symphony',
  enablePetals: true,
  enableCountdown: true,
  enableRSVP: true
};

let activeGalleryCategory = 'all';
let currentSearchQuery = '';

// ==========================================================================
// 1. PASSWORD GATE & ADMIN BACKDOOR
// ==========================================================================
function getStoredPassword() {
  try {
    return localStorage.getItem(STORAGE_PASS_KEY) || DEFAULT_PASSWORD;
  } catch(e) {
    return DEFAULT_PASSWORD;
  }
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
  try { sessionStorage.setItem('portal_unlocked', 'true'); } catch(e) {}
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

  initStudioApp();
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
  showToast('Password updated successfully!');
}

function resetToDefaultPassword() {
  localStorage.setItem(STORAGE_PASS_KEY, DEFAULT_PASSWORD);
  document.getElementById('adminSuccessMsg').textContent = `Password reset to default ("${DEFAULT_PASSWORD}")!`;
  showToast('Password reset to me7299');
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
  document.getElementById('changePasswordModal').classList.remove('hidden');
}
function closePasswordChangeModal() {
  document.getElementById('changePasswordModal').classList.add('hidden');
}
function savePasswordFromModal() {
  const val = document.getElementById('modalNewPassInput').value.trim();
  if (val) {
    localStorage.setItem(STORAGE_PASS_KEY, val);
    showToast(`Password updated to: "${val}"`);
    closePasswordChangeModal();
  }
}

function logout() {
  try { sessionStorage.removeItem('portal_unlocked'); } catch(e) {}
  document.getElementById('appContainer').classList.add('hidden');
  document.getElementById('passwordGateModal').classList.add('active');
  document.body.classList.add('locked-body');
  document.getElementById('gatePassInput').value = '';
}

// ==========================================================================
// 2. STUDIO INITIALIZATION & TAB MANAGEMENT
// ==========================================================================
function initStudioApp() {
  populateDesignsGallery();
  readUrlParams();
  renderCardPreview();
}

function switchSidebarTab(tabName) {
  const tabs = ['gallery', 'typography', 'plaque', 'details', 'finishing'];
  tabs.forEach(t => {
    const btn = document.querySelector(`.sidebar-tabs button[onclick*="${t}"]`);
    const content = document.getElementById('tabContent' + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) btn.classList.toggle('active', t === tabName);
    if (content) content.classList.toggle('active', t === tabName);
  });
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
// 3. 82 DESIGNS GALLERY ENGINE
// ==========================================================================
function getCatalog() {
  return window.WEDDING_DESIGNS_CATALOG || [];
}

function populateDesignsGallery() {
  const catalog = getCatalog();
  const grid = document.getElementById('designsGalleryGrid');
  const countBadge = document.getElementById('galleryCountBadge');
  if (!grid) return;

  const filtered = catalog.filter(item => {
    const matchCat = (activeGalleryCategory === 'all') || (item.category === activeGalleryCategory);
    let matchSearch = true;
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      const numStr = '#' + item.index;
      matchSearch = item.titleEn.toLowerCase().includes(q) ||
                    item.titleAr.toLowerCase().includes(q) ||
                    item.categoryNameEn.toLowerCase().includes(q) ||
                    item.fileName.toLowerCase().includes(q) ||
                    numStr.includes(q);
    }
    return matchCat && matchSearch;
  });

  countBadge.textContent = `${filtered.length} Cards`;

  grid.innerHTML = filtered.map(item => {
    const isActive = item.id === cardStudioState.activeDesignId;
    return `
      <div class="design-choice-card ${isActive ? 'active' : ''}" onclick="selectDesign('${item.id}')" id="cardChoice_${item.id}">
        <div class="design-thumb-wrapper">
          <img src="${item.image}" alt="${item.titleEn}" class="design-thumb-img" loading="lazy">
          <span class="design-badge-num">#${item.index}</span>
          <span class="design-badge-cat">${item.categoryNameEn}</span>
          <div class="design-active-indicator">
            <i class="fa-solid fa-check"></i>
          </div>
        </div>
        <div class="design-choice-meta">
          <strong>${item.titleEn}</strong>
          <span>${item.titleAr}</span>
        </div>
      </div>
    `;
  }).join('');
}

function setGalleryCategory(cat, btn) {
  activeGalleryCategory = cat;
  document.querySelectorAll('.gallery-filter-chips .filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  populateDesignsGallery();
}

function filterDesignsGallery() {
  currentSearchQuery = document.getElementById('gallerySearchInput').value.trim();
  populateDesignsGallery();
}

function selectDesign(designId) {
  cardStudioState.activeDesignId = designId;
  const catalog = getCatalog();
  const design = catalog.find(d => d.id === designId);

  // Auto-tune plaque and color if default given
  if (design) {
    if (design.defaultPlaque) cardStudioState.plaqueStyle = design.defaultPlaque;
    if (design.defaultColor) {
      if (design.category === 'blackgold') cardStudioState.textColorTheme = 'gold';
      else if (design.category === 'navy') cardStudioState.textColorTheme = 'navy';
      else if (design.category === 'burgundy') cardStudioState.textColorTheme = 'burgundy';
      else if (design.category === 'emerald') cardStudioState.textColorTheme = 'emerald';
      else cardStudioState.textColorTheme = 'gold';
    }
    syncFormInputsWithState();
  }

  // Update gallery highlight
  document.querySelectorAll('.design-choice-card').forEach(c => c.classList.remove('active'));
  const activeEl = document.getElementById('cardChoice_' + designId);
  if (activeEl) activeEl.classList.add('active');

  renderCardPreview();
  showToast(`Loaded ${design ? design.titleEn : 'Selected Design'}!`);
}

// ==========================================================================
// 4. DATA SYNC & CONTROLS BINDING
// ==========================================================================
function updateAllCardData() {
  cardStudioState.guestEn = document.getElementById('guestNameInput').value.trim() || 'Honored Guest';
  cardStudioState.guestAr = document.getElementById('guestNameArInput').value.trim() || 'الضيف الكريم';

  cardStudioState.groomEn = document.getElementById('groomEnInput').value.trim() || 'Mohamed';
  cardStudioState.groomAr = document.getElementById('groomArInput').value.trim() || 'محمد';
  cardStudioState.brideEn = document.getElementById('brideEnInput').value.trim() || 'Hala';
  cardStudioState.brideAr = document.getElementById('brideArInput').value.trim() || 'هالة';

  const scriptFontInput = document.querySelector('input[name="scriptFont"]:checked');
  if (scriptFontInput) cardStudioState.scriptFont = scriptFontInput.value;

  const colorInput = document.querySelector('input[name="textColorTheme"]:checked');
  if (colorInput) cardStudioState.textColorTheme = colorInput.value;

  cardStudioState.coupleSize = parseInt(document.getElementById('sliderCoupleSize').value, 10);
  document.getElementById('valCoupleSize').textContent = cardStudioState.coupleSize + 'px';

  cardStudioState.offsetY = parseInt(document.getElementById('sliderOffsetY').value, 10);
  document.getElementById('valOffsetY').textContent = cardStudioState.offsetY + 'px';

  const plaqueInput = document.querySelector('input[name="plaqueStyle"]:checked');
  if (plaqueInput) cardStudioState.plaqueStyle = plaqueInput.value;

  cardStudioState.plaqueOpacity = parseInt(document.getElementById('sliderPlaqueOpacity').value, 10);
  document.getElementById('valPlaqueOpacity').textContent = cardStudioState.plaqueOpacity + '%';

  cardStudioState.plaqueWidth = parseInt(document.getElementById('sliderPlaqueWidth').value, 10);
  document.getElementById('valPlaqueWidth').textContent = cardStudioState.plaqueWidth + '%';

  cardStudioState.plaqueBorder = document.getElementById('plaqueBorderSelect').value;

  cardStudioState.eventDate = document.getElementById('eventDateInput').value;
  cardStudioState.eventTime = document.getElementById('eventTimeInput').value;
  cardStudioState.dateDivider = document.getElementById('dateDividerSelect').value;

  cardStudioState.verseText = document.getElementById('customVerseTextarea').value.trim();

  cardStudioState.venueNameEn = document.getElementById('venueNameEnInput').value.trim();
  cardStudioState.venueNameAr = document.getElementById('venueNameArInput').value.trim();
  cardStudioState.venueAddress = document.getElementById('venueAddressInput').value.trim();
  cardStudioState.venueMapLink = document.getElementById('venueMapLinkInput').value.trim();

  cardStudioState.waxSealMonogram = document.getElementById('waxSealMonogramInput').value.trim() || 'M & H';
  cardStudioState.waxSealColor = document.getElementById('waxSealColorSelect').value;
  cardStudioState.audioStyle = document.getElementById('audioStyleSelect').value;

  cardStudioState.enablePetals = document.getElementById('petalsToggle').checked;
  cardStudioState.enableCountdown = document.getElementById('countdownToggle').checked;
  cardStudioState.enableRSVP = document.getElementById('rsvpToggle').checked;

  renderCardPreview();
}

function syncFormInputsWithState() {
  const fontRadio = document.querySelector(`input[name="scriptFont"][value="${cardStudioState.scriptFont}"]`);
  if (fontRadio) fontRadio.checked = true;

  const colorRadio = document.querySelector(`input[name="textColorTheme"][value="${cardStudioState.textColorTheme}"]`);
  if (colorRadio) colorRadio.checked = true;

  const plaqueRadio = document.querySelector(`input[name="plaqueStyle"][value="${cardStudioState.plaqueStyle}"]`);
  if (plaqueRadio) plaqueRadio.checked = true;
}

function setGuestPreset(en, ar) {
  document.getElementById('guestNameInput').value = en;
  document.getElementById('guestNameArInput').value = ar;
  updateAllCardData();
  showToast(`Guest set to: ${en}`);
}

function applyVersePreset(val) {
  const textarea = document.getElementById('customVerseTextarea');
  if (val === 'ayah1') {
    textarea.value = 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً';
  } else if (val === 'ayah2') {
    textarea.value = 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ';
  } else if (val === 'quote1') {
    textarea.value = '"Two souls with but a single thought, two hearts that beat as one."';
  }
  updateAllCardData();
}

// ==========================================================================
// 5. MASTER CODED INVITATION CARD ARCHITECTURE GENERATOR
// ==========================================================================
function generateCodedCardHTML(state) {
  const catalog = getCatalog();
  const design = catalog.find(d => d.id === state.activeDesignId) || catalog[0] || {
    image: 'assets/designs/il_1588xN.6422523152_isqu.jpg',
    titleEn: 'Royal Wedding Suite #13'
  };

  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}:00`);
  const weekday = eventDateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const shortWeekday = eventDateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const day = eventDateObj.getDate();
  const monthEn = eventDateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const shortMonth = eventDateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const year = eventDateObj.getFullYear();
  const timeFormatted = eventDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Date layout markup
  let dateMarkup = '';
  if (state.dateDivider === 'divider') {
    dateMarkup = `
      <div class="card-date-divider-row">
        <span class="date-part">${weekday}</span>
        <span class="date-day-badge">${day}</span>
        <span class="date-part">${monthEn}</span>
        <span class="date-part">${year}</span>
      </div>
      <div class="card-time-line">AT ${timeFormatted} IN THE EVENING</div>
    `;
  } else if (state.dateDivider === 'pill') {
    dateMarkup = `
      <div class="card-date-pill-row">
        <span class="pill-weekday">${shortWeekday}</span>
        <div class="pill-center-badge">
          <span class="pill-day">${day}</span>
          <span class="pill-month">${shortMonth}</span>
        </div>
        <span class="pill-time">${timeFormatted}</span>
      </div>
    `;
  } else {
    dateMarkup = `
      <div class="card-date-classic-row">
        <div class="classic-date-str">${eventDateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
        <div class="classic-time-str">at ${timeFormatted}</div>
      </div>
    `;
  }

  // Wax seal gradient & border
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

  // Border style
  let plaqueBorderCSS = 'border: 1px solid rgba(212, 175, 55, 0.7); outline: 1px solid rgba(212, 175, 55, 0.3); outline-offset: 4px;';
  if (state.plaqueBorder === 'gold-double') plaqueBorderCSS = 'border: 3px double rgba(212, 175, 55, 0.9);';
  else if (state.plaqueBorder === 'gold-dashed') plaqueBorderCSS = 'border: 1px dashed rgba(212, 175, 55, 0.8);';
  else if (state.plaqueBorder === 'none') plaqueBorderCSS = 'border: none;';

  // Plaque Background
  const op = state.plaqueOpacity / 100;
  let plaqueBgCSS = `background: rgba(255, 255, 255, ${op}); backdrop-filter: blur(14px);`;
  if (state.plaqueStyle === 'parchment') plaqueBgCSS = `background: rgba(253, 248, 238, ${op}); backdrop-filter: blur(10px);`;
  else if (state.plaqueStyle === 'dark') plaqueBgCSS = `background: rgba(10, 14, 12, ${op}); backdrop-filter: blur(14px);`;
  else if (state.plaqueStyle === 'none') plaqueBgCSS = `background: transparent; backdrop-filter: none; box-shadow: none; border: none;`;

  // Text Color / Foil styling
  let colorClass = 'foil-gold';
  if (state.textColorTheme === 'white') colorClass = 'foil-white';
  else if (state.textColorTheme === 'black') colorClass = 'foil-black';
  else if (state.textColorTheme === 'navy') colorClass = 'foil-navy';
  else if (state.textColorTheme === 'burgundy') colorClass = 'foil-burgundy';
  else if (state.textColorTheme === 'emerald') colorClass = 'foil-emerald';
  else if (state.textColorTheme === 'rosegold') colorClass = 'foil-rosegold';

  // Script Font styling
  let fontCssRule = `font-family: '${state.scriptFont}', cursive; font-size: ${state.coupleSize}px; font-weight: 400;`;
  if (state.scriptFont === 'Playfair Display') {
    fontCssRule = `font-family: 'Playfair Display', serif; font-style: italic; font-size: ${Math.round(state.coupleSize * 0.9)}px; font-weight: 600;`;
  } else if (state.scriptFont === 'Cormorant Garamond') {
    fontCssRule = `font-family: 'Cormorant Garamond', serif; font-size: ${Math.round(state.coupleSize * 0.9)}px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;`;
  } else if (state.scriptFont === 'Cinzel') {
    fontCssRule = `font-family: 'Cinzel', serif; font-size: ${Math.round(state.coupleSize * 0.8)}px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;`;
  } else if (state.scriptFont === 'Aref Ruqaa') {
    fontCssRule = `font-family: 'Aref Ruqaa', serif; font-size: ${Math.round(state.coupleSize * 0.95)}px; font-weight: 700;`;
  } else if (state.scriptFont === 'Amiri') {
    fontCssRule = `font-family: 'Amiri', serif; font-size: ${state.coupleSize}px; font-weight: 700;`;
  }

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.groomEn} & ${state.brideEn} | Wedding Invitation - ${state.guestEn}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Italianno&family=Montserrat:wght@300;400;500;600;700&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Reem+Kufi:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script>

  <style>
    :root {
      --gold-primary: #D4AF37;
      --gold-foil: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #9E7412 100%);
      --seal-bg: ${sealBg};
      --seal-border: ${sealBorder};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #051310;
      color: #E8ECEB;
      font-family: 'Montserrat', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 30px 16px 80px;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 40%);
    }

    #fxCanvas { position: fixed; inset: 0; pointer-events: none; z-index: 99; }

    /* Floating Top Action Bar */
    .top-action-bar {
      position: fixed; top: 16px; right: 16px; z-index: 999; display: flex; gap: 8px;
    }
    .top-action-btn {
      background: rgba(8, 27, 23, 0.85); border: 1px solid var(--gold-primary);
      color: #FFF9E6; padding: 7px 14px; border-radius: 25px; font-size: 11px;
      font-weight: 600; cursor: pointer; backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 6px;
      transition: all 0.3s;
    }
    .top-action-btn:hover { background: var(--gold-foil); color: #081B17; transform: translateY(-2px); }

    /* CARD CONTAINER */
    .card-stage-container {
      width: 100%; max-width: 540px; margin: 20px auto 30px; perspective: 1200px;
    }

    .luxury-invitation-card {
      position: relative; width: 100%; border-radius: 18px; overflow: hidden;
      box-shadow: 0 25px 70px rgba(0,0,0,0.7), 0 0 30px rgba(212, 175, 55, 0.25);
      background: #000;
    }

    /* CARD ARTWORK BASE */
    .card-artwork-frame {
      position: relative; width: 100%; display: block; line-height: 0;
    }
    .card-artwork-img {
      width: 100%; height: auto; display: block; filter: contrast(102%) brightness(101%);
    }

    /* OVERLAY PLAQUE */
    .card-typography-plaque {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) translateY(${state.offsetY}px);
      width: ${state.plaqueWidth}%;
      ${plaqueBgCSS}
      ${plaqueBorderCSS}
      border-radius: 16px;
      padding: 30px 24px;
      text-align: center;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
      z-index: 10;
      transition: all 0.3s ease;
    }

    /* FOIL & COLOR PALETTES */
    .foil-gold {
      background: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #9E7412 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4));
    }
    .foil-white { color: #FFFFFF !important; text-shadow: 0 2px 10px rgba(0,0,0,0.6); -webkit-text-fill-color: initial !important; }
    .foil-black { color: #111111 !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-navy { color: #14284B !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-burgundy { color: #68132A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-emerald { color: #0E4D3A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-rosegold {
      background: linear-gradient(135deg, #E5AA9C 0%, #FFF0EB 30%, #B76E79 70%, #8C4751 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    /* CARD TEXT ELEMENTS */
    .card-verse-block { margin-bottom: 14px; }
    .card-bismillah-arabic {
      font-family: 'Amiri', serif; font-size: 20px; font-weight: 700; line-height: 1.4;
      margin-bottom: 4px;
    }
    .card-verse-arabic {
      font-family: 'Aref Ruqaa', 'Amiri', serif; font-size: 13px; line-height: 1.6;
      color: rgba(20, 20, 20, 0.85); max-width: 90%; margin: 0 auto;
    }
    .dark-text { color: #222 !important; }
    .light-text { color: #EEE !important; }

    /* Guest line */
    .card-guest-block { margin-bottom: 12px; }
    .card-invite-greeting {
      font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: #666; margin-bottom: 4px;
    }
    .card-guest-badge {
      display: inline-block; padding: 4px 14px; border-radius: 20px;
      background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.5);
      font-size: 13px; font-weight: 700; color: #1B150F;
    }
    .card-guest-ar {
      display: block; font-family: 'Aref Ruqaa', serif; font-size: 12px;
      color: #666; margin-top: 2px;
    }

    /* Couple Names */
    .card-couple-block { margin: 14px 0; }
    .card-couple-names {
      ${fontCssRule}
      line-height: 1.15;
      margin-bottom: 4px;
      word-break: break-word;
    }
    .card-couple-arabic {
      font-family: 'Aref Ruqaa', serif; font-size: 22px; font-weight: 700;
      color: var(--gold-primary); margin-top: 2px;
    }

    /* Date layout */
    .card-date-divider-row {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin: 14px 0 4px; border-top: 1px solid rgba(212, 175, 55, 0.4);
      border-bottom: 1px solid rgba(212, 175, 55, 0.4); padding: 8px 0;
    }
    .date-part { font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #333; }
    .date-day-badge {
      font-size: 24px; font-weight: 700; font-family: 'Cinzel', serif;
      color: var(--gold-primary); padding: 0 6px;
    }
    .card-time-line { font-size: 10px; letter-spacing: 2px; color: #666; font-weight: 600; }

    /* Pill Date */
    .card-date-pill-row {
      display: inline-flex; align-items: center; gap: 10px; margin: 12px 0 6px;
      border: 1px solid rgba(212, 175, 55, 0.6); border-radius: 30px; padding: 4px 14px;
    }
    .pill-weekday, .pill-time { font-size: 11px; font-weight: 600; color: #333; letter-spacing: 1px; }
    .pill-center-badge {
      display: flex; flex-direction: column; align-items: center; padding: 2px 8px;
      border-left: 1px solid rgba(212, 175, 55, 0.4); border-right: 1px solid rgba(212, 175, 55, 0.4);
    }
    .pill-day { font-size: 16px; font-weight: 700; color: var(--gold-primary); font-family: 'Cinzel', serif; }
    .pill-month { font-size: 9px; font-weight: 700; letter-spacing: 1px; color: #444; }

    /* Classic Date */
    .card-date-classic-row { margin: 12px 0; }
    .classic-date-str { font-size: 13px; font-weight: 600; color: #222; }
    .classic-time-str { font-size: 11px; color: #666; }

    /* Venue */
    .card-venue-block { margin-top: 12px; }
    .card-venue-name { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #222; }
    .card-venue-ar { font-family: 'Amiri', serif; font-size: 13px; color: var(--gold-primary); }
    .card-venue-address { font-size: 10px; color: #666; margin-top: 2px; }
    .card-map-link {
      display: inline-flex; align-items: center; gap: 5px; margin-top: 6px;
      font-size: 10px; font-weight: 600; color: var(--gold-primary); text-decoration: none;
      padding: 3px 10px; border-radius: 12px; background: rgba(212, 175, 55, 0.1);
      transition: all 0.2s;
    }
    .card-map-link:hover { background: var(--gold-primary); color: #081B17; }

    /* BOTTOM CONTROLS & WAX SEAL */
    .card-interactive-footer {
      width: 100%; max-width: 540px; margin: 0 auto; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }

    .wax-seal-wrapper {
      position: relative; display: flex; flex-direction: column; align-items: center;
      cursor: pointer; margin-top: -30px; z-index: 50; transition: transform 0.3s;
    }
    .wax-seal-wrapper:hover { transform: scale(1.08); }
    .wax-seal-disc {
      width: 68px; height: 68px; border-radius: 50%;
      background: var(--seal-bg); border: 3px solid var(--seal-border);
      box-shadow: 0 8px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cinzel Decorative', serif; font-size: 18px; font-weight: 900;
      color: #FFF9E6; text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
    }
    .wax-seal-hint {
      margin-top: 6px; font-size: 10px; color: var(--gold-primary); font-weight: 600;
      background: rgba(8, 27, 23, 0.85); padding: 3px 10px; border-radius: 12px;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .card-actions-row {
      display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%;
    }
    .card-btn {
      background: var(--gold-foil); color: #081B17; border: none; border-radius: 25px;
      padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
      display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
      transition: all 0.3s;
    }
    .card-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    .card-btn-outline {
      background: rgba(14, 41, 35, 0.8); border: 1px solid var(--gold-primary);
      color: #FFF9E6; border-radius: 25px; padding: 10px 20px; font-size: 13px;
      font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;
      transition: all 0.3s;
    }
    .card-btn-outline:hover { background: rgba(212, 175, 55, 0.2); }

    /* COUNTDOWN BADGE */
    .countdown-widget {
      background: rgba(8, 27, 23, 0.9); border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 16px; padding: 12px 20px; display: flex; gap: 16px; text-align: center;
      box-shadow: 0 8px 25px rgba(0,0,0,0.5);
    }
    .countdown-unit { display: flex; flex-direction: column; align-items: center; }
    .countdown-num { font-size: 20px; font-weight: 700; color: var(--gold-primary); font-family: 'Cinzel', serif; }
    .countdown-lbl { font-size: 9px; color: #8FAEA8; text-transform: uppercase; letter-spacing: 1px; }

    /* RSVP MODAL */
    .rsvp-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
      z-index: 99999; display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .rsvp-modal.active { display: flex; }
    .rsvp-card {
      width: 100%; max-width: 440px; background: #0A221D; border: 2px solid var(--gold-primary);
      border-radius: 20px; padding: 30px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      position: relative;
    }
    .rsvp-close {
      position: absolute; top: 16px; right: 16px; background: none; border: none;
      color: #8FAEA8; font-size: 18px; cursor: pointer;
    }
    .rsvp-title { font-family: 'Cinzel Decorative', serif; font-size: 20px; color: #FFF9E6; margin-bottom: 6px; }
    .rsvp-desc { font-size: 13px; color: #8FAEA8; margin-bottom: 20px; }
    .rsvp-actions { display: flex; flex-direction: column; gap: 10px; }
    .rsvp-btn-yes {
      background: var(--gold-foil); color: #081B17; border: none; border-radius: 12px;
      padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;
    }
    .rsvp-btn-yes:hover { filter: brightness(1.1); transform: translateY(-1px); }
  </style>
</head>
<body>

  <!-- Floating Audio & Map Controls -->
  <div class="top-action-bar">
    <button class="top-action-btn" onclick="toggleRoyalMusic()" id="btnMusicPlay">
      <i class="fa-solid fa-music"></i> <span id="lblMusic">Royal Music</span>
    </button>
    <a href="${state.venueMapLink}" target="_blank" class="top-action-btn">
      <i class="fa-solid fa-map-location-dot"></i> <span>Directions</span>
    </a>
  </div>

  <canvas id="fxCanvas"></canvas>

  <!-- THE INVITATION CARD -->
  <div class="card-stage-container">
    <div class="luxury-invitation-card">
      
      <!-- High-Res Chosen Design Template Artwork -->
      <div class="card-artwork-frame">
        <img src="${design.image}" alt="${design.titleEn}" class="card-artwork-img">
      </div>

      <!-- Live Personalized Overlay Plaque -->
      <div class="card-typography-plaque">
        
        <!-- Bismillah / Ayah -->
        <div class="card-verse-block">
          <div class="card-bismillah-arabic ${state.plaqueStyle === 'dark' ? 'foil-gold' : 'dark-text'}">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div class="card-verse-arabic ${state.plaqueStyle === 'dark' ? 'light-text' : 'dark-text'}">"${state.verseText}"</div>
        </div>

        <!-- Guest Invitation -->
        <div class="card-guest-block">
          <div class="card-invite-greeting">Together with their families, cordially invite</div>
          <div class="card-guest-badge">${state.guestEn}</div>
          <div class="card-guest-ar">${state.guestAr}</div>
        </div>

        <!-- Couple Names -->
        <div class="card-couple-block">
          <h1 class="card-couple-names ${colorClass}">${state.groomEn} & ${state.brideEn}</h1>
          <div class="card-couple-arabic">${state.groomAr} و ${state.brideAr}</div>
        </div>

        <!-- Date & Time -->
        ${dateMarkup}

        <!-- Venue & Reception -->
        <div class="card-venue-block">
          <div class="card-venue-name ${state.plaqueStyle === 'dark' ? 'light-text' : 'dark-text'}">${state.venueNameEn}</div>
          <div class="card-venue-ar">${state.venueNameAr}</div>
          <div class="card-venue-address">${state.venueAddress}</div>
          <a href="${state.venueMapLink}" target="_blank" class="card-map-link">
            <i class="fa-solid fa-location-dot"></i> View on Google Maps
          </a>
        </div>

      </div>

    </div>
  </div>

  <!-- Interactive Wax Seal & Action Footer -->
  <div class="card-interactive-footer">
    
    <!-- 3D Wax Seal Stamp -->
    <div class="wax-seal-wrapper" onclick="handleWaxSealClick()">
      <div class="wax-seal-disc">
        <span>${state.waxSealMonogram}</span>
      </div>
      <div class="wax-seal-hint">
        <i class="fa-solid fa-wand-magic-sparkles"></i> Tap Seal to Celebrate
      </div>
    </div>

    <!-- Live Countdown Timer -->
    ${state.enableCountdown ? `
      <div class="countdown-widget" id="countdownWidget">
        <div class="countdown-unit">
          <span class="countdown-num" id="cdDays">--</span>
          <span class="countdown-lbl">Days</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-num" id="cdHours">--</span>
          <span class="countdown-lbl">Hours</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-num" id="cdMins">--</span>
          <span class="countdown-lbl">Mins</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-num" id="cdSecs">--</span>
          <span class="countdown-lbl">Secs</span>
        </div>
      </div>
    ` : ''}

    <!-- Action Buttons -->
    <div class="card-actions-row">
      ${state.enableRSVP ? `
        <button class="card-btn" onclick="openRSVPModal()">
          <i class="fa-solid fa-heart"></i> Confirm Attendance (RSVP)
        </button>
      ` : ''}
      <button class="card-btn-outline" onclick="addToCalendar()">
        <i class="fa-solid fa-calendar-plus"></i> Add to Calendar
      </button>
    </div>

  </div>

  <!-- RSVP MODAL -->
  <div class="rsvp-modal" id="rsvpModal">
    <div class="rsvp-card">
      <button class="rsvp-close" onclick="closeRSVPModal()"><i class="fa-solid fa-xmark"></i></button>
      <div class="rsvp-title">Wedding RSVP</div>
      <p class="rsvp-desc">We look forward to celebrating with you, <strong>${state.guestEn}</strong>!</p>
      
      <div class="rsvp-actions">
        <button class="rsvp-btn-yes" onclick="submitRSVP('Attending with Joy!')">
          <i class="fa-solid fa-check"></i> Accept with Pleasure (Joyfully Attend)
        </button>
        <button class="card-btn-outline" style="width:100%; justify-content:center;" onclick="submitRSVP('Regretfully Decline')">
          <i class="fa-solid fa-envelope"></i> Regretfully Decline
        </button>
      </div>
    </div>
  </div>

  <!-- Audio & Petals Engine Scripts -->
  <script>
    // 1. Procedural Royal Wedding Symphony (Web Audio API - No MP3 needed)
    let audioCtx = null;
    let isPlayingMusic = false;
    let musicInterval = null;

    function playRoyalMelody() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const canonNotes = [
        293.66, 220.00, 246.94, 185.00, 196.00, 146.83, 196.00, 220.00,
        587.33, 440.00, 493.88, 369.99, 392.00, 293.66, 392.00, 440.00
      ];
      let noteIdx = 0;

      function triggerNextNote() {
        if (!isPlayingMusic) return;
        const freq = canonNotes[noteIdx % canonNotes.length];
        noteIdx++;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.3);
      }

      isPlayingMusic = true;
      document.getElementById('lblMusic').textContent = 'Pause Music';
      musicInterval = setInterval(triggerNextNote, 600);
      triggerNextNote();
    }

    function toggleRoyalMusic() {
      if (isPlayingMusic) {
        isPlayingMusic = false;
        clearInterval(musicInterval);
        document.getElementById('lblMusic').textContent = 'Play Music';
      } else {
        playRoyalMelody();
      }
    }

    function handleWaxSealClick() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF3B3', '#AA771C']
        });
      }
      if (!isPlayingMusic) playRoyalMelody();
    }

    // 2. Falling Golden Petals FX
    ${state.enablePetals ? `
      (function() {
        const canvas = document.getElementById('fxCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        });

        const petals = [];
        for (let i = 0; i < 35; i++) {
          petals.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 5 + 3,
            speedY: Math.random() * 1 + 0.5,
            speedX: Math.random() * 0.8 - 0.4,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 2 - 1,
            color: ['#D4AF37', '#ECC870', '#FFF3B3', '#FADBD8'][Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.6 + 0.3
          });
        }

        function draw() {
          ctx.clearRect(0, 0, width, height);
          petals.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          requestAnimationFrame(draw);
        }
        draw();
      })();
    ` : ''}

    // 3. Live Countdown
    ${state.enableCountdown ? `
      (function() {
        const target = new Date('${state.weddingDate}T${state.weddingTime}:00').getTime();
        function updateCd() {
          const now = Date.now();
          const diff = target - now;
          if (diff <= 0) {
            document.getElementById('countdownWidget').innerHTML = '<div style="color:var(--gold-primary); font-weight:700;">Celebrating Today! 💍✨</div>';
            return;
          }
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);

          const elD = document.getElementById('cdDays');
          if (elD) elD.textContent = d;
          const elH = document.getElementById('cdHours');
          if (elH) elH.textContent = h;
          const elM = document.getElementById('cdMins');
          if (elM) elM.textContent = m;
          const elS = document.getElementById('cdSecs');
          if (elS) elS.textContent = s;
        }
        setInterval(updateCd, 1000);
        updateCd();
      })();
    ` : ''}

    // 4. RSVP Handling
    function openRSVPModal() { document.getElementById('rsvpModal').classList.add('active'); }
    function closeRSVPModal() { document.getElementById('rsvpModal').classList.remove('active'); }
    function submitRSVP(response) {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      }
      alert('Thank you! Your RSVP response (' + response + ') has been recorded. 💍');
      closeRSVPModal();
    }

    // 5. Add to Calendar
    function addToCalendar() {
      const title = encodeURIComponent('${state.groomEn} & ${state.brideEn} Wedding');
      const details = encodeURIComponent('Celebrating the marriage of ${state.groomEn} & ${state.brideEn}. Guest: ${state.guestEn}');
      const location = encodeURIComponent('${state.venueNameEn}, ${state.venueAddress}');
      const gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + title + '&details=' + details + '&location=' + location;
      window.open(gcalUrl, '_blank');
    }
  <\/script>
</body>
</html>`;
}

// ==========================================================================
// 6. PREVIEW STAGE RENDERING
// ==========================================================================
function renderCardPreview() {
  const container = document.getElementById('previewViewportContainer');
  const titleDisplay = document.getElementById('activeDesignTitleDisplay');
  const catalog = getCatalog();
  const activeDesign = catalog.find(d => d.id === cardStudioState.activeDesignId) || catalog[0];

  if (titleDisplay && activeDesign) {
    titleDisplay.textContent = `Active: ${activeDesign.titleEn} (#${activeDesign.index})`;
  }

  if (!container) return;

  const html = generateCodedCardHTML(cardStudioState);

  // Render iframe for 100% css isolation and faithful preview
  let iframe = container.querySelector('iframe.card-preview-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.className = 'card-preview-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '880px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '20px';
    iframe.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.7)';
    container.innerHTML = '';
    container.appendChild(iframe);
  }

  iframe.srcdoc = html;
}

// ==========================================================================
// 7. EXPORT, PRINT & VIP SHARE
// ==========================================================================
function downloadStandaloneInvite() {
  const html = generateCodedCardHTML(cardStudioState);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Wedding_Invitation_${cardStudioState.groomEn}_and_${cardStudioState.brideEn}_(${cardStudioState.guestEn.replace(/[^a-zA-Z0-9]/g, '_')}).html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded standalone wedding invitation card! 💌');
}

function printCard() {
  const html = generateCodedCardHTML(cardStudioState);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 600);
}

function copyPersonalizedLink() {
  const url = new URL(window.location.href);
  url.searchParams.set('design', cardStudioState.activeDesignId);
  url.searchParams.set('guest', cardStudioState.guestEn);
  url.searchParams.set('guestAr', cardStudioState.guestAr);
  url.searchParams.set('groom', cardStudioState.groomEn);
  url.searchParams.set('bride', cardStudioState.brideEn);

  navigator.clipboard.writeText(url.toString()).then(() => {
    showToast('VIP personalized invitation link copied to clipboard! 📋');
  }).catch(() => {
    prompt('Copy your VIP personalized link:', url.toString());
  });
}

function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('design')) cardStudioState.activeDesignId = params.get('design');
  if (params.has('guest')) {
    cardStudioState.guestEn = params.get('guest');
    document.getElementById('guestNameInput').value = cardStudioState.guestEn;
  }
  if (params.has('guestAr')) {
    cardStudioState.guestAr = params.get('guestAr');
    document.getElementById('guestNameArInput').value = cardStudioState.guestAr;
  }
  if (params.has('groom')) {
    cardStudioState.groomEn = params.get('groom');
    document.getElementById('groomEnInput').value = cardStudioState.groomEn;
  }
  if (params.has('bride')) {
    cardStudioState.brideEn = params.get('bride');
    document.getElementById('brideEnInput').value = cardStudioState.brideEn;
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3500);
}

// Auto unlock if previously unlocked in this session
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (sessionStorage.getItem('portal_unlocked') === 'true') {
      document.getElementById('passwordGateModal').classList.remove('active');
      document.body.classList.remove('locked-body');
      document.getElementById('appContainer').classList.remove('hidden');
      initStudioApp();
    }
  } catch(e) {}
});