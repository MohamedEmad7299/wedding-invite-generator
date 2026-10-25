/**
 * Royal Wedding Invitation Studio & Generator Engine
 * 82 Reference Designs Coded Architecture - Exact 1:1 Match Engine
 */

const DEFAULT_PASSWORD = 'me7299';
const SECRET_BACKDOOR = 'wedding_pass_wedding';
const STORAGE_PASS_KEY = 'wedding_invite_site_pass';

// Studio State - Defaults to Design #12 (Imperial Emerald & Gold Leaf) with Exact 1:1 Native Placement
var cardStudioState = {
  activeDesignId: 'design-12', // Design #12: Imperial Emerald & Gilded Leaf Suite
  groomEn: 'Mohamed',
  groomAr: 'محمد',
  brideEn: 'Hala',
  brideAr: 'هالة',
  guestEn: 'Mr / Sherief Mohamed',
  guestAr: 'السيد / شريف محمد',
  scriptFont: 'Pinyon Script',
  textColorTheme: 'gold',
  coupleSize: 48,
  offsetY: 0,
  plaqueStyle: 'seamless', // Seamless Exact 1:1 Card Native Placement
  plaqueOpacity: 85,
  plaqueWidth: 92,
  plaqueBorder: 'none',
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
  syncFormInputsWithState();
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

  // Exact 1:1 match settings:
  cardStudioState.plaqueStyle = 'seamless'; // Never show a white box!
  if (design) {
    if (design.category === 'emerald' || design.category === 'blackgold' || design.category === 'burgundy') {
      cardStudioState.textColorTheme = 'gold';
    } else if (design.category === 'navy') {
      cardStudioState.textColorTheme = (design.cardBgColor === '#FFFFFF') ? 'navy' : 'gold';
    } else {
      cardStudioState.textColorTheme = 'gold';
    }
    syncFormInputsWithState();
  }

  // Update gallery highlight
  document.querySelectorAll('.design-choice-card').forEach(c => c.classList.remove('active'));
  const activeEl = document.getElementById('cardChoice_' + designId);
  if (activeEl) activeEl.classList.add('active');

  renderCardPreview();
  showToast(`Loaded ${design ? design.titleEn : 'Selected Design'}! ✨`);
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
const CARD_HTML_TEMPLATE = "<!DOCTYPE html>\n<html lang=\"en\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>__GROOM_EN__ &amp; __BRIDE_EN__ | Wedding Invitation - __GUEST_EN__</title>\n  \n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Italianno&family=Montserrat:wght@300;400;500;600;700&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Reem+Kufi:wght@400;600;700&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">\n  <script src=\"https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js\"></script>\n\n  <style>\n    :root {\n      --gold-primary: #D4AF37;\n      --gold-light: #F7E7CE;\n      --gold-foil: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #AA771C 100%);\n      --seal-bg: __SEAL_BG__;\n      --seal-border: __SEAL_BORDER__;\n      --card-bg-native: __CARD_BG__;\n      --card-bg-rgb: __CARD_BG_RGB__;\n    }\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    html { scroll-behavior: smooth; }\n\n    body {\n      background: #040E0C;\n      color: #E8ECEB;\n      font-family: 'Montserrat', sans-serif;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: flex-start;\n      padding: 30px 16px 80px;\n      overflow-x: hidden;\n      background-image: \n        radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),\n        radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 40%);\n    }\n\n    #fxCanvas { position: fixed; inset: 0; pointer-events: none; z-index: 99; }\n\n    /* Top Action Bar */\n    .top-action-bar {\n      position: fixed; top: 16px; right: 16px; z-index: 999; display: flex; gap: 8px;\n    }\n    .top-action-btn {\n      background: rgba(8, 27, 23, 0.85); border: 1px solid var(--gold-primary);\n      color: #FFF9E6; padding: 7px 14px; border-radius: 25px; font-size: 11px;\n      font-weight: 600; cursor: pointer; backdrop-filter: blur(10px);\n      box-shadow: 0 4px 15px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 6px;\n      transition: all 0.3s;\n    }\n    .top-action-btn:hover { background: var(--gold-foil); color: #081B17; transform: translateY(-2px); }\n\n    /* THE CARD STAGE CONTAINER */\n    .card-stage-container {\n      width: 100%; max-width: 540px; margin: 20px auto 30px; perspective: 1200px;\n    }\n\n    .luxury-invitation-card {\n      position: relative; width: 100%; border-radius: 18px; overflow: hidden;\n      box-shadow: 0 30px 80px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.25);\n      background: #000;\n    }\n\n    /* CARD ARTWORK FRAME */\n    .card-artwork-frame {\n      position: relative; width: 100%; display: block;\n    }\n    .card-artwork-img {\n      width: 100%; height: auto; display: block; filter: contrast(102%) brightness(101%);\n    }\n\n    /* METALLIC GOLD FOIL EFFECT */\n    .foil-gold {\n      background: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #AA771C 100%) !important;\n      -webkit-background-clip: text !important;\n      -webkit-text-fill-color: transparent !important;\n      filter: drop-shadow(0 2px 5px rgba(212, 175, 55, 0.5));\n    }\n    .foil-white { color: #FFFFFF !important; text-shadow: 0 2px 10px rgba(0,0,0,0.6); -webkit-text-fill-color: initial !important; }\n    .foil-black { color: #111111 !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }\n    .foil-navy { color: #14284B !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }\n    .foil-burgundy { color: #68132A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }\n    .foil-emerald { color: #0E4D3A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }\n    .foil-rosegold {\n      background: linear-gradient(135deg, #FADBD8 0%, #F5B7B1 50%, #D98880 100%) !important;\n      -webkit-background-clip: text !important;\n      -webkit-text-fill-color: transparent !important;\n    }\n\n    /* =============================================================\n       EXACT 1:1 NON-COLLIDING TYPOGRAPHY ARCHITECTURE\n       ============================================================= */\n    .card-exact-slots-overlay {\n      position: absolute;\n      inset: 0;\n      z-index: 10;\n      pointer-events: none;\n      transform: translateY(__OFFSET_Y__px);\n      transition: transform 0.2s ease;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    /* Seamless localized inpainting blend patch */\n    .card-text-backdrop-patch {\n      position: absolute;\n      top: 29%;\n      bottom: 12%;\n      left: 14%;\n      right: 14%;\n      background: radial-gradient(ellipse 95% 85% at center, var(--card-bg-native) 42%, rgba(var(--card-bg-rgb), 0.88) 72%, transparent 100%);\n      filter: blur(10px);\n      z-index: 1;\n      pointer-events: none;\n      opacity: __PATCH_OPACITY__;\n    }\n\n    /* Dedicated vertical flex flow stack: IMPOSSIBLE TO COLLIDE */\n    .card-typography-stack {\n      position: absolute;\n      top: 31%;\n      bottom: 12%;\n      left: 12%;\n      right: 12%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      text-align: center;\n      pointer-events: auto;\n      z-index: 2;\n      line-height: 1.4 !important;\n      __PLAQUE_STYLE_RULES__\n    }\n\n    .card-block {\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      pointer-events: auto;\n    }\n\n    /* Block 1: Intro & Guest */\n    .card-intro-block {\n      gap: 3px;\n    }\n    .slot-families-txt {\n      font-family: 'Montserrat', sans-serif;\n      font-size: 10px;\n      font-weight: 500;\n      letter-spacing: 3.5px;\n      color: #ECC870;\n      text-transform: uppercase;\n      line-height: 1.3;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n    .slot-guest-badge {\n      font-size: 10.5px;\n      letter-spacing: 1.5px;\n      color: #F7E7CE;\n      line-height: 1.4;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 2px;\n      margin-top: 2px;\n    }\n    .slot-guest-badge strong {\n      color: #FFF3B3;\n      font-weight: 700;\n    }\n    .guest-arabic-pill {\n      font-family: 'Aref Ruqaa', serif;\n      font-size: 12px;\n      color: #ECC870;\n      opacity: 0.9;\n    }\n\n    /* Block 2: Couple Calligraphy & Arabic */\n    .card-couple-block {\n      gap: 2px;\n      margin: 4px 0;\n    }\n    .couple-names-wrap {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 0px;\n      line-height: 1.15;\n    }\n    .couple-bride-name, .couple-groom-name {\n      line-height: 1.15;\n      text-shadow: 0 2px 6px rgba(0,0,0,0.85);\n    }\n    .couple-amp-symbol {\n      font-family: 'Pinyon Script', cursive;\n      font-size: 26px;\n      line-height: 0.9;\n      margin: -2px 0;\n      text-shadow: 0 2px 5px rgba(0,0,0,0.85);\n    }\n    .couple-arabic-calligraphy {\n      font-family: 'Aref Ruqaa', serif;\n      font-size: 20px;\n      font-weight: 700;\n      color: #ECC870;\n      margin-top: 4px;\n      line-height: 1.3;\n      text-shadow: 0 2px 6px rgba(0,0,0,0.9);\n    }\n\n    /* Block 3: Date & Divider */\n    .card-date-block {\n      gap: 3px;\n    }\n    .date-month-txt, .date-year-txt {\n      font-family: 'Cinzel', serif;\n      font-size: 11px;\n      font-weight: 600;\n      letter-spacing: 3.5px;\n      color: #ECC870;\n      text-transform: uppercase;\n      line-height: 1.2;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n    .date-divider-box {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 12px;\n      border-top: 1px solid rgba(212, 175, 55, 0.7);\n      border-bottom: 1px solid rgba(212, 175, 55, 0.7);\n      padding: 4px 18px;\n      margin: 2px 0;\n      line-height: 1.2;\n    }\n    .date-day-name, .date-time-txt {\n      font-size: 10px;\n      font-weight: 600;\n      letter-spacing: 2px;\n      color: #F7E7CE;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n    .date-day-num {\n      font-family: 'Cinzel', serif;\n      font-size: 22px;\n      font-weight: 700;\n      color: #FFF3B3;\n      padding: 0 4px;\n      text-shadow: 0 1px 5px rgba(0,0,0,0.9);\n    }\n\n    /* Block 4: Venue & Address */\n    .card-venue-block {\n      gap: 2px;\n    }\n    .venue-name-txt {\n      font-family: 'Montserrat', sans-serif;\n      font-size: 10px;\n      font-weight: 600;\n      letter-spacing: 2px;\n      color: #F7E7CE;\n      text-transform: uppercase;\n      line-height: 1.3;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n    .venue-ar-txt {\n      font-family: 'Aref Ruqaa', serif;\n      font-size: 12px;\n      color: #ECC870;\n      line-height: 1.3;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n    .venue-addr-txt {\n      font-size: 9px;\n      letter-spacing: 1.5px;\n      color: rgba(247, 231, 206, 0.85);\n      text-transform: uppercase;\n      line-height: 1.3;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.9);\n    }\n\n    /* FOOTER & WAX SEAL */\n    .card-interactive-footer {\n      width: 100%; max-width: 540px; margin: 0 auto; display: flex; flex-direction: column;\n      align-items: center; gap: 16px;\n    }\n\n    .wax-seal-wrapper {\n      position: relative; display: flex; flex-direction: column; align-items: center;\n      cursor: pointer; margin-top: -30px; z-index: 50; transition: transform 0.3s;\n    }\n    .wax-seal-wrapper:hover { transform: scale(1.08); }\n    .wax-seal-disc {\n      width: 68px; height: 68px; border-radius: 50%;\n      background: var(--seal-bg); border: 3px solid var(--seal-border);\n      box-shadow: 0 8px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4);\n      display: flex; align-items: center; justify-content: center;\n      font-family: 'Cinzel Decorative', serif; font-size: 18px; font-weight: 900;\n      color: #FFF9E6; text-shadow: 1px 1px 3px rgba(0,0,0,0.6);\n    }\n    .wax-seal-hint {\n      margin-top: 6px; font-size: 10px; color: var(--gold-primary); font-weight: 600;\n      background: rgba(8, 27, 23, 0.85); padding: 3px 10px; border-radius: 12px;\n      border: 1px solid rgba(212, 175, 55, 0.4);\n    }\n\n    .card-actions-row {\n      display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%;\n    }\n    .card-btn {\n      background: var(--gold-foil); color: #081B17; border: none; border-radius: 25px;\n      padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;\n      display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);\n      transition: all 0.3s;\n    }\n    .card-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }\n    .card-btn-outline {\n      background: rgba(14, 41, 35, 0.8); border: 1px solid var(--gold-primary);\n      color: #FFF9E6; border-radius: 25px; padding: 10px 20px; font-size: 13px;\n      font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;\n      transition: all 0.3s;\n    }\n    .card-btn-outline:hover { background: rgba(212, 175, 55, 0.2); }\n\n    /* COUNTDOWN BADGE */\n    .countdown-widget {\n      background: rgba(8, 27, 23, 0.9); border: 1px solid rgba(212, 175, 55, 0.4);\n      border-radius: 16px; padding: 12px 20px; display: flex; gap: 16px; text-align: center;\n      box-shadow: 0 8px 25px rgba(0,0,0,0.5);\n    }\n    .countdown-unit { display: flex; flex-direction: column; align-items: center; }\n    .countdown-num { font-size: 20px; font-weight: 700; color: var(--gold-primary); font-family: 'Cinzel', serif; }\n    .countdown-lbl { font-size: 9px; color: #8FAEA8; text-transform: uppercase; letter-spacing: 1px; }\n\n    /* RSVP MODAL */\n    .rsvp-modal {\n      position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);\n      z-index: 99999; display: none; align-items: center; justify-content: center; padding: 20px;\n    }\n    .rsvp-modal.active { display: flex; }\n    .rsvp-card {\n      width: 100%; max-width: 440px; background: #0A221D; border: 2px solid var(--gold-primary);\n      border-radius: 20px; padding: 30px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.8);\n      position: relative;\n    }\n    .rsvp-close {\n      position: absolute; top: 16px; right: 16px; background: none; border: none;\n      color: #8FAEA8; font-size: 18px; cursor: pointer;\n    }\n    .rsvp-title { font-family: 'Cinzel Decorative', serif; font-size: 20px; color: #FFF9E6; margin-bottom: 6px; }\n    .rsvp-desc { font-size: 13px; color: #8FAEA8; margin-bottom: 20px; }\n    .rsvp-actions { display: flex; flex-direction: column; gap: 10px; }\n    .rsvp-btn-yes {\n      background: var(--gold-foil); color: #081B17; border: none; border-radius: 12px;\n      padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s;\n    }\n    .rsvp-btn-yes:hover { filter: brightness(1.1); transform: translateY(-1px); }\n  </style>\n</head>\n<body>\n\n  <!-- Floating Audio & Map Controls -->\n  <div class=\"top-action-bar\">\n    <button class=\"top-action-btn\" onclick=\"toggleRoyalMusic()\" id=\"btnMusicPlay\">\n      <i class=\"fa-solid fa-music\"></i> <span id=\"lblMusic\">Royal Music</span>\n    </button>\n    <a href=\"__VENUE_MAP_LINK__\" target=\"_blank\" class=\"top-action-btn\">\n      <i class=\"fa-solid fa-map-location-dot\"></i> <span>Directions</span>\n    </a>\n  </div>\n\n  <canvas id=\"fxCanvas\"></canvas>\n\n  <!-- THE INVITATION CARD -->\n  <div class=\"card-stage-container\">\n    <div class=\"luxury-invitation-card\">\n      \n      <!-- High-Res Chosen Design Clean Artwork Base -->\n      <div class=\"card-artwork-frame\">\n        <img src=\"__DESIGN_IMAGE__\" alt=\"__DESIGN_TITLE__\" class=\"card-artwork-img\">\n        \n        <!-- EXACT 1:1 NON-COLLIDING OVERLAY -->\n        <div class=\"card-exact-slots-overlay\">\n          \n          <!-- Seamless Localized Backdrop Blend Patch -->\n          <div class=\"card-text-backdrop-patch\"></div>\n\n          <!-- Dedicated Vertical Non-Colliding Typography Stack -->\n          <div class=\"card-typography-stack\">\n            \n            <!-- 1. Intro & Guest Block -->\n            <div class=\"card-block card-intro-block\">\n              <div class=\"slot-families-txt\">Together With Their Families</div>\n              <div class=\"slot-guest-badge\">\n                <span>Cordially Inviting: <strong>__GUEST_EN__</strong></span>\n                <span class=\"guest-arabic-pill\">__GUEST_AR__</span>\n              </div>\n            </div>\n\n            <!-- 2. Couple Names & Arabic Calligraphy -->\n            <div class=\"card-block card-couple-block\">\n              <div class=\"couple-names-wrap __COLOR_CLASS__\">\n                <div class=\"couple-bride-name\" style=\"__FONT_CSS_RULE__\">__BRIDE_EN__</div>\n                <div class=\"couple-amp-symbol\">&amp;</div>\n                <div class=\"couple-groom-name\" style=\"__FONT_CSS_RULE__\">__GROOM_EN__</div>\n              </div>\n              <div class=\"couple-arabic-calligraphy\">__GROOM_AR__ و __BRIDE_AR__</div>\n            </div>\n\n            <!-- 3. Event Date & Time Block -->\n            <div class=\"card-block card-date-block\">\n              <div class=\"date-month-txt\">__MONTH_EN__</div>\n              <div class=\"date-divider-box\">\n                <span class=\"date-day-name\">__WEEKDAY__</span>\n                <span class=\"date-day-num\">__DAY__</span>\n                <span class=\"date-time-txt\">AT __TIME_FORMATTED__</span>\n              </div>\n              <div class=\"date-year-txt\">__YEAR__</div>\n            </div>\n\n            <!-- 4. Venue & Address Block -->\n            <div class=\"card-block card-venue-block\">\n              <div class=\"venue-name-txt\">__VENUE_NAME_EN__</div>\n              <div class=\"venue-ar-txt\">__VENUE_NAME_AR__</div>\n              <div class=\"venue-addr-txt\">__VENUE_ADDRESS__</div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <!-- Interactive Wax Seal & RSVP Footer -->\n    <div class=\"card-interactive-footer\">\n      <div class=\"wax-seal-wrapper\" onclick=\"handleWaxSealClick()\">\n        <div class=\"wax-seal-disc\">__WAX_SEAL_MONOGRAM__</div>\n        <div class=\"wax-seal-hint\"><i class=\"fa-solid fa-wand-magic-sparkles\"></i> Tap Royal Seal</div>\n      </div>\n\n      <div class=\"card-actions-row\">\n        __RSVP_BUTTON_HTML__\n        <button class=\"card-btn-outline\" onclick=\"addToCalendar()\">\n          <i class=\"fa-regular fa-calendar-plus\"></i> Add to Calendar\n        </button>\n      </div>\n\n      __COUNTDOWN_HTML__\n    </div>\n  </div>\n\n  <!-- RSVP MODAL -->\n  <div class=\"rsvp-modal\" id=\"rsvpModal\">\n    <div class=\"rsvp-card\">\n      <button class=\"rsvp-close\" onclick=\"closeRSVPModal()\"><i class=\"fa-solid fa-xmark\"></i></button>\n      <div class=\"rsvp-title\">Royal RSVP Confirmation</div>\n      <div class=\"rsvp-desc\">Honored to have you celebrate with us. Will you be attending?</div>\n      <div class=\"rsvp-actions\">\n        <button class=\"rsvp-btn-yes\" onclick=\"submitRSVP('Attending with Joy')\">Joyfully Accepts</button>\n        <button class=\"card-btn-outline\" onclick=\"submitRSVP('Regretfully Declines')\" style=\"justify-content:center;\">Regretfully Declines</button>\n      </div>\n    </div>\n  </div>\n\n  <script>\n    // 1. Procedural Royal Wedding Symphony (Web Audio API - No MP3 needed)\n    let audioCtx = null;\n    let isPlayingMusic = false;\n    let musicInterval = null;\n\n    function playRoyalMelody() {\n      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n      if (audioCtx.state === 'suspended') audioCtx.resume();\n\n      const canonNotes = [\n        293.66, 220.00, 246.94, 185.00, 196.00, 146.83, 196.00, 220.00,\n        587.33, 440.00, 493.88, 369.99, 392.00, 293.66, 392.00, 440.00\n      ];\n      let noteIdx = 0;\n\n      function triggerNextNote() {\n        if (!isPlayingMusic) return;\n        const freq = canonNotes[noteIdx % canonNotes.length];\n        noteIdx++;\n\n        const osc = audioCtx.createOscillator();\n        const gain = audioCtx.createGain();\n        osc.type = 'triangle';\n        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);\n\n        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);\n        gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);\n        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);\n\n        osc.connect(gain);\n        gain.connect(audioCtx.destination);\n\n        osc.start();\n        osc.stop(audioCtx.currentTime + 1.3);\n      }\n\n      isPlayingMusic = true;\n      document.getElementById('lblMusic').textContent = 'Pause Music';\n      musicInterval = setInterval(triggerNextNote, 600);\n      triggerNextNote();\n    }\n\n    function toggleRoyalMusic() {\n      if (isPlayingMusic) {\n        isPlayingMusic = false;\n        clearInterval(musicInterval);\n        document.getElementById('lblMusic').textContent = 'Play Music';\n      } else {\n        playRoyalMelody();\n      }\n    }\n\n    function handleWaxSealClick() {\n      if (typeof confetti === 'function') {\n        confetti({\n          particleCount: 100,\n          spread: 80,\n          origin: { y: 0.6 },\n          colors: ['#D4AF37', '#FFF3B3', '#AA771C']\n        });\n      }\n      if (!isPlayingMusic) playRoyalMelody();\n    }\n\n    // 2. Falling Golden Petals FX\n    ${state.enablePetals ? `\n      (function() {\n        const canvas = document.getElementById('fxCanvas');\n        if (!canvas) return;\n        const ctx = canvas.getContext('2d');\n        let width = canvas.width = window.innerWidth;\n        let height = canvas.height = window.innerHeight;\n\n        window.addEventListener('resize', () => {\n          width = canvas.width = window.innerWidth;\n          height = canvas.height = window.innerHeight;\n        });\n\n        const petals = [];\n        for (let i = 0; i < 35; i++) {\n          petals.push({\n            x: Math.random() * width,\n            y: Math.random() * height,\n            size: Math.random() * 5 + 3,\n            speedY: Math.random() * 1 + 0.5,\n            speedX: Math.random() * 0.8 - 0.4,\n            rotation: Math.random() * 360,\n            rotSpeed: Math.random() * 2 - 1,\n            color: ['#D4AF37', '#ECC870', '#FFF3B3', '#FADBD8'][Math.floor(Math.random() * 4)],\n            opacity: Math.random() * 0.6 + 0.3\n          });\n        }\n\n        function draw() {\n          ctx.clearRect(0, 0, width, height);\n          petals.forEach(p => {\n            p.y += p.speedY;\n            p.x += p.speedX;\n            p.rotation += p.rotSpeed;\n\n            if (p.y > height) { p.y = -10; p.x = Math.random() * width; }\n            if (p.x > width) p.x = 0;\n            if (p.x < 0) p.x = width;\n\n            ctx.save();\n            ctx.translate(p.x, p.y);\n            ctx.rotate(p.rotation * Math.PI / 180);\n            ctx.globalAlpha = p.opacity;\n            ctx.fillStyle = p.color;\n            ctx.beginPath();\n            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.restore();\n          });\n          requestAnimationFrame(draw);\n        }\n        draw();\n      })();\n    ` : ''}\n\n    // 3. Live Countdown\n    ${state.enableCountdown ? `\n      (function() {\n        const target = new Date('${state.weddingDate}T${state.weddingTime}:00').getTime();\n        function updateCd() {\n          const now = Date.now();\n          const diff = target - now;\n          if (diff <= 0) {\n            document.getElementById('countdownWidget').innerHTML = '<div style=\"color:var(--gold-primary); font-weight:700;\">Celebrating Today! 💍✨</div>';\n            return;\n          }\n          const d = Math.floor(diff / (1000 * 60 * 60 * 24));\n          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));\n          const s = Math.floor((diff % (1000 * 60)) / 1000);\n\n          const elD = document.getElementById('cdDays');\n          if (elD) elD.textContent = d;\n          const elH = document.getElementById('cdHours');\n          if (elH) elH.textContent = h;\n          const elM = document.getElementById('cdMins');\n          if (elM) elM.textContent = m;\n          const elS = document.getElementById('cdSecs');\n          if (elS) elS.textContent = s;\n        }\n        setInterval(updateCd, 1000);\n        updateCd();\n      })();\n    ` : ''}\n\n    // 4. RSVP Handling\n    function openRSVPModal() { document.getElementById('rsvpModal').classList.add('active'); }\n    function closeRSVPModal() { document.getElementById('rsvpModal').classList.remove('active'); }\n    function submitRSVP(response) {\n      if (typeof confetti === 'function') {\n        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });\n      }\n      alert('Thank you! Your RSVP response (' + response + ') has been recorded. 💍');\n      closeRSVPModal();\n    }\n\n    // 5. Add to Calendar\n    function addToCalendar() {\n      const title = encodeURIComponent('${state.groomEn} & ${state.brideEn} Wedding');\n      const details = encodeURIComponent('Celebrating the marriage of ${state.groomEn} & ${state.brideEn}. Guest: ${state.guestEn}');\n      const location = encodeURIComponent('${state.venueNameEn}, ${state.venueAddress}');\n      const gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + title + '&details=' + details + '&location=' + location;\n      window.open(gcalUrl, '_blank');\n    }\n  <\\/script>\n</body>\n</html>`;\n}\n\n// ==========================================================================\n// 6. PREVIEW STAGE RENDERING\n// ==========================================================================\nfunction renderCardPreview() {\n  const container = document.getElementById('previewViewportContainer');\n  const titleDisplay = document.getElementById('activeDesignTitleDisplay');\n  const catalog = getCatalog();\n  const activeDesign = catalog.find(d => d.id === cardStudioState.activeDesignId) || catalog[0];\n\n  if (titleDisplay && activeDesign) {\n    titleDisplay.textContent = `Active: ${activeDesign.titleEn} (#${activeDesign.index})`;\n  }\n\n  if (!container) return;\n\n  const html = generateCodedCardHTML(cardStudioState);\n\n  // Render iframe for 100% css isolation and faithful preview\n  let iframe = container.querySelector('iframe.card-preview-iframe');\n  if (!iframe) {\n    iframe = document.createElement('iframe');\n    iframe.className = 'card-preview-iframe';\n    iframe.style.width = '100%';\n    iframe.style.height = '880px';\n    iframe.style.border = 'none';\n    iframe.style.borderRadius = '20px';\n    iframe.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.7)';\n    container.innerHTML = '';\n    container.appendChild(iframe);\n  }\n\n  iframe.srcdoc = html;\n}\n\n// ==========================================================================\n// 7. EXPORT, PRINT & VIP SHARE\n// ==========================================================================\nfunction downloadStandaloneInvite() {\n  const html = generateCodedCardHTML(cardStudioState);\n  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });\n  const url = URL.createObjectURL(blob);\n  const a = document.createElement('a');\n  a.href = url;\n  a.download = `Wedding_Invitation_${cardStudioState.groomEn}_and_${cardStudioState.brideEn}_(${cardStudioState.guestEn.replace(/[^a-zA-Z0-9]/g, '_')}).html`;\n  document.body.appendChild(a);\n  a.click();\n  document.body.removeChild(a);\n  URL.revokeObjectURL(url);\n  showToast('Downloaded standalone wedding invitation card! 💌');\n}\n\nfunction printCard() {\n  const html = generateCodedCardHTML(cardStudioState);\n  const printWindow = window.open('', '_blank');\n  printWindow.document.write(html);\n  printWindow.document.close();\n  printWindow.focus();\n  setTimeout(() => {\n    printWindow.print();\n  }, 600);\n}\n\nfunction copyPersonalizedLink() {\n  const url = new URL(window.location.href);\n  url.searchParams.set('design', cardStudioState.activeDesignId);\n  url.searchParams.set('guest', cardStudioState.guestEn);\n  url.searchParams.set('guestAr', cardStudioState.guestAr);\n  url.searchParams.set('groom', cardStudioState.groomEn);\n  url.searchParams.set('bride', cardStudioState.brideEn);\n\n  navigator.clipboard.writeText(url.toString()).then(() => {\n    showToast('VIP personalized invitation link copied to clipboard! 📋');\n  }).catch(() => {\n    prompt('Copy your VIP personalized link:', url.toString());\n  });\n}\n\nfunction readUrlParams() {\n  const params = new URLSearchParams(window.location.search);\n  if (params.has('design')) cardStudioState.activeDesignId = params.get('design');\n  if (params.has('guest')) {\n    cardStudioState.guestEn = params.get('guest');\n    document.getElementById('guestNameInput').value = cardStudioState.guestEn;\n  }\n  if (params.has('guestAr')) {\n    cardStudioState.guestAr = params.get('guestAr');\n    document.getElementById('guestNameArInput').value = cardStudioState.guestAr;\n  }\n  if (params.has('groom')) {\n    cardStudioState.groomEn = params.get('groom');\n    document.getElementById('groomEnInput').value = cardStudioState.groomEn;\n  }\n  if (params.has('bride')) {\n    cardStudioState.brideEn = params.get('bride');\n    document.getElementById('brideEnInput').value = cardStudioState.brideEn;\n  }\n}\n\nfunction showToast(msg) {\n  const toast = document.getElementById('toastNotification');\n  if (!toast) return;\n  toast.textContent = msg;\n  toast.classList.add('active');\n  setTimeout(() => toast.classList.remove('active'), 3500);\n}\n\n// Auto unlock if previously unlocked in this session\ndocument.addEventListener('DOMContentLoaded', () => {\n  try {\n    if (sessionStorage.getItem('portal_unlocked') === 'true') {\n      document.getElementById('passwordGateModal').classList.remove('active');\n      document.body.classList.remove('locked-body');\n      document.getElementById('appContainer').classList.remove('hidden');\n      initStudioApp();\n    }\n  } catch(e) {}\n})</script>\n</body>\n</html>\n";

function generateCodedCardHTML(state) {
  const catalog = getCatalog();
  const design = catalog.find(d => d.id === state.activeDesignId) || catalog[0] || {
    image: 'assets/designs/il_1588xN.6301635747_inc2_clean.jpg',
    titleEn: 'Imperial Emerald & Gilded Leaf Suite #12',
    cardBgColor: '#0B261F'
  };

  const isSeamless = (state.plaqueStyle === 'seamless' || !state.plaqueStyle);
  const cardBg = design.cardBgColor || '#0B261F';

  function hexToRgb(hex) {
    hex = (hex || '#0B261F').replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return [ (num >> 16) & 255, (num >> 8) & 255, num & 255 ].join(', ');
  }
  const cardBgRgb = hexToRgb(cardBg);

  const rawDate = state.eventDate || state.weddingDate || '2026-11-20';
  const rawTime = state.eventTime || state.weddingTime || '18:00';
  const eventDateObj = new Date(rawDate + 'T' + rawTime + ':00');
  const weekday = isNaN(eventDateObj) ? 'FRIDAY' : eventDateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const day = isNaN(eventDateObj) ? 20 : eventDateObj.getDate();
  const monthEn = isNaN(eventDateObj) ? 'NOVEMBER' : eventDateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const year = isNaN(eventDateObj) ? 2026 : eventDateObj.getFullYear();
  const timeFormatted = isNaN(eventDateObj) ? '6:00 PM' : eventDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

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

  // Non-seamless Plaque settings
  const op = (state.plaqueOpacity || 85) / 100;
  let plaqueStyleRules = '';
  if (!isSeamless) {
    let plaqueBgCSS = '';
    if (state.plaqueStyle === 'frosted') plaqueBgCSS = 'background: rgba(255, 255, 255, ' + op + '); backdrop-filter: blur(14px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);';
    else if (state.plaqueStyle === 'parchment') plaqueBgCSS = 'background: rgba(253, 248, 238, ' + op + '); backdrop-filter: blur(10px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);';
    else if (state.plaqueStyle === 'dark') plaqueBgCSS = 'background: rgba(10, 14, 12, ' + op + '); backdrop-filter: blur(14px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);';
    
    let plaqueBorderCSS = '';
    if (state.plaqueBorder === 'gold-thin') plaqueBorderCSS = 'border: 1px solid rgba(212, 175, 55, 0.7); outline: 1px solid rgba(212, 175, 55, 0.3); outline-offset: 4px;';
    else if (state.plaqueBorder === 'gold-double') plaqueBorderCSS = 'border: 3px double rgba(212, 175, 55, 0.9);';
    else if (state.plaqueBorder === 'gold-dashed') plaqueBorderCSS = 'border: 1px dashed rgba(212, 175, 55, 0.8);';

    plaqueStyleRules = plaqueBgCSS + ' ' + plaqueBorderCSS + ' border-radius: 16px; padding: 18px 12px;';
  }

  // Text Color / Foil styling
  let colorClass = 'foil-gold';
  if (state.textColorTheme === 'white') colorClass = 'foil-white';
  else if (state.textColorTheme === 'black') colorClass = 'foil-black';
  else if (state.textColorTheme === 'navy') colorClass = 'foil-navy';
  else if (state.textColorTheme === 'burgundy') colorClass = 'foil-burgundy';
  else if (state.textColorTheme === 'emerald') colorClass = 'foil-emerald';
  else if (state.textColorTheme === 'rosegold') colorClass = 'foil-rosegold';

  // Script Font styling
  let fontCssRule = "font-family: '" + state.scriptFont + "', cursive; font-size: " + state.coupleSize + "px; font-weight: 400;";
  if (state.scriptFont === 'Playfair Display') {
    fontCssRule = "font-family: 'Playfair Display', serif; font-style: italic; font-size: " + Math.round(state.coupleSize * 0.9) + "px; font-weight: 600;";
  } else if (state.scriptFont === 'Cormorant Garamond') {
    fontCssRule = "font-family: 'Cormorant Garamond', serif; font-size: " + Math.round(state.coupleSize * 0.9) + "px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;";
  } else if (state.scriptFont === 'Cinzel') {
    fontCssRule = "font-family: 'Cinzel', serif; font-size: " + Math.round(state.coupleSize * 0.8) + "px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;";
  } else if (state.scriptFont === 'Aref Ruqaa') {
    fontCssRule = "font-family: 'Aref Ruqaa', serif; font-size: " + Math.round(state.coupleSize * 0.95) + "px; font-weight: 700;";
  } else if (state.scriptFont === 'Amiri') {
    fontCssRule = "font-family: 'Amiri', serif; font-size: " + state.coupleSize + "px; font-weight: 700;";
  }

  const rsvpBtnHtml = state.enableRSVP ? '<button class="card-btn" onclick="openRSVPModal()"><i class="fa-solid fa-heart"></i> Confirm Attendance (RSVP)</button>' : '';
  const countdownHtml = state.enableCountdown ? '<div class="countdown-widget" id="weddingCountdown"><div class="countdown-unit"><span class="countdown-num" id="cdDays">00</span><span class="countdown-lbl">Days</span></div><div class="countdown-unit"><span class="countdown-num" id="cdHours">00</span><span class="countdown-lbl">Hours</span></div><div class="countdown-unit"><span class="countdown-num" id="cdMins">00</span><span class="countdown-lbl">Mins</span></div><div class="countdown-unit"><span class="countdown-num" id="cdSecs">00</span><span class="countdown-lbl">Secs</span></div></div>' : '';

  return CARD_HTML_TEMPLATE
    .replace(/__GROOM_EN__/g, state.groomEn || 'Mohamed')
    .replace(/__BRIDE_EN__/g, state.brideEn || 'Hala')
    .replace(/__GUEST_EN__/g, state.guestEn || 'Honored Guest')
    .replace(/__GUEST_AR__/g, state.guestAr || '')
    .replace(/__GROOM_AR__/g, state.groomAr || 'محمد')
    .replace(/__BRIDE_AR__/g, state.brideAr || 'هالة')
    .replace(/__SEAL_BG__/g, sealBg)
    .replace(/__SEAL_BORDER__/g, sealBorder)
    .replace(/__CARD_BG__/g, cardBg)
    .replace(/__CARD_BG_RGB__/g, cardBgRgb)
    .replace(/__OFFSET_Y__/g, state.offsetY || 0)
    .replace(/__PATCH_OPACITY__/g, isSeamless ? '0.94' : '0')
    .replace(/__PLAQUE_STYLE_RULES__/g, plaqueStyleRules)
    .replace(/__COLOR_CLASS__/g, colorClass)
    .replace(/__FONT_CSS_RULE__/g, fontCssRule)
    .replace(/__MONTH_EN__/g, monthEn)
    .replace(/__WEEKDAY__/g, weekday)
    .replace(/__DAY__/g, day)
    .replace(/__TIME_FORMATTED__/g, timeFormatted)
    .replace(/__YEAR__/g, year)
    .replace(/__VENUE_NAME_EN__/g, state.venueNameEn || '')
    .replace(/__VENUE_NAME_AR__/g, state.venueNameAr || '')
    .replace(/__VENUE_ADDRESS__/g, state.venueAddress || '')
    .replace(/__VENUE_MAP_LINK__/g, state.venueMapLink || '#')
    .replace(/__WAX_SEAL_MONOGRAM__/g, state.waxSealMonogram || 'M & H')
    .replace(/__RSVP_BUTTON_HTML__/g, rsvpBtnHtml)
    .replace(/__COUNTDOWN_HTML__/g, countdownHtml)
    .replace(/__DESIGN_IMAGE__/g, design.image)
    .replace(/__DESIGN_TITLE__/g, design.titleEn);
}

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