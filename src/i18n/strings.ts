import type { LocalizedText } from '@/types/content';

/**
 * Interface strings (buttons, labels, messages). Content text lives in src/data.
 * Add a key here once; TypeScript will flag any place that uses a missing key.
 */
const s = (ar: string, en: string): LocalizedText => ({ ar, en });

export const strings = {
  siteName: s('اكتشف الشرقية', 'Discover the Eastern Province'),
  tagline: s('أرض الحضارات، وقصة التوحيد، وآفاق المستقبل', 'A land of ancient civilisations, the story of unification and a future in the making'),
  startExploring: s('ابدأ الاستكشاف', 'Start exploring'),
  switchLang: s('English', 'العربية'),
  switchLangShort: s('EN', 'ع'),
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
  navUnification: s('الشرقية ومسيرة التوحيد', 'The Eastern Province and the Unification of Saudi Arabia'),
  navRoyal: s('مسيرة الشرقية عبر عهود الملوك', 'The Eastern Province Through the Reigns of Its Kings'),
  navSources: s('المصادر والحقوق', 'Sources & credits'),
  footerCredit: s(
    'مشروع من إعداد الفرع الطلابي لجمعية مهندسي البترول (SPE) بجامعة الملك فهد للبترول والمعادن',
    'A project by the SPE Student Chapter at King Fahd University of Petroleum & Minerals',
  ),
  speLogoAlt: s('شعار الفرع الطلابي لجمعية مهندسي البترول بجامعة الملك فهد للبترول والمعادن', 'SPE Student Chapter, King Fahd University of Petroleum & Minerals'),

  shortExplore: s('الخريطة', 'Map'),
  shortTimeline: s('عبر الزمن', 'Timeline'),
  shortUnification: s('التوحيد', 'Unification'),
  shortRoyal: s('الملوك', 'Kings'),

  blurbTimeline: s('من حضارة دلمون إلى يومنا هذا', 'From ancient Dilmun to the present day'),
  blurbUnification: s('من دخول الأحساء عام 1913م إلى إعلان المملكة عام 1932م', 'From Al-Ahsa in 1913 to the founding of the Kingdom in 1932'),
  blurbRoyal: s('ما حققته الشرقية في عهد كل ملك', 'What each reign brought to the province'),


  // Map
  mapTitle: s('خريطة المنطقة الشرقية', 'Map of the Eastern Province'),
  filters: s('التصنيفات', 'Filters'),
  noPlacesForFilter: s('لا توجد مواقع لهذا التصنيف بعد.', 'No places in this category yet.'),
  backTo: s('العودة إلى', 'Back to'),
  backToMap: s('العودة إلى الخريطة', 'Back to the map'),
  viewOnMap: s('عرض على الخريطة', 'View on map'),


  // Generic content states
  sources: s('المصادر', 'Sources'),
  imageSource: s('المصدر', 'Source'),

  // Timeline

  // Unification
  stage: s('المحطة', 'Stage'),
  distinction: s('محطتان مختلفتان', 'Two different milestones'),
  distinctionText: s(
    'استعادة الأحساء عام 1913م كانت خطوة على طريق التوحيد، أما إعلان توحيد المملكة العربية السعودية فجاء عام 1932م.',
    'Recovering Al-Ahsa in 1913 was one step on the road to unification; the Kingdom of Saudi Arabia itself was declared in 1932.',
  ),
  milestone1913: s('استعادة الأحساء', 'Al-Ahsa recovered'),
  milestone1932: s('إعلان المملكة', 'Kingdom declared'),

  // Kings
  milestones: s('أبرز المحطات', 'Key milestones'),

  all: s('الكل', 'All'),

  // Booth
  idleTitle: s('هل ما زلت تستكشف؟', 'Still exploring?'),
  idleText: s('ستعود الشاشة إلى البداية استعدادًا للزائر التالي خلال', 'The screen will go back to the start for the next visitor in'),
  seconds: s('ثانية', 'seconds'),
  keepExploring: s('أكمل الاستكشاف', 'Keep exploring'),

  // Sources page
  sourcesIntro: s(
    'تستند معلومات هذا الموقع وصوره إلى المصادر التالية، ويمكنك فتح كل مصدر للاطلاع عليه.',
    'The information and photos on this site draw on the sources below. Each one links to the original where available.',
  ),
  imageCredits: s('مصادر الصور', 'Photo credits'),
  noImages: s('لا توجد صور منشورة بعد.', 'No photos have been published yet.'),
  mapCredits: s('بيانات الخريطة', 'Map data'),
  publicDomain: s('ملكية عامة', 'public domain'),
  accessed: s('تاريخ الاطلاع', 'Accessed'),
  notFound: s('لم نجد هذه الصفحة.', 'We couldn’t find that page.'),
};

export type StringKey = keyof typeof strings;
