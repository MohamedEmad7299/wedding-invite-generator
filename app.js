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
function generateCodedCardHTML(state) {
  const catalog = getCatalog();
  const design = catalog.find(d => d.id === state.activeDesignId) || catalog[0] || {
    image: 'assets/designs/il_1588xN.6301635747_inc2_clean.jpg',
    titleEn: 'Imperial Emerald & Gilded Leaf Suite #12',
    cardBgColor: '#0B261F'
  };

  const isSeamless = (state.plaqueStyle === 'seamless' || !state.plaqueStyle);
  const cardBg = design.cardBgColor || '#0B261F';

  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}:00`);
  const weekday = eventDateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const day = eventDateObj.getDate();
  const monthEn = eventDateObj.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const year = eventDateObj.getFullYear();
  const timeFormatted = eventDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

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
  const op = state.plaqueOpacity / 100;
  let plaqueBgCSS = 'background: transparent; backdrop-filter: none; box-shadow: none; border: none;';
  let plaqueBorderCSS = '';
  if (!isSeamless) {
    if (state.plaqueStyle === 'frosted') plaqueBgCSS = `background: rgba(255, 255, 255, ${op}); backdrop-filter: blur(14px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);`;
    else if (state.plaqueStyle === 'parchment') plaqueBgCSS = `background: rgba(253, 248, 238, ${op}); backdrop-filter: blur(10px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);`;
    else if (state.plaqueStyle === 'dark') plaqueBgCSS = `background: rgba(10, 14, 12, ${op}); backdrop-filter: blur(14px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);`;
    
    if (state.plaqueBorder === 'gold-thin') plaqueBorderCSS = 'border: 1px solid rgba(212, 175, 55, 0.7); outline: 1px solid rgba(212, 175, 55, 0.3); outline-offset: 4px;';
    else if (state.plaqueBorder === 'gold-double') plaqueBorderCSS = 'border: 3px double rgba(212, 175, 55, 0.9);';
    else if (state.plaqueBorder === 'gold-dashed') plaqueBorderCSS = 'border: 1px dashed rgba(212, 175, 55, 0.8);';
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
      --gold-light: #F7E7CE;
      --gold-foil: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #AA771C 100%);
      --seal-bg: ${sealBg};
      --seal-border: ${sealBorder};
      --card-bg-native: ${cardBg};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #040E0C;
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
        radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 40%);
    }

    #fxCanvas { position: fixed; inset: 0; pointer-events: none; z-index: 99; }

    /* Top Action Bar */
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

    /* THE CARD STAGE CONTAINER */
    .card-stage-container {
      width: 100%; max-width: 540px; margin: 20px auto 30px; perspective: 1200px;
    }

    .luxury-invitation-card {
      position: relative; width: 100%; border-radius: 18px; overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.25);
      background: #000;
    }

    /* CARD ARTWORK FRAME */
    .card-artwork-frame {
      position: relative; width: 100%; display: block; line-height: 0;
    }
    .card-artwork-img {
      width: 100%; height: auto; display: block; filter: contrast(102%) brightness(101%);
    }

    /* METALLIC GOLD FOIL EFFECT */
    .foil-gold {
      background: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #AA771C 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      filter: drop-shadow(0 2px 5px rgba(212, 175, 55, 0.5));
    }
    .foil-white { color: #FFFFFF !important; text-shadow: 0 2px 10px rgba(0,0,0,0.6); -webkit-text-fill-color: initial !important; }
    .foil-navy { color: #14284B !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-burgundy { color: #68132A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }
    .foil-emerald { color: #0E4D3A !important; text-shadow: 0 1px 2px rgba(255,255,255,0.4); -webkit-text-fill-color: initial !important; }

    /* =============================================================
       EXACT 1:1 SLOTTED OVERLAY ARCHITECTURE
       (Text lands precisely where the old text was located)
       ============================================================= */
    .card-exact-slots-overlay {
      position: absolute;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      transform: translateY(${state.offsetY}px);
      transition: transform 0.2s ease;
    }

    /* Center axis aligned to the card: 48.5% X */
    .slot-item {
      position: absolute;
      left: 48.5%;
      transform: translateX(-50%);
      width: 65%;
      text-align: center;
      pointer-events: auto;
    }

    /* Slot 1: "TOGETHER WITH THEIR FAMILIES" (Y: ~35.5%) */
    .slot-intro {
      top: 35.5%;
    }
    .slot-families-txt {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 3.8px;
      color: #ECC870;
      text-transform: uppercase;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .slot-guest-badge {
      font-size: 10px;
      letter-spacing: 1.5px;
      color: #F7E7CE;
      margin-top: 3px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .slot-guest-badge strong {
      color: #FFF3B3;
      font-weight: 700;
    }

    /* Slot 2: Bride & Groom Calligraphy (Y: ~43.5% to ~59%) */
    .slot-bride {
      top: 42.5%;
      ${fontCssRule}
      line-height: 1;
      text-shadow: 0 2px 6px rgba(0,0,0,0.85);
    }

    .slot-amp {
      top: 49.5%;
      font-family: 'Pinyon Script', cursive;
      font-size: 28px;
      line-height: 1;
      text-shadow: 0 2px 5px rgba(0,0,0,0.85);
    }

    .slot-groom {
      top: 53.5%;
      ${fontCssRule}
      line-height: 1;
      text-shadow: 0 2px 6px rgba(0,0,0,0.85);
    }

    .slot-arabic {
      top: 60.5%;
      font-family: 'Aref Ruqaa', serif;
      font-size: 20px;
      font-weight: 700;
      color: #ECC870;
      text-shadow: 0 2px 6px rgba(0,0,0,0.9);
    }

    /* Slot 3: Month "SEPTEMBER" -> "NOVEMBER" (Y: ~65%) */
    .slot-month {
      top: 65.5%;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 3.5px;
      color: #ECC870;
      text-transform: uppercase;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }

    /* Slot 4: Divider Lines "SATURDAY | 25 | AT 7 PM" (Y: ~69.5%) */
    .slot-date-divider {
      top: 69.5%;
    }
    .date-divider-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      border-top: 1px solid rgba(212, 175, 55, 0.7);
      border-bottom: 1px solid rgba(212, 175, 55, 0.7);
      padding: 4px 20px;
    }
    .date-day-name, .date-time-txt {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #F7E7CE;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .date-day-num {
      font-family: 'Cinzel', serif;
      font-size: 22px;
      font-weight: 700;
      color: #FFF3B3;
      padding: 0 4px;
      text-shadow: 0 1px 5px rgba(0,0,0,0.9);
    }

    /* Slot 5: Year "2026" (Y: ~74%) */
    .slot-year {
      top: 74.2%;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 3.5px;
      color: #ECC870;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }

    /* Slot 6: Venue & Address "747 FRONT ST..." (Y: ~78.5%) */
    .slot-venue {
      top: 78.5%;
    }
    .venue-name-txt {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #F7E7CE;
      text-transform: uppercase;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .venue-ar-txt {
      font-family: 'Aref Ruqaa', serif;
      font-size: 12px;
      color: #ECC870;
      margin-top: 1px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .venue-addr-txt {
      font-size: 9px;
      letter-spacing: 1.5px;
      color: rgba(247, 231, 206, 0.85);
      text-transform: uppercase;
      margin-top: 2px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }

    /* FOOTER & WAX SEAL */
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
      
      <!-- High-Res Chosen Design Clean Artwork Base -->
      <div class="card-artwork-frame">
        <img src="${design.image}" alt="${design.titleEn}" class="card-artwork-img">
        
        <!-- EXACT 1:1 SLOTTED OVERLAY (Placed in the exact same positions with the same font) -->
        <div class="card-exact-slots-overlay">
          
          <!-- Slot 1: Families & Guest Line (Exact place of "TOGETHER WITH THEIR FAMILIES") -->
          <div class="slot-item slot-intro">
            <div class="slot-families-txt">Together With Their Families</div>
            <div class="slot-guest-badge">Cordially Inviting: <strong>${state.guestEn}</strong> <span style="opacity:0.85;">(${state.guestAr})</span></div>
          </div>

          <!-- Slot 2: Bride Name (Exact place of "Sophia") -->
          <div class="slot-item slot-bride ${colorClass}">
            ${state.brideEn}
          </div>

          <!-- Slot 2b: Ampersand (Exact place of "&") -->
          <div class="slot-item slot-amp ${colorClass}">
            &amp;
          </div>

          <!-- Slot 2c: Groom Name (Exact place of "Preston") -->
          <div class="slot-item slot-groom ${colorClass}">
            ${state.groomEn}
          </div>

          <!-- Slot 2d: Arabic Names Calligraphy -->
          <div class="slot-item slot-arabic">
            ${state.groomAr} و ${state.brideAr}
          </div>

          <!-- Slot 3: Month (Exact place of "SEPTEMBER") -->
          <div class="slot-item slot-month">
            ${monthEn}
          </div>

          <!-- Slot 4: Date Divider (Exact place of "SATURDAY | 25 | AT 7 PM") -->
          <div class="slot-item slot-date-divider">
            <div class="date-divider-box">
              <span class="date-day-name">${weekday}</span>
              <span class="date-day-num">${day}</span>
              <span class="date-time-txt">AT ${timeFormatted}</span>
            </div>
          </div>

          <!-- Slot 5: Year (Exact place of "2026") -->
          <div class="slot-item slot-year">
            ${year}
          </div>

          <!-- Slot 6: Venue & Address (Exact place of "747 FRONT ST...") -->
          <div class="slot-item slot-venue">
            <div class="venue-name-txt">${state.venueNameEn}</div>
            <div class="venue-ar-txt">${state.venueNameAr}</div>
            <div class="venue-addr-txt">${state.venueAddress}</div>
          </div>

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