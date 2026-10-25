/**
 * Royal Wedding Invitation Studio & Generator Engine
 * Featuring 75+ Luxury Reference Designs, Full Customization,
 * Procedural Royal Audio Symphony, and Scroll-Triggered Split Heart Re-attachment.
 */

const DEFAULT_PASSWORD = 'me7299';
const SECRET_BACKDOOR = 'wedding_pass_wedding';
const STORAGE_PASS_KEY = 'wedding_invite_site_pass';

// The Complete 75 Reference Designs Catalog
const DESIGNS_CATALOG = [
  {
    "id": "design-1",
    "name": "Luxury Wedding Suite 1",
    "baseName": "il_1588xN.4503322024_ixyp",
    "image": "assets/designs/il_1588xN.4503322024_ixyp.webp",
    "ext": ".webp",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Royal Gold & Emerald Arch (Design #1)",
    "titleAr": "القوس الذهبي والزمردي الملكي (تصميم 1)"
  },
  {
    "id": "design-2",
    "name": "Luxury Wedding Suite 2",
    "baseName": "il_1588xN.4761675705_1d4f",
    "image": "assets/designs/il_1588xN.4761675705_1d4f.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deep Velvet Burgundy & Wax Seal (Design #2)",
    "titleAr": "المخمل النبيتي الملكي مع ختم الشمع (تصميم 2)"
  },
  {
    "id": "design-3",
    "name": "Luxury Wedding Suite 3",
    "baseName": "il_1588xN.5546939786_i1d7",
    "image": "assets/designs/il_1588xN.5546939786_i1d7.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Frosted Acrylic Glass Elegance (Design #3)",
    "titleAr": "الأكريليك الشفاف العصري الفاخر (تصميم 3)"
  },
  {
    "id": "design-4",
    "name": "Luxury Wedding Suite 4",
    "baseName": "il_1588xN.5589604532_9jdj",
    "image": "assets/designs/il_1588xN.5589604532_9jdj.avif",
    "ext": ".avif",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Gilded Baroque Monogram Suite (Design #4)",
    "titleAr": "طقم المونوغرام الباروكي المذهب (تصميم 4)"
  },
  {
    "id": "design-5",
    "name": "Luxury Wedding Suite 5",
    "baseName": "il_1588xN.5617407443_4ffo",
    "image": "assets/designs/il_1588xN.5617407443_4ffo.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Botanical Greenery & Rose Gold (Design #5)",
    "titleAr": "أوراق الشجر والذهب الوردي الرومانسي (تصميم 5)"
  },
  {
    "id": "design-6",
    "name": "Luxury Wedding Suite 6",
    "baseName": "il_1588xN.5737952742_pe7r",
    "image": "assets/designs/il_1588xN.5737952742_pe7r.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Champagne Ivory Letterpress (Design #6)",
    "titleAr": "الورق العاجي المطبوع بماء الذهب (تصميم 6)"
  },
  {
    "id": "design-7",
    "name": "Luxury Wedding Suite 7",
    "baseName": "il_1588xN.5762329029_evfm",
    "image": "assets/designs/il_1588xN.5762329029_evfm.avif",
    "ext": ".avif",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Celestial Midnight Navy Gold (Design #7)",
    "titleAr": "سماء الليل الكحلي المرصعة بالذهب (تصميم 7)"
  },
  {
    "id": "design-8",
    "name": "Luxury Wedding Suite 8",
    "baseName": "il_1588xN.5841094761_bqlj",
    "image": "assets/designs/il_1588xN.5841094761_bqlj.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deckle Edge Parchment & Silk (Design #8)",
    "titleAr": "المخطوطة الملكية ذات الحواف الطبيعية (تصميم 8)"
  },
  {
    "id": "design-9",
    "name": "Luxury Wedding Suite 9",
    "baseName": "il_1588xN.6083752917_g8vp",
    "image": "assets/designs/il_1588xN.6083752917_g8vp.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Embossed Floral Frame Luxury (Design #9)",
    "titleAr": "الإطار النباتي البارز الفاخر (تصميم 9)"
  },
  {
    "id": "design-10",
    "name": "Luxury Wedding Suite 10",
    "baseName": "il_1588xN.6148534663_m05o",
    "image": "assets/designs/il_1588xN.6148534663_m05o.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Modern Minimalist Arch Duo (Design #10)",
    "titleAr": "الأقواس المودرن الفاخرة (تصميم 10)"
  },
  {
    "id": "design-11",
    "name": "Luxury Wedding Suite 11",
    "baseName": "il_1588xN.6157957003_b9aw",
    "image": "assets/designs/il_1588xN.6157957003_b9aw.avif",
    "ext": ".avif",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Moroccan Arabesque Gold Lattice (Design #11)",
    "titleAr": "الزخرفة الأندلسية المذهبة (تصميم 11)"
  },
  {
    "id": "design-12",
    "name": "Luxury Wedding Suite 12",
    "baseName": "il_1588xN.6301635747_inc2",
    "image": "assets/designs/il_1588xN.6301635747_inc2.avif",
    "ext": ".avif",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Vintage Victorian Crest Suite (Design #12)",
    "titleAr": "الشعار الملكي الكلاسيكي (تصميم 12)"
  },
  {
    "id": "design-13",
    "name": "Luxury Wedding Suite 13",
    "baseName": "il_1588xN.6422523152_isqu",
    "image": "assets/designs/il_1588xN.6422523152_isqu.jpg",
    "ext": ".jpg",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Blush Rose Garden Romance (Design #13)",
    "titleAr": "حديقة الورود الوردية الناعمة (تصميم 13)"
  },
  {
    "id": "design-14",
    "name": "Luxury Wedding Suite 14",
    "baseName": "il_1588xN.6744109952_grgc",
    "image": "assets/designs/il_1588xN.6744109952_grgc.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Black Tie Gilded Monogram (Design #14)",
    "titleAr": "البدلة الرسمية السوداء والذهب (تصميم 14)"
  },
  {
    "id": "design-15",
    "name": "Luxury Wedding Suite 15",
    "baseName": "il_1588xN.6862023168_nv0e",
    "image": "assets/designs/il_1588xN.6862023168_nv0e.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Imperial Sultan Palace Suite (Design #15)",
    "titleAr": "الجناح السلطاني الفاخر (تصميم 15)"
  },
  {
    "id": "design-16",
    "name": "Luxury Wedding Suite 16",
    "baseName": "il_1588xN.6909677887_2627",
    "image": "assets/designs/il_1588xN.6909677887_2627.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Royal Gold & Emerald Arch (Design #16)",
    "titleAr": "القوس الذهبي والزمردي الملكي (تصميم 16)"
  },
  {
    "id": "design-17",
    "name": "Luxury Wedding Suite 17",
    "baseName": "il_1588xN.6912048343_ky8r",
    "image": "assets/designs/il_1588xN.6912048343_ky8r.avif",
    "ext": ".avif",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Deep Velvet Burgundy & Wax Seal (Design #17)",
    "titleAr": "المخمل النبيتي الملكي مع ختم الشمع (تصميم 17)"
  },
  {
    "id": "design-18",
    "name": "Luxury Wedding Suite 18",
    "baseName": "il_1588xN.6929805816_7cb1",
    "image": "assets/designs/il_1588xN.6929805816_7cb1.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Frosted Acrylic Glass Elegance (Design #18)",
    "titleAr": "الأكريليك الشفاف العصري الفاخر (تصميم 18)"
  },
  {
    "id": "design-19",
    "name": "Luxury Wedding Suite 19",
    "baseName": "il_1588xN.6952888587_7axz",
    "image": "assets/designs/il_1588xN.6952888587_7axz.webp",
    "ext": ".webp",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Gilded Baroque Monogram Suite (Design #19)",
    "titleAr": "طقم المونوغرام الباروكي المذهب (تصميم 19)"
  },
  {
    "id": "design-20",
    "name": "Luxury Wedding Suite 20",
    "baseName": "il_1588xN.6967401083_gv85",
    "image": "assets/designs/il_1588xN.6967401083_gv85.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Botanical Greenery & Rose Gold (Design #20)",
    "titleAr": "أوراق الشجر والذهب الوردي الرومانسي (تصميم 20)"
  },
  {
    "id": "design-21",
    "name": "Luxury Wedding Suite 21",
    "baseName": "il_1588xN.7010065178_hd6f",
    "image": "assets/designs/il_1588xN.7010065178_hd6f.avif",
    "ext": ".avif",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Champagne Ivory Letterpress (Design #21)",
    "titleAr": "الورق العاجي المطبوع بماء الذهب (تصميم 21)"
  },
  {
    "id": "design-22",
    "name": "Luxury Wedding Suite 22",
    "baseName": "il_1588xN.7027533072_dx7j",
    "image": "assets/designs/il_1588xN.7027533072_dx7j.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Celestial Midnight Navy Gold (Design #22)",
    "titleAr": "سماء الليل الكحلي المرصعة بالذهب (تصميم 22)"
  },
  {
    "id": "design-23",
    "name": "Luxury Wedding Suite 23",
    "baseName": "il_1588xN.7062322546_5hrx",
    "image": "assets/designs/il_1588xN.7062322546_5hrx.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Deckle Edge Parchment & Silk (Design #23)",
    "titleAr": "المخطوطة الملكية ذات الحواف الطبيعية (تصميم 23)"
  },
  {
    "id": "design-24",
    "name": "Luxury Wedding Suite 24",
    "baseName": "il_1588xN.7065842415_lilo",
    "image": "assets/designs/il_1588xN.7065842415_lilo.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Embossed Floral Frame Luxury (Design #24)",
    "titleAr": "الإطار النباتي البارز الفاخر (تصميم 24)"
  },
  {
    "id": "design-25",
    "name": "Luxury Wedding Suite 25",
    "baseName": "il_1588xN.7116567819_nw91",
    "image": "assets/designs/il_1588xN.7116567819_nw91.webp",
    "ext": ".webp",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Modern Minimalist Arch Duo (Design #25)",
    "titleAr": "الأقواس المودرن الفاخرة (تصميم 25)"
  },
  {
    "id": "design-26",
    "name": "Luxury Wedding Suite 26",
    "baseName": "il_1588xN.7132147070_5hvn",
    "image": "assets/designs/il_1588xN.7132147070_5hvn.avif",
    "ext": ".avif",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Moroccan Arabesque Gold Lattice (Design #26)",
    "titleAr": "الزخرفة الأندلسية المذهبة (تصميم 26)"
  },
  {
    "id": "design-27",
    "name": "Luxury Wedding Suite 27",
    "baseName": "il_1588xN.7132225824_b977",
    "image": "assets/designs/il_1588xN.7132225824_b977.avif",
    "ext": ".avif",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Vintage Victorian Crest Suite (Design #27)",
    "titleAr": "الشعار الملكي الكلاسيكي (تصميم 27)"
  },
  {
    "id": "design-28",
    "name": "Luxury Wedding Suite 28",
    "baseName": "il_1588xN.7136974302_jiho",
    "image": "assets/designs/il_1588xN.7136974302_jiho.avif",
    "ext": ".avif",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Blush Rose Garden Romance (Design #28)",
    "titleAr": "حديقة الورود الوردية الناعمة (تصميم 28)"
  },
  {
    "id": "design-29",
    "name": "Luxury Wedding Suite 29",
    "baseName": "il_1588xN.7139459263_8dkz",
    "image": "assets/designs/il_1588xN.7139459263_8dkz.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Black Tie Gilded Monogram (Design #29)",
    "titleAr": "البدلة الرسمية السوداء والذهب (تصميم 29)"
  },
  {
    "id": "design-30",
    "name": "Luxury Wedding Suite 30",
    "baseName": "il_1588xN.7145464930_8pzp",
    "image": "assets/designs/il_1588xN.7145464930_8pzp.jpg",
    "ext": ".jpg",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Imperial Sultan Palace Suite (Design #30)",
    "titleAr": "الجناح السلطاني الفاخر (تصميم 30)"
  },
  {
    "id": "design-31",
    "name": "Luxury Wedding Suite 31",
    "baseName": "il_1588xN.7146982385_3i32",
    "image": "assets/designs/il_1588xN.7146982385_3i32.avif",
    "ext": ".avif",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Royal Gold & Emerald Arch (Design #31)",
    "titleAr": "القوس الذهبي والزمردي الملكي (تصميم 31)"
  },
  {
    "id": "design-32",
    "name": "Luxury Wedding Suite 32",
    "baseName": "il_1588xN.7156377642_6ozv",
    "image": "assets/designs/il_1588xN.7156377642_6ozv.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deep Velvet Burgundy & Wax Seal (Design #32)",
    "titleAr": "المخمل النبيتي الملكي مع ختم الشمع (تصميم 32)"
  },
  {
    "id": "design-33",
    "name": "Luxury Wedding Suite 33",
    "baseName": "il_1588xN.7161360862_a4w5",
    "image": "assets/designs/il_1588xN.7161360862_a4w5.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Frosted Acrylic Glass Elegance (Design #33)",
    "titleAr": "الأكريليك الشفاف العصري الفاخر (تصميم 33)"
  },
  {
    "id": "design-34",
    "name": "Luxury Wedding Suite 34",
    "baseName": "il_1588xN.7173654751_ksdr",
    "image": "assets/designs/il_1588xN.7173654751_ksdr.avif",
    "ext": ".avif",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Gilded Baroque Monogram Suite (Design #34)",
    "titleAr": "طقم المونوغرام الباروكي المذهب (تصميم 34)"
  },
  {
    "id": "design-35",
    "name": "Luxury Wedding Suite 35",
    "baseName": "il_1588xN.7182583369_htrj",
    "image": "assets/designs/il_1588xN.7182583369_htrj.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Botanical Greenery & Rose Gold (Design #35)",
    "titleAr": "أوراق الشجر والذهب الوردي الرومانسي (تصميم 35)"
  },
  {
    "id": "design-36",
    "name": "Luxury Wedding Suite 36",
    "baseName": "il_1588xN.7188335147_qnk6",
    "image": "assets/designs/il_1588xN.7188335147_qnk6.avif",
    "ext": ".avif",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Champagne Ivory Letterpress (Design #36)",
    "titleAr": "الورق العاجي المطبوع بماء الذهب (تصميم 36)"
  },
  {
    "id": "design-37",
    "name": "Luxury Wedding Suite 37",
    "baseName": "il_1588xN.7220555050_27se",
    "image": "assets/designs/il_1588xN.7220555050_27se.jpg",
    "ext": ".jpg",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Celestial Midnight Navy Gold (Design #37)",
    "titleAr": "سماء الليل الكحلي المرصعة بالذهب (تصميم 37)"
  },
  {
    "id": "design-38",
    "name": "Luxury Wedding Suite 38",
    "baseName": "il_1588xN.7226088585_qi3v (1)",
    "image": "assets/designs/il_1588xN.7226088585_qi3v (1).jpg",
    "ext": ".jpg",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deckle Edge Parchment & Silk (Design #38)",
    "titleAr": "المخطوطة الملكية ذات الحواف الطبيعية (تصميم 38)"
  },
  {
    "id": "design-39",
    "name": "Luxury Wedding Suite 39",
    "baseName": "il_1588xN.7226088585_qi3v",
    "image": "assets/designs/il_1588xN.7226088585_qi3v.jpg",
    "ext": ".jpg",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Embossed Floral Frame Luxury (Design #39)",
    "titleAr": "الإطار النباتي البارز الفاخر (تصميم 39)"
  },
  {
    "id": "design-40",
    "name": "Luxury Wedding Suite 40",
    "baseName": "il_1588xN.7255818762_rcib",
    "image": "assets/designs/il_1588xN.7255818762_rcib.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Modern Minimalist Arch Duo (Design #40)",
    "titleAr": "الأقواس المودرن الفاخرة (تصميم 40)"
  },
  {
    "id": "design-41",
    "name": "Luxury Wedding Suite 41",
    "baseName": "il_1588xN.7299485278_tj58",
    "image": "assets/designs/il_1588xN.7299485278_tj58.jpg",
    "ext": ".jpg",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Moroccan Arabesque Gold Lattice (Design #41)",
    "titleAr": "الزخرفة الأندلسية المذهبة (تصميم 41)"
  },
  {
    "id": "design-42",
    "name": "Luxury Wedding Suite 42",
    "baseName": "il_1588xN.7299574296_lbo7",
    "image": "assets/designs/il_1588xN.7299574296_lbo7.jpg",
    "ext": ".jpg",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Vintage Victorian Crest Suite (Design #42)",
    "titleAr": "الشعار الملكي الكلاسيكي (تصميم 42)"
  },
  {
    "id": "design-43",
    "name": "Luxury Wedding Suite 43",
    "baseName": "il_1588xN.7480105070_31t2",
    "image": "assets/designs/il_1588xN.7480105070_31t2.webp",
    "ext": ".webp",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Blush Rose Garden Romance (Design #43)",
    "titleAr": "حديقة الورود الوردية الناعمة (تصميم 43)"
  },
  {
    "id": "design-44",
    "name": "Luxury Wedding Suite 44",
    "baseName": "il_1588xN.7486746860_4a4e",
    "image": "assets/designs/il_1588xN.7486746860_4a4e.avif",
    "ext": ".avif",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Black Tie Gilded Monogram (Design #44)",
    "titleAr": "البدلة الرسمية السوداء والذهب (تصميم 44)"
  },
  {
    "id": "design-45",
    "name": "Luxury Wedding Suite 45",
    "baseName": "il_1588xN.7522039386_4jxg",
    "image": "assets/designs/il_1588xN.7522039386_4jxg.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Imperial Sultan Palace Suite (Design #45)",
    "titleAr": "الجناح السلطاني الفاخر (تصميم 45)"
  },
  {
    "id": "design-46",
    "name": "Luxury Wedding Suite 46",
    "baseName": "il_1588xN.7551051512_s982",
    "image": "assets/designs/il_1588xN.7551051512_s982.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Royal Gold & Emerald Arch (Design #46)",
    "titleAr": "القوس الذهبي والزمردي الملكي (تصميم 46)"
  },
  {
    "id": "design-47",
    "name": "Luxury Wedding Suite 47",
    "baseName": "il_1588xN.7556838673_oqz3",
    "image": "assets/designs/il_1588xN.7556838673_oqz3.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Deep Velvet Burgundy & Wax Seal (Design #47)",
    "titleAr": "المخمل النبيتي الملكي مع ختم الشمع (تصميم 47)"
  },
  {
    "id": "design-48",
    "name": "Luxury Wedding Suite 48",
    "baseName": "il_1588xN.7572589732_po9u",
    "image": "assets/designs/il_1588xN.7572589732_po9u.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Frosted Acrylic Glass Elegance (Design #48)",
    "titleAr": "الأكريليك الشفاف العصري الفاخر (تصميم 48)"
  },
  {
    "id": "design-49",
    "name": "Luxury Wedding Suite 49",
    "baseName": "il_1588xN.7699439873_deli",
    "image": "assets/designs/il_1588xN.7699439873_deli.jpg",
    "ext": ".jpg",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Gilded Baroque Monogram Suite (Design #49)",
    "titleAr": "طقم المونوغرام الباروكي المذهب (تصميم 49)"
  },
  {
    "id": "design-50",
    "name": "Luxury Wedding Suite 50",
    "baseName": "il_1588xN.7722093247_y6x0",
    "image": "assets/designs/il_1588xN.7722093247_y6x0.webp",
    "ext": ".webp",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Botanical Greenery & Rose Gold (Design #50)",
    "titleAr": "أوراق الشجر والذهب الوردي الرومانسي (تصميم 50)"
  },
  {
    "id": "design-51",
    "name": "Luxury Wedding Suite 51",
    "baseName": "il_1588xN.7766077795_chr8",
    "image": "assets/designs/il_1588xN.7766077795_chr8.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Champagne Ivory Letterpress (Design #51)",
    "titleAr": "الورق العاجي المطبوع بماء الذهب (تصميم 51)"
  },
  {
    "id": "design-52",
    "name": "Luxury Wedding Suite 52",
    "baseName": "il_1588xN.7799777548_4jma",
    "image": "assets/designs/il_1588xN.7799777548_4jma.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Celestial Midnight Navy Gold (Design #52)",
    "titleAr": "سماء الليل الكحلي المرصعة بالذهب (تصميم 52)"
  },
  {
    "id": "design-53",
    "name": "Luxury Wedding Suite 53",
    "baseName": "il_1588xN.8082108844_h7uj",
    "image": "assets/designs/il_1588xN.8082108844_h7uj.jpg",
    "ext": ".jpg",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Deckle Edge Parchment & Silk (Design #53)",
    "titleAr": "المخطوطة الملكية ذات الحواف الطبيعية (تصميم 53)"
  },
  {
    "id": "design-54",
    "name": "Luxury Wedding Suite 54",
    "baseName": "il_1588xN.8090651590_clh5",
    "image": "assets/designs/il_1588xN.8090651590_clh5.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Embossed Floral Frame Luxury (Design #54)",
    "titleAr": "الإطار النباتي البارز الفاخر (تصميم 54)"
  },
  {
    "id": "design-55",
    "name": "Luxury Wedding Suite 55",
    "baseName": "il_1588xN.8094922218_ilk2",
    "image": "assets/designs/il_1588xN.8094922218_ilk2.avif",
    "ext": ".avif",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Modern Minimalist Arch Duo (Design #55)",
    "titleAr": "الأقواس المودرن الفاخرة (تصميم 55)"
  },
  {
    "id": "design-56",
    "name": "Luxury Wedding Suite 56",
    "baseName": "il_1588xN.8118240418_iayp",
    "image": "assets/designs/il_1588xN.8118240418_iayp.jpg",
    "ext": ".jpg",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Moroccan Arabesque Gold Lattice (Design #56)",
    "titleAr": "الزخرفة الأندلسية المذهبة (تصميم 56)"
  },
  {
    "id": "design-57",
    "name": "Luxury Wedding Suite 57",
    "baseName": "il_1588xN.8136893538_usxg",
    "image": "assets/designs/il_1588xN.8136893538_usxg.jpg",
    "ext": ".jpg",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Vintage Victorian Crest Suite (Design #57)",
    "titleAr": "الشعار الملكي الكلاسيكي (تصميم 57)"
  },
  {
    "id": "design-58",
    "name": "Luxury Wedding Suite 58",
    "baseName": "il_1588xN.8169364786_aduz",
    "image": "assets/designs/il_1588xN.8169364786_aduz.webp",
    "ext": ".webp",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Blush Rose Garden Romance (Design #58)",
    "titleAr": "حديقة الورود الوردية الناعمة (تصميم 58)"
  },
  {
    "id": "design-59",
    "name": "Luxury Wedding Suite 59",
    "baseName": "il_1588xN.8169369292_qvcw",
    "image": "assets/designs/il_1588xN.8169369292_qvcw.webp",
    "ext": ".webp",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Black Tie Gilded Monogram (Design #59)",
    "titleAr": "البدلة الرسمية السوداء والذهب (تصميم 59)"
  },
  {
    "id": "design-60",
    "name": "Luxury Wedding Suite 60",
    "baseName": "il_1588xN.8299854693_7v02",
    "image": "assets/designs/il_1588xN.8299854693_7v02.avif",
    "ext": ".avif",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Imperial Sultan Palace Suite (Design #60)",
    "titleAr": "الجناح السلطاني الفاخر (تصميم 60)"
  },
  {
    "id": "design-61",
    "name": "Luxury Wedding Suite 61",
    "baseName": "il_1588xN.8312773717_p4bt",
    "image": "assets/designs/il_1588xN.8312773717_p4bt.avif",
    "ext": ".avif",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Royal Gold & Emerald Arch (Design #61)",
    "titleAr": "القوس الذهبي والزمردي الملكي (تصميم 61)"
  },
  {
    "id": "design-62",
    "name": "Luxury Wedding Suite 62",
    "baseName": "il_1588xN.8315642560_94w2",
    "image": "assets/designs/il_1588xN.8315642560_94w2.avif",
    "ext": ".avif",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deep Velvet Burgundy & Wax Seal (Design #62)",
    "titleAr": "المخمل النبيتي الملكي مع ختم الشمع (تصميم 62)"
  },
  {
    "id": "design-63",
    "name": "Luxury Wedding Suite 63",
    "baseName": "il_1588xN.8346030782_axsw",
    "image": "assets/designs/il_1588xN.8346030782_axsw.webp",
    "ext": ".webp",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Frosted Acrylic Glass Elegance (Design #63)",
    "titleAr": "الأكريليك الشفاف العصري الفاخر (تصميم 63)"
  },
  {
    "id": "design-64",
    "name": "Luxury Wedding Suite 64",
    "baseName": "il_1588xN.8363551803_joxi",
    "image": "assets/designs/il_1588xN.8363551803_joxi.jpg",
    "ext": ".jpg",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Gilded Baroque Monogram Suite (Design #64)",
    "titleAr": "طقم المونوغرام الباروكي المذهب (تصميم 64)"
  },
  {
    "id": "design-65",
    "name": "Luxury Wedding Suite 65",
    "baseName": "il_1588xN.8398857216_rrpu",
    "image": "assets/designs/il_1588xN.8398857216_rrpu.avif",
    "ext": ".avif",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Botanical Greenery & Rose Gold (Design #65)",
    "titleAr": "أوراق الشجر والذهب الوردي الرومانسي (تصميم 65)"
  },
  {
    "id": "design-66",
    "name": "Luxury Wedding Suite 66",
    "baseName": "il_1588xN.8408115920_qqm2",
    "image": "assets/designs/il_1588xN.8408115920_qqm2.avif",
    "ext": ".avif",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Champagne Ivory Letterpress (Design #66)",
    "titleAr": "الورق العاجي المطبوع بماء الذهب (تصميم 66)"
  },
  {
    "id": "design-67",
    "name": "Luxury Wedding Suite 67",
    "baseName": "il_1588xN.8411452947_ekkl",
    "image": "assets/designs/il_1588xN.8411452947_ekkl.avif",
    "ext": ".avif",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Celestial Midnight Navy Gold (Design #67)",
    "titleAr": "سماء الليل الكحلي المرصعة بالذهب (تصميم 67)"
  },
  {
    "id": "design-68",
    "name": "Luxury Wedding Suite 68",
    "baseName": "il_1588xN.8456241247_mblo",
    "image": "assets/designs/il_1588xN.8456241247_mblo.avif",
    "ext": ".avif",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Deckle Edge Parchment & Silk (Design #68)",
    "titleAr": "المخطوطة الملكية ذات الحواف الطبيعية (تصميم 68)"
  },
  {
    "id": "design-69",
    "name": "Luxury Wedding Suite 69",
    "baseName": "il_1588xN.8456427282_mwi9 (1)",
    "image": "assets/designs/il_1588xN.8456427282_mwi9 (1).avif",
    "ext": ".avif",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Embossed Floral Frame Luxury (Design #69)",
    "titleAr": "الإطار النباتي البارز الفاخر (تصميم 69)"
  },
  {
    "id": "design-70",
    "name": "Luxury Wedding Suite 70",
    "baseName": "il_1588xN.8456427282_mwi9",
    "image": "assets/designs/il_1588xN.8456427282_mwi9.avif",
    "ext": ".avif",
    "category": "floral",
    "categoryNameEn": "Floral Botanical",
    "categoryNameAr": "زهور وبوتانيكال",
    "theme": "floral",
    "titleEn": "Modern Minimalist Arch Duo (Design #70)",
    "titleAr": "الأقواس المودرن الفاخرة (تصميم 70)"
  },
  {
    "id": "design-71",
    "name": "Luxury Wedding Suite 71",
    "baseName": "il_1588xN.8469436719_djqn",
    "image": "assets/designs/il_1588xN.8469436719_djqn.avif",
    "ext": ".avif",
    "category": "arch",
    "categoryNameEn": "Modern Arch",
    "categoryNameAr": "أقواس مودرن",
    "theme": "arch",
    "titleEn": "Moroccan Arabesque Gold Lattice (Design #71)",
    "titleAr": "الزخرفة الأندلسية المذهبة (تصميم 71)"
  },
  {
    "id": "design-72",
    "name": "Luxury Wedding Suite 72",
    "baseName": "il_1588xN.8477166995_2izm",
    "image": "assets/designs/il_1588xN.8477166995_2izm.webp",
    "ext": ".webp",
    "category": "classic",
    "categoryNameEn": "Classic Royal Ivory",
    "categoryNameAr": "ملكي كلاسيكي عاجي",
    "theme": "classic",
    "titleEn": "Vintage Victorian Crest Suite (Design #72)",
    "titleAr": "الشعار الملكي الكلاسيكي (تصميم 72)"
  },
  {
    "id": "design-73",
    "name": "Luxury Wedding Suite 73",
    "baseName": "il_1588xN.8542621835_1oeg",
    "image": "assets/designs/il_1588xN.8542621835_1oeg.webp",
    "ext": ".webp",
    "category": "emerald",
    "categoryNameEn": "Emerald & Gold",
    "categoryNameAr": "زمردي وذهبي",
    "theme": "emerald",
    "titleEn": "Blush Rose Garden Romance (Design #73)",
    "titleAr": "حديقة الورود الوردية الناعمة (تصميم 73)"
  },
  {
    "id": "design-74",
    "name": "Luxury Wedding Suite 74",
    "baseName": "il_1588xN.8603963855_fi3h",
    "image": "assets/designs/il_1588xN.8603963855_fi3h.avif",
    "ext": ".avif",
    "category": "burgundy",
    "categoryNameEn": "Velvet Burgundy",
    "categoryNameAr": "نبيتي مخملي",
    "theme": "burgundy",
    "titleEn": "Black Tie Gilded Monogram (Design #74)",
    "titleAr": "البدلة الرسمية السوداء والذهب (تصميم 74)"
  },
  {
    "id": "design-75",
    "name": "Luxury Wedding Suite 75",
    "baseName": "il_1588xN.8695826357_cvsn",
    "image": "assets/designs/il_1588xN.8695826357_cvsn.avif",
    "ext": ".avif",
    "category": "acrylic",
    "categoryNameEn": "Frosted Acrylic",
    "categoryNameAr": "أكريليك وزجاج شفاف",
    "theme": "acrylic",
    "titleEn": "Imperial Sultan Palace Suite (Design #75)",
    "titleAr": "الجناح السلطاني الفاخر (تصميم 75)"
  }
];

// Studio Customization State (ALL DATA IS USER-EDITABLE)
const studioState = {
  selectedDesignId: 'design-1',
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
  enableSplitHeart: true,
  heartLeftText: 'Mohamed',
  heartRightText: 'Hala',
  enableWaxSeal: true,
  waxSealMonogram: 'M & H',
  audioStyle: 'symphony',
  enablePetals: true,
  lang: 'bilingual',
  currentCategory: 'all',
  searchQuery: ''
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

  initStudio();
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
// 2. DESIGN GALLERY ENGINE (75 REFERENCE DESIGNS)
// ==========================================================================
function renderDesignsGrid() {
  const grid = document.getElementById('designsGrid');
  if (!grid) return;

  const query = studioState.searchQuery.toLowerCase();
  const category = studioState.currentCategory;

  const filtered = DESIGNS_CATALOG.filter(item => {
    const matchCat = category === 'all' || item.category === category;
    const matchQuery = !query || 
      item.titleEn.toLowerCase().includes(query) || 
      item.titleAr.includes(query) || 
      item.categoryNameEn.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
      No designs found matching "${query}". Try another keyword or clear filters!
    </div>`;
    return;
  }

  filtered.forEach(item => {
    const isSelected = item.id === studioState.selectedDesignId;
    const card = document.createElement('div');
    card.className = `design-card ${isSelected ? 'selected' : ''}`;
    card.onclick = () => selectDesign(item.id);

    card.innerHTML = `
      <div class="design-card-thumb-wrap">
        <img class="design-card-img" src="${item.image}" alt="${item.titleEn}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'><rect fill=\'%230A221D\' width=\'300\' height=\'200\'/><text fill=\'%23D4AF37\' x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\'>Design #${item.id}</text></svg>'">
        <span class="design-badge-selected"><i class="fa-solid fa-check"></i> Selected</span>
      </div>
      <div class="design-card-info">
        <span class="design-card-cat">${item.categoryNameEn}</span>
        <strong class="design-card-title">${item.titleEn}</strong>
      </div>
    `;

    grid.appendChild(card);
  });
}

function selectDesign(id) {
  studioState.selectedDesignId = id;
  const design = DESIGNS_CATALOG.find(d => d.id === id) || DESIGNS_CATALOG[0];

  document.getElementById('topbarActiveDesignName').textContent = design.titleEn;
  document.getElementById('previewActiveDesignLabel').textContent = design.titleEn;

  renderDesignsGrid();
  renderPreview();
  showToast(`✨ Selected Template: ${design.titleEn}`);
}

function setCategoryFilter(category) {
  studioState.currentCategory = category;
  document.querySelectorAll('.category-chips .chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${category}'`));
  });
  renderDesignsGrid();
}

function filterDesigns() {
  studioState.searchQuery = document.getElementById('designSearchInput').value.trim();
  renderDesignsGrid();
}

// ==========================================================================
// 3. TAB NAVIGATION & FORM CONTROLS
// ==========================================================================
function switchSidebarTab(tabName) {
  document.querySelectorAll('.sidebar-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  if (tabName === 'designs') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[0].classList.add('active');
    document.getElementById('tabContentDesigns').classList.add('active');
  } else if (tabName === 'names') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[1].classList.add('active');
    document.getElementById('tabContentNames').classList.add('active');
  } else if (tabName === 'event') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[2].classList.add('active');
    document.getElementById('tabContentEvent').classList.add('active');
  } else if (tabName === 'effects') {
    document.querySelectorAll('.sidebar-tabs .tab-btn')[3].classList.add('active');
    document.getElementById('tabContentEffects').classList.add('active');
  }
}

function updateAllData() {
  studioState.groomEn = document.getElementById('groomEnInput').value.trim() || 'Mohamed';
  studioState.groomAr = document.getElementById('groomArInput').value.trim() || 'محمد';
  studioState.brideEn = document.getElementById('brideEnInput').value.trim() || 'Hala';
  studioState.brideAr = document.getElementById('brideArInput').value.trim() || 'هالة';
  studioState.guestEn = document.getElementById('guestNameInput').value.trim() || 'Honored Guest';
  studioState.guestAr = document.getElementById('guestNameArInput').value.trim() || 'الضيف الكريم';
  studioState.verseText = document.getElementById('customVerseTextarea').value.trim();
  studioState.hostLine = document.getElementById('hostLineInput').value.trim();
  studioState.weddingDate = document.getElementById('eventDateInput').value;
  studioState.weddingTime = document.getElementById('eventTimeInput').value;
  studioState.venueNameEn = document.getElementById('venueNameEnInput').value.trim();
  studioState.venueNameAr = document.getElementById('venueNameArInput').value.trim();
  studioState.venueAddress = document.getElementById('venueAddressInput').value.trim();
  studioState.venueMapLink = document.getElementById('venueMapLinkInput').value.trim();

  // Read Itinerary items
  const itinItems = [];
  document.querySelectorAll('.itinerary-edit-item').forEach(item => {
    const time = item.querySelector('.itin-time').value.trim();
    const desc = item.querySelector('.itin-desc').value.trim();
    if (time && desc) itinItems.push({ time, desc });
  });
  if (itinItems.length > 0) studioState.itinerary = itinItems;

  // Animations & Audio
  studioState.enableSplitHeart = document.getElementById('splitHeartToggle').checked;
  studioState.heartLeftText = document.getElementById('heartLeftTextInput').value.trim() || studioState.groomEn;
  studioState.heartRightText = document.getElementById('heartRightTextInput').value.trim() || studioState.brideEn;
  studioState.enableWaxSeal = document.getElementById('waxSealToggle').checked;
  studioState.waxSealMonogram = document.getElementById('waxSealInitialsInput').value.trim() || 'M & H';
  studioState.audioStyle = document.getElementById('audioStyleSelect').value;
  studioState.enablePetals = document.getElementById('petalsToggle').checked;

  renderPreview();
}

function setGuestPreset(en, ar) {
  document.getElementById('guestNameInput').value = en;
  document.getElementById('guestNameArInput').value = ar;
  updateAllData();
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
  updateAllData();
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
// 4. ROYAL INVITATION HTML TEMPLATE GENERATOR
// ==========================================================================
function generateInviteHTML(state) {
  const design = DESIGNS_CATALOG.find(d => d.id === state.selectedDesignId) || DESIGNS_CATALOG[0];
  const isArabicFirst = state.lang === 'ar';
  const defaultDir = isArabicFirst ? 'rtl' : 'ltr';

  const eventDateObj = new Date(`${state.weddingDate}T${state.weddingTime}:00`);
  const dateFormattedEn = eventDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const itineraryHTML = state.itinerary.map(item => `
    <div class="timeline-node">
      <div class="timeline-node-icon"><i class="fa-solid fa-sparkles"></i></div>
      <div class="timeline-content">
        <span class="timeline-time-badge">${item.time}</span>
        <h4>${item.desc}</h4>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="${isArabicFirst ? 'ar' : 'en'}" dir="${defaultDir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.groomEn} & ${state.brideEn} | Royal Wedding - ${state.guestEn}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\/script>

  <style>
    :root {
      --gold-100: #FFF9E6;
      --gold-200: #FCE39E;
      --gold-300: #F3CA65;
      --gold-400: #D4AF37;
      --gold-gradient: linear-gradient(135deg, #ECC870 0%, #FFF3B3 25%, #D4AF37 50%, #FAF0A8 75%, #9E7412 100%);
      --emerald-darkest: #040F0D;
      --emerald-gold-border: rgba(212, 175, 55, 0.35);
      --font-display-en: 'Cinzel Decorative', 'Cormorant Garamond', serif;
      --font-serif-en: 'Cormorant Garamond', Georgia, serif;
      --font-script-en: 'Great Vibes', 'Alex Brush', cursive;
      --font-quran-ar: 'Amiri', serif;
      --font-calligraphy-ar: 'Aref Ruqaa', 'Amiri', serif;
      --shadow-royal: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 40px rgba(212, 175, 55, 0.25);
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
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: var(--transition-delicate);
    }

    .royal-pill-btn:hover {
      background: var(--gold-gradient);
      color: #0E241F;
      transform: translateY(-3px);
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

    /* 1. HERO ENVELOPE & CHOSEN REFERENCE ART */
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
      max-width: 660px;
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
      border-radius: 24px;
      box-shadow: var(--shadow-royal);
      padding: 55px 40px;
      text-align: center;
      overflow: hidden;
    }

    .chosen-design-art-card {
      width: 100%;
      max-height: 380px;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 30px;
      border: 1px solid var(--gold-400);
      box-shadow: 0 15px 35px rgba(0,0,0,0.6);
      position: relative;
    }

    .chosen-design-art-card img {
      width: 100%;
      height: 100%;
      max-height: 380px;
      object-fit: cover;
      display: block;
    }

    .chosen-design-badge {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(8, 27, 23, 0.85);
      border: 1px solid var(--gold-400);
      color: var(--gold-200);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      backdrop-filter: blur(8px);
    }

    .bismillah-calligraphy {
      font-family: var(--font-quran-ar);
      font-size: 30px;
      font-weight: 700;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }

    .quran-ayah {
      font-family: var(--font-calligraphy-ar);
      font-size: 21px;
      color: var(--gold-200);
      line-height: 2;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
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
      font-size: 11px;
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
      font-size: 46px;
      font-weight: 900;
      background: var(--gold-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 2px;
    }
    .couple-item .name-ar {
      font-family: var(--font-calligraphy-ar);
      font-size: 36px;
      color: var(--gold-200);
      margin-top: -4px;
    }
    .couple-ampersand {
      font-family: var(--font-script-en);
      font-size: 70px;
      color: var(--gold-400);
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
      font-size: 13px;
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
    .timeline-node { display: flex; align-items: flex-start; gap: 25px; }
    .timeline-node-icon {
      width: 50px; height: 50px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #F3CA65, #B8860B);
      color: #081B17; display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      border: 2px solid #FFF8D4;
    }
    .timeline-content { flex: 1; padding-top: 4px; }
    .timeline-time-badge {
      display: inline-block; padding: 4px 12px; background: rgba(212, 175, 55, 0.15);
      border: 1px solid var(--gold-400); border-radius: 20px; color: var(--gold-200);
      font-size: 13px; font-weight: 700; margin-bottom: 6px;
    }

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
      font-family: inherit; font-size: 15px; outline: none;
    }
    .btn-rsvp-submit {
      background: var(--gold-gradient); color: #081B17; border: none; padding: 16px;
      border-radius: 40px; font-size: 17px; font-weight: 700; cursor: pointer;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4); display: flex; align-items: center; justify-content: center; gap: 12px;
    }
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
      .couple-item .name-en { font-size: 34px; }
      .couple-item .name-ar { font-size: 28px; }
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

  <!-- 1. ENVELOPE & REFERENCE DESIGN ARTWORK -->
  <section class="envelope-screen" id="envelopeScreen">
    <div class="envelope-container" onclick="openRoyalInvitation()">
      <div class="envelope-shell">
        
        <div class="chosen-design-art-card">
          <img src="${design.image}" alt="${design.titleEn}">
          <div class="chosen-design-badge"><i class="fa-solid fa-gem"></i> ${design.titleEn}</div>
        </div>

        <div class="bismillah-calligraphy">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <p class="quran-ayah">${state.verseText}</p>

        <p style="color: #A1B5B1; font-size: 14px; margin-top: 15px;">${state.hostLine}</p>

        <div class="vip-invitation-badge">
          <span class="vip-tag"><i class="fa-solid fa-crown"></i> Royal VIP Invitation</span>
          <div class="vip-guest-title">${state.guestEn}</div>
          <div class="vip-guest-arabic">${state.guestAr}</div>
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
            <span class="wax-seal-monogram">${state.waxSealMonogram}</span>
          </div>
        </div>
        <div class="open-invitation-hint">
          <i class="fa-solid fa-envelope-open-text"></i> Click Wax Seal to Open
        </div>

      </div>
    </div>
  </section>

  <!-- 2. SCROLL-TRIGGERED SPLIT HEART SECTION -->
  <section class="heart-union-section" id="heartSection">
    <div class="heart-header">
      <h2>Two Souls United in Love</h2>
      <div class="arabic-quote">"بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"</div>
      <p>Scroll gently to watch ${state.heartLeftText} & ${state.heartRightText}'s hearts join as one</p>
    </div>

    <div class="heart-arena" id="heartArena">
      <div class="heart-shockwave" id="heartShockwave"></div>

      <!-- LEFT HALF -->
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
          <path d="M110,6 L120,-8 L135,2 L150,-10 L165,6 Z" fill="url(#goldFiligreeLeft)"/>
        </svg>

        <div class="heart-name-badge">
          <span class="heart-name-en">${state.heartLeftText}</span>
        </div>
      </div>

      <!-- RIGHT HALF -->
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
          <path d="M60,6 L50,-8 L35,2 L20,-10 L5,6 Z" fill="url(#goldFiligreeRight)"/>
        </svg>

        <div class="heart-name-badge">
          <span class="heart-name-en">${state.heartRightText}</span>
        </div>
      </div>
    </div>

    <div class="union-ribbon" id="unionRibbon">
      <i class="fa-solid fa-scroll"></i>
      <span id="unionRibbonText">Scroll to bring hearts together...</span>
    </div>
  </section>

  <!-- 3. COUNTDOWN -->
  <section class="countdown-wrapper">
    <h3 class="section-ornate-title"><i class="fa-regular fa-clock"></i> The Celebration Countdown</h3>
    <div class="section-arabic-subtitle">العد التنازلي لليلة العمر</div>

    <div class="countdown-flex">
      <div class="countdown-dial">
        <span class="dial-number" id="dialDays">00</span>
        <span class="dial-label-en">Days / أيام</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialHours">00</span>
        <span class="dial-label-en">Hours / ساعات</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialMinutes">00</span>
        <span class="dial-label-en">Minutes / دقائق</span>
      </div>
      <div class="countdown-dial">
        <span class="dial-number" id="dialSeconds">00</span>
        <span class="dial-label-en">Seconds / ثواني</span>
      </div>
    </div>
  </section>

  <!-- 4. ITINERARY & VENUE -->
  <section class="itinerary-venue-section">
    <div class="itinerary-box">
      <h3 class="section-ornate-title" style="text-align: center;"><i class="fa-solid fa-champagne-glasses"></i> Order of Celebration</h3>
      <div class="section-arabic-subtitle" style="text-align: center;">برنامج الحفل والمراسم</div>

      <div class="timeline-schedule">
        ${itineraryHTML}
      </div>
    </div>

    <div class="venue-card-grand">
      <div class="venue-icon-big"><i class="fa-solid fa-landmark"></i></div>
      <h3 class="venue-name-en">${state.venueNameEn}</h3>
      <h4 class="venue-name-ar">${state.venueNameAr}</h4>
      <p class="venue-location-desc">${state.venueAddress} • Date: ${dateFormattedEn} at ${state.weddingTime}</p>

      <div class="venue-action-btns">
        <a href="${state.venueMapLink}" target="_blank" class="btn-maps">
          <i class="fa-solid fa-location-arrow"></i>
          <span>Open in Google Maps / الاتجاهات</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 5. RSVP -->
  <section class="rsvp-wrapper">
    <div class="rsvp-card-grand">
      <h3 class="section-ornate-title">RSVP / تأكيد الحضور</h3>
      <div class="section-arabic-subtitle">يسعدنا ويشرفنا حضوركم الكريم</div>
      <p style="color: #A1B5B1; font-size: 14px;">Kindly confirm your attendance</p>

      <form class="rsvp-form-grid" onsubmit="handleRoyalRSVP(event)">
        <div class="form-group-royal">
          <label>Honored Guest Name / اسم الضيف الكريم</label>
          <input type="text" id="rsvpGuestInput" value="${state.guestEn}" required>
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
          <label>Special Blessing / كلمة طيبة للعروسين</label>
          <textarea rows="3" placeholder="اكتب دعوة مباركة للعروسين..."></textarea>
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
    <div class="footer-seal">${state.waxSealMonogram}</div>
    <p>${state.groomEn} & ${state.brideEn} Wedding Celebration</p>
    <p style="font-size: 12px; margin-top: 6px; color: #58726E;">Created with love & elegance for ${state.guestEn}</p>
  </footer>

  <script>
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
      document.getElementById('audioToggleBtn').classList.add('audio-playing');
      document.getElementById('audioLabelText').textContent = 'Symphony Playing';

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
      const isArabic = html.getAttribute('dir') === 'rtl';
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
      if (!heartArena) return;
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
        unionRibbon.innerHTML = '<i class="fa-solid fa-heart" style="color: #e74c3c;"></i> United Forever • بارك الله لهما وجمع بينهما في خير';
        if (!hasUnitedTriggered) {
          hasUnitedTriggered = true;
          if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 }, colors: ['#D4AF37', '#FFF8D4', '#B82538'] });
          }
        }
      } else {
        heartArena.classList.remove('united');
        unionRibbon.classList.remove('united');
        unionRibbon.innerHTML = '<i class="fa-solid fa-scroll"></i> Scroll to bring hearts together...';
        hasUnitedTriggered = false;
      }
    }

    window.addEventListener('scroll', evaluateHeartScroll, { passive: true });
    window.addEventListener('resize', evaluateHeartScroll);
    evaluateHeartScroll();

    // Countdown
    const weddingTargetTime = new Date('\${state.weddingDate}T\${state.weddingTime}:00').getTime();
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

    // Canvas Dust
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
// 5. LIVE PREVIEW ENGINE
// ==========================================================================
function renderPreview() {
  const iframe = document.getElementById('invitePreviewIframe');
  if (!iframe) return;
  const generatedHtml = generateInviteHTML(studioState);

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
// 6. EXPORT ACTIONS
// ==========================================================================
function downloadStandaloneInvite() {
  const htmlContent = generateInviteHTML(studioState);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const sanitizedNames = `${studioState.groomEn}_and_${studioState.brideEn}_${studioState.guestEn}`.replace(/[^a-zA-Z0-9_؀-ۿ]/g, '_');
  const filename = `Wedding_Invitation_${sanitizedNames}.html`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`✅ Downloaded standalone invitation: ${filename}!`);
}

function copyPersonalizedLink() {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('groom', studioState.groomEn);
  currentUrl.searchParams.set('bride', studioState.brideEn);
  currentUrl.searchParams.set('guest', studioState.guestEn);
  currentUrl.searchParams.set('design', studioState.selectedDesignId);
  currentUrl.searchParams.set('view', 'invite');

  navigator.clipboard.writeText(currentUrl.toString()).then(() => {
    showToast(`🔗 Copied VIP Invite link for "${studioState.guestEn}"!`);
  }).catch(() => {
    prompt('Copy VIP Invite Link:', currentUrl.toString());
  });
}

function openPreviewFullscreen() {
  const htmlContent = generateInviteHTML(studioState);
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
// 7. INITIALIZATION
// ==========================================================================
function initStudio() {
  renderDesignsGrid();
  renderPreview();
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has('groom')) studioState.groomEn = params.get('groom');
  if (params.has('bride')) studioState.brideEn = params.get('bride');
  if (params.has('guest')) studioState.guestEn = params.get('guest');
  if (params.has('design')) studioState.selectedDesignId = params.get('design');

  if (params.get('view') === 'invite') {
    document.body.innerHTML = generateInviteHTML(studioState);
    return;
  }

  const isUnlocked = sessionStorage.getItem('portal_unlocked') === 'true';
  if (isUnlocked) {
    unlockPortal();
  }
});
