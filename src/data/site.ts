import siteConfigData from './site-config.json';
import heroData from './hero.json';
import aboutData from './about.json';
import servicesData from './services.json';
import contactData from './contact.json';
import footerData from './footer.json';
import navLinksData from './nav-links.json';

type StatItem = {
  value: string;
  label: string;
};

const defaultHeroStats: StatItem[] = [
  { value: 'Moleküler Biyoloji ve Genetik', label: 'Uludağ Üniversitesi' },
  { value: 'Nutrigenetik', label: 'İngiltere · İspanya · TOBB ETÜ' },
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeStatItem(value: unknown, label: unknown): StatItem | null {
  if (!isNonEmptyString(value) || !isNonEmptyString(label)) {
    return null;
  }

  return {
    value: value.trim(),
    label: label.trim(),
  };
}

function parseStats(raw: unknown, fallback: StatItem[]): StatItem[] {
  if (Array.isArray(raw)) {
    const normalized = raw
      .map((item) =>
        item && typeof item === 'object'
          ? normalizeStatItem(
              'value' in item ? (item as { value?: unknown }).value : '',
              'label' in item ? (item as { label?: unknown }).label : '',
            )
          : null,
      )
      .filter((item): item is StatItem => item !== null);

    return normalized.length ? normalized : fallback;
  }

  if (!isNonEmptyString(raw)) {
    return fallback;
  }

  let text = raw.trim().replace(/\r/g, '').replace(/\\"/g, '"').replace(/\\n/g, '\n');

  const bracketStart = text.indexOf('[');
  const bracketEnd = text.lastIndexOf(']');

  if (bracketStart !== -1 && bracketEnd > bracketStart) {
    const candidate = text.slice(bracketStart, bracketEnd + 1);

    try {
      return parseStats(JSON.parse(candidate), fallback);
    } catch {
      // Ignore and continue with line-based parsing below.
    }
  }

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        line !== '[' &&
        line !== ']' &&
        line !== '{' &&
        line !== '},' &&
        line !== '}' &&
        line !== '"stats": [',
    );

  const parsed: StatItem[] = [];
  let pendingValue = '';
  let pendingLabel = '';

  for (const line of lines) {
    const valueMatch = line.match(/"value"\s*:\s*"([^"]+)"/);
    if (valueMatch) {
      pendingValue = valueMatch[1];
    }

    const labelMatch = line.match(/"label"\s*:\s*"([^"]+)"/);
    if (labelMatch) {
      pendingLabel = labelMatch[1];
    }

    if (pendingValue && pendingLabel) {
      parsed.push({ value: pendingValue.trim(), label: pendingLabel.trim() });
      pendingValue = '';
      pendingLabel = '';
      continue;
    }

    const simpleLine = line
      .replace(/^[-*•]\s*/, '')
      .replace(/^"stats"\s*:\s*/, '')
      .replace(/^[",'`]+|[",'`]+$/g, '')
      .trim();

    if (!simpleLine) {
      continue;
    }

    const parts = simpleLine.split(/\s*\/\s*|\s*[—–-]\s*|\s*\|\s*/).map((part) => part.trim());
    if (parts.length >= 2 && parts[0] && parts[1]) {
      parsed.push({ value: parts[0], label: parts.slice(1).join(' / ') });
    }
  }

  return parsed.length ? parsed : fallback;
}

export const siteConfig = { ...siteConfigData };

export const navLinks = navLinksData.links;

export const navAppearance = {
  brandFontSize: 1.66,
  linkFontSize: 0.98,
  bgOpacity: 0.92,
  paddingY: 0.45,
  blur: 22,
  radius: 999,
};

export const pageDots = [
  { target: '#home', label: 'Anasayfa' },
  { target: '#storyOne', label: 'Tanıtım 1' },
  { target: '#storyTwo', label: 'Tanıtım 2' },
  { target: '#about', label: 'Hakkında' },
  { target: '#services', label: 'Hizmetler' },
  { target: '#collaborations', label: 'İş birlikleri' },
  { target: '#events', label: 'Etkinlikler' },
  { target: '#blog', label: 'Blog' },
  { target: '#newsletter', label: 'E-bülten' },
  { target: '#contact', label: 'İletişim' },
];

export const heroContent = {
  ...heroData,
  bgText: isNonEmptyString(heroData.bgText) ? heroData.bgText : 'Bader Beyler',
  rightEyebrow: isNonEmptyString(heroData.rightEyebrow) ? heroData.rightEyebrow : 'Hakkında',
  stats: parseStats(heroData.stats, defaultHeroStats),
  heroImage: '/assets/images/hero-person.png',
  heroImageAlt: 'Bader Beyler ekip görseli',
  focusImage: '/assets/images/hero-focus-portrait.png',
  focusImageAlt: 'Bader Beyler portre görseli',
  appearance: {
    rightPanelWidth: 480,
    rightTitleSize: 3.15,
    rightBodySize: 1.01,
  },
};

export const motionStories = [
  {
    id: 'storyOne',
    tag: 'Genetik Neden Önemli?',
    title: 'Eşsiz sistemlerin eşsiz <em>sorunları</em> vardır.',
    paragraphs: [
      'Genetik analiz, sorunları sorulara çevirerek yanıt verebileceğimiz formu taşır.',
      'Ömür boyu bedensel sisteminizi destekleyecek takviye ve beslenme önerileri; kişisel veriyi doğru okumakla mümkün.',
    ],
    note: 'Bilgiyi kişisel sağlık kararına dönüştüren başlangıç',
    image: '/assets/images/story-one.png',
    imageAlt: 'Bader Beyler motion görseli',
    appearance: { titleSize: 4, bodySize: 1.02, paddingY: 2, paddingBottom: 5.2 },
  },
  {
    id: 'storyTwo',
    reverse: true,
    tag: 'Önleyici Yaklaşım',
    title: 'Genetik analiz, <em>kişiselleştirilmiş</em>',
    paragraphs: [
      "Bu sebeple, kırka varmadan kırkları; 40'dan sonra ise 60'lı yılları öngörebilen, klinik olarak hekim, diyetisyen ve sağlık profesyonellerine %99 oranında kişiselleştirilmiş bir araç olarak genetik analizler, önleyici hekimliğin bir parçası haline geliyor.",
    ],
    note: 'Sol fotoğraf · sağ metin devamı',
    image: '/assets/images/story-two.png',
    imageAlt: 'Bader Beyler motion görseli ikinci blok',
    appearance: { titleSize: 4, bodySize: 1.02, paddingY: 2, paddingBottom: 5.2 },
  },
];

export const aboutContent = {
  ...aboutData,
  images: {
    main: '/assets/images/about-main.png',
    mainAlt: 'Öne çıkan portre',
    accent: '/assets/images/about-accent.png',
    accentAlt: 'Vurgulu portre',
  },
  appearance: {
    titleSize: 3.35,
    bodySize: 1.06,
    statNumberSize: 2.4,
    statLabelSize: 0.8,
    paddingY: 7,
    stackHeight: 560,
    mainPhotoWidth: 68,
    mainPhotoLeft: 8,
    mainPhotoTop: 0,
    accentPhotoWidth: 42,
    accentPhotoRight: 5,
    accentPhotoBottom: 2,
  },
};

export const servicesContent = {
  ...servicesData,
  marqueeImages: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1502767089025-6572583495f0?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
  ],
  appearance: {
    titleSize: 3.35,
    cardTitleSize: 1.34,
    cardBodySize: 0.92,
    paddingY: 7,
    gridGap: 1.15,
  },
};

export const collaborationsContent = {
  eyebrow: 'İş Birliklerimiz',
  title: 'Bilimsel çerçevede <em>güçlü ortaklıklar</em>',
  appearance: { gridGap: 1.2, gridMarginTop: 2.15, itemPaddingTop: 1.8, itemPaddingBottom: 1.45 },
  items: [
    {
      image: '/assets/images/elvan-odabasi.png',
      logo: 'F',
      visualStyle: 'portrait',
      brandLine: 'Formeo by',
      partnerName: 'Elvan Odabaşı',
      imageAlt: 'Elvan Odabaşı iş birliği görseli',
      leadStrong: '40+ Genetik Analiz Paneli',
      leadText: ', kişiye özgü varyantları değerlendirerek beslenme, metabolizma ve yaşam tarzı başlıklarında daha hassas bir yorumlama zemini oluşturur. İş birliği yapısı; veriyi yalnızca ölçmek değil, güncel literatür eşliğinde anlamlandırmak ve pratiğe taşımak üzerine kuruludur.',
      description: '',
      design: { visualHeight: 240, imageWidth: 188, imageScale: 1.0, imageOffsetX: 30, imageOffsetY: 8, blobColor: '#e9ddd0', blobOpacity: 0.92, blobGradientColor: '#d8c9b9', blobGradientOpacity: 0.58, blobWidth: 194, blobHeight: 224, blobOffsetX: -16, blobOffsetY: 6, blobRadius: 44, blobBlur: 0, blobShadowBlur: 34, blobShadowOpacity: 0.16, copyOffsetY: 0.85, brandLineFontSize: 1.14, partnerFontSize: 1.6, leadFontSize: 1.04 },
    },
    {
      image: '/assets/images/intergen-building.png',
      logo: 'I',
      visualStyle: 'portrait',
      brandLine: 'İNTERGEN',
      partnerName: 'Genetik Merkezi',
      imageAlt: 'İNTERGEN Genetik Hastalıklar Değerlendirme Merkezi',
      leadStrong: 'Klinik Genetik İş Birliği',
      leadText: ', İNTERGEN Genetik Hastalıklar Değerlendirme Merkezi ile yürütülen profesyonel iş birliği çerçevesinde vaka bazlı değerlendirme ve klinik destek sağlanmaktadır.',
      description: '',
      design: { visualHeight: 214, imageWidth: 210, imageScale: 1.0, imageOffsetX: 18, imageOffsetY: 8, blobColor: '#d6e4e8', blobOpacity: 0.88, blobGradientColor: '#b8d0d8', blobGradientOpacity: 0.55, blobWidth: 194, blobHeight: 224, blobOffsetX: -12, blobOffsetY: 6, blobRadius: 44, blobBlur: 0, blobShadowBlur: 34, blobShadowOpacity: 0.14, copyOffsetY: 0.85, brandLineFontSize: 1.14, partnerFontSize: 1.6, leadFontSize: 1.04 },
    },
  ],
};

export const mediaPageContent = {
  eyebrow: 'Bilim Dünyasında Sesimiz',
  title: 'Bilimsel içeriklerin <em>kamusal karşılığı</em>',
  description: 'Bu sayfa; söyleşiler, etkinlik duyuruları, basın yansımaları ve uzmanlık katkılarının tek bir çerçevede toplanacağı ayrı alan olarak hazırlandı.',
  highlights: [
    { title: 'Konuşmalar', description: 'Panel, seminer ve özel oturum duyurularını düzenli bir yapıda yayınlamak için ayrılmış alan.' },
    { title: 'Yayınlar', description: 'Röportaj, haber, dosya ve görünürlük içerikleri bu sayfada bloklar halinde sunulabilir.' },
    { title: 'Basın Kiti', description: 'İleride bio, görsel ve indirilebilir dokümanlar için aynı sayfa içinde ayrı modüller eklenebilir.' },
  ],
};

export const eventsContent = {
  eyebrow: 'Etkinlikler',
  title: 'Yaklaşan <em>etkinlikler</em>',
  emptyTitle: 'Yeni duyurular <em>çok yakında</em>',
  emptyText: 'Yeni tarih ve şehir bilgileri netleştikçe bu alan güncellenecek.',
  appearance: { titleSize: 3.35, cardTitleSize: 2.2, paddingY: 7, listMarginTop: 3 },
};

export const blogContent = {
  eyebrow: 'Blog & Bülten',
  title: 'Son <em>yazılarım</em>',
  appearance: { titleSize: 3.35, cardTitleSize: 1.3, paddingY: 7, gridGap: 2 },
};

export const newsletterContent = {
  eyebrow: 'E-Bülten',
  title: 'Gelişmelerden <em>haberdar</em> olun',
  description: 'Yeni yazılar, seminer duyuruları, etkinlik takvimi ve uygulamaya dönük sağlık içeriklerini ilk alan kişiler arasında olun.',
  placeholder: 'E-posta adresiniz',
  buttonLabel: 'Kayıt Ol',
  appearance: { titleSize: 3.35, bodySize: 1.0, paddingY: 7 },
};

export const contactContent = {
  ...contactData,
  appearance: { titleSize: 3.35, bodySize: 0.97, paddingY: 7 },
};

export const footerContent = {
  ...footerData,
  appearance: { fontSize: 0.78, linkSize: 0.78 },
};
