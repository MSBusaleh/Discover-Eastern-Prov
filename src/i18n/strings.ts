import type { LocalizedText } from '@/types/content';

/**
 * Interface strings (buttons, labels, messages). Content text lives in src/data.
 * Add a key here once; TypeScript will flag any place that uses a missing key.
 */
const s = (ar: string, en: string): LocalizedText => ({ ar, en });

export const strings = {
  siteName: s('اكتشف الشرقية', 'Discover the Eastern Province'),
  tagline: s('أرض الحضارات، وقصة التوحيد، وآفاق المستقبل', 'Land of Civilizations, the Story of Unification, and Horizons of the Future'),
  theme: s('الشرقية: من جذور الأصالة إلى آفاق المستقبل', 'The Eastern Province: From Heritage to the Future'),
  startExploring: s('ابدأ الاستكشاف', 'Start Exploring'),
  switchLang: s('English', 'العربية'),
  switchLangLabel: s('Switch to English', 'التبديل إلى العربية'),
  home: s('الرئيسية', 'Home'),
  darkMode: s('الوضع الداكن', 'Dark mode'),
  lightMode: s('الوضع الفاتح', 'Light mode'),
  menu: s('القائمة', 'Menu'),
  close: s('إغلاق', 'Close'),
  back: s('رجوع', 'Back'),
  next: s('التالي', 'Next'),
  previous: s('السابق', 'Previous'),
  skipToContent: s('تخطَّ إلى المحتوى', 'Skip to content'),

  // Sections
  navExplore: s('اكتشف الشرقية', 'Explore the Eastern Province'),
  navTimeline: s('رحلة عبر الزمن', 'Journey Through Time'),
  navUnification: s('الشرقية ومسيرة التوحيد', 'The Eastern Province and Saudi Unification'),
  navRoyal: s('ملوك المملكة في الشرقية', 'Saudi Kings in the Eastern Province'),
  navSources: s('المصادر والحقوق', 'Sources & credits'),

  shortExplore: s('الخريطة', 'Map'),
  shortTimeline: s('عبر الزمن', 'Timeline'),
  shortUnification: s('التوحيد', 'Unification'),
  shortRoyal: s('الملوك', 'Kings'),

  blurbTimeline: s('آلاف السنين من التاريخ قبل النفط', 'Thousands of years of history before oil'),
  blurbUnification: s('من الأحساء 1913م إلى إعلان المملكة 1932م', 'From Al-Ahsa in 1913 to the Kingdom in 1932'),
  blurbRoyal: s('زيارات ملوك المملكة إلى الشرقية', 'Royal visits to the province'),

  // Home
  homeMapHint: s('اضغط على أي موقع لتبدأ', 'Tap any place to begin'),
  homeOtherWays: s('طرق أخرى للاستكشاف', 'More ways to explore'),
  prototypeNote: s(
    'نموذج أولي لجناح فرع SPE بجامعة الملك فهد · اليوم الوطني 2026م · ليس منصة رسمية لـ SPE',
    'Prototype for the SPE KFUPM Student Chapter booth · National Day 2026 · Not an official SPE platform',
  ),
  logoPlaceholder: s('مكان الشعار', 'Logo placeholder'),

  // Map
  mapTitle: s('خريطة المنطقة الشرقية', 'Map of the Eastern Province'),
  mapIntro: s('اختر موقعًا على الخريطة أو من القائمة. استخدم التصنيفات لإظهار ما يهمّك.', 'Pick a place on the map or from the list. Use the filters to show what interests you.'),
  filters: s('التصنيفات', 'Filters'),
  clearFilters: s('إظهار الكل', 'Show all'),
  showAllPlaces: s('عرض المنطقة كاملة', 'Show all places'),
  listView: s('قائمة المواقع', 'List of places'),
  placesShown: s('مواقع معروضة', 'places shown'),
  noPlacesForFilter: s('لا توجد مواقع لهذا التصنيف بعد.', 'No places in this category yet.'),
  mapOffline: s(
    'تعذّر تحميل صور الخريطة (قد يكون الاتصال بالإنترنت ضعيفًا). المواقع والمحتوى متاحة بالكامل من القائمة.',
    'Map images could not load (the connection may be down). All places and content remain available from the list.',
  ),
  legend: s('دليل الرموز', 'Legend'),
  inside: s('ضمن', 'Within'),
  placesInside: s('مواقع داخلها', 'Places inside'),
  coordinates: s('الإحداثيات', 'Coordinates'),
  coordsNeedReview: s('إحداثيات بحاجة إلى تحقق', 'Coordinates need review'),
  backTo: s('العودة إلى', 'Back to'),
  backToMap: s('العودة إلى الخريطة', 'Back to the map'),
  viewOnMap: s('عرض على الخريطة', 'View on map'),
  zoomTo: s('تكبير إلى الموقع', 'Zoom to place'),
  openCard: s('عرض البطاقة', 'Open card'),

  // Related
  relEvents: s('أحداث تاريخية', 'Historical events'),
  relStages: s('مسيرة التوحيد', 'Unification'),
  relVisits: s('زيارات ملكية', 'Royal visits'),
  relPlaces: s('مواقع', 'Places'),
  nothingRelated: s('لا يوجد محتوى مرتبط بعد.', 'No linked content yet.'),

  // Generic content states
  pendingText: s('المحتوى قيد الإعداد', 'Content coming soon'),
  imagePending: s('صورة بانتظار الاعتماد', 'Image awaiting approval'),
  sources: s('المصادر', 'Sources'),
  imageSource: s('المصدر', 'Source'),
  noSources: s('المصدر سيُضاف مع المحتوى المعتمد.', 'Source will be added with the approved content.'),

  // Timeline
  timelineIntro: s('تنقّل بين العصور، واختر حدثًا لقراءة تفاصيله ومعرفة موقعه على الخريطة.', 'Move between eras and pick an event to read about it and find it on the map.'),
  era: s('الحقبة', 'Era'),
  eventOf: s('حدث', 'Event'),
  of: s('من', 'of'),

  // Unification
  unificationIntro: s('رحلة تفاعلية في أربع محطات. تقدّم أو ارجع بين المحطات.', 'An interactive journey in four stages. Move forward and back through them.'),
  stage: s('المحطة', 'Stage'),
  distinction: s('1913م ليس 1932م', '1913 is not 1932'),
  distinctionText: s(
    'استعادة الأحساء عام 1913م حدثٌ في مسيرة التوحيد، أما إعلان توحيد المملكة العربية السعودية فكان عام 1932م.',
    'The recovery of Al-Ahsa in 1913 was one step in the unification. The Kingdom of Saudi Arabia was declared in 1932.',
  ),
  milestone1913: s('استعادة الأحساء', 'Al-Ahsa recovered'),
  milestone1932: s('إعلان المملكة', 'Kingdom declared'),
  placesInStage: s('المواقع', 'Places'),

  // Royal
  royalIntro: s('بطاقات الزيارات الملكية، مرتبة حسب الملك أو الموقع.', 'Royal visit cards, arranged by king or by place.'),
  byKing: s('حسب الملك', 'By king'),
  byPlace: s('حسب الموقع', 'By place'),
  allKings: s('كل الملوك', 'All kings'),
  allPlaces: s('كل المواقع', 'All places'),
  occasion: s('المناسبة', 'Occasion'),
  photoPending: s('الصورة التاريخية تُضاف بعد التحقق من مصدرها وحقوقها', 'Historical photo added only after its source and rights are verified'),
  noVisits: s('لا توجد زيارات لهذا الاختيار بعد.', 'No visits for this selection yet.'),

  all: s('الكل', 'All'),


  // Booth
  idleTitle: s('هل ما زلت تستكشف؟', 'Still exploring?'),
  idleText: s('ستعود الشاشة إلى البداية للزائر التالي خلال', 'The screen will return to the start for the next visitor in'),
  seconds: s('ثانية', 'seconds'),
  keepExploring: s('أكمل الاستكشاف', 'Keep exploring'),
  boothOn: s('وضع الجناح مفعّل', 'Booth mode on'),

  // Sources page
  sourcesIntro: s(
    'كل معلومة في الموقع مرتبطة بمصدرها. المصادر المؤشَّر عليها مؤقتة للنموذج الأولي، وتُستبدل بمصادر رسمية قبل الإطلاق.',
    'Every fact on the site links to its source. Sources marked “prototype” are temporary and will be replaced with official ones before launch.',
  ),
  imageCredits: s('حقوق الصور', 'Image credits'),
  noImages: s('لا يحتوي النموذج الأولي على صور خارجية. كل الصور الحالية عناصر زخرفية أصلية.', 'The prototype contains no external photographs. All current visuals are original decorative elements.'),
  mapCredits: s('بيانات الخريطة', 'Map data'),
  prototypeSource: s('مصدر مؤقت', 'Prototype source'),
  accessed: s('تاريخ الاطلاع', 'Accessed'),
  notFound: s('الصفحة غير موجودة.', 'Page not found.'),
};

export type StringKey = keyof typeof strings;
