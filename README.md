# Bader Beyler Astro Site

Tek dosyalık statik HTML sitenin Astro tabanlı, component odaklı ve ileride CMS ile beslenebilecek sürümüdür.

## Komutlar

```bash
npm install
npm run dev
npm run build
npm run preview
```

Sanity Studio için:

```bash
npm run cms:dev
```

Studio yerel olarak `http://localhost:3333` adresinde açılır.

## Sanity Panel Kurulumu

1. `.env.example` dosyasını `.env` olarak kopyala.
2. Aşağıdaki alanları kendi Sanity projenle doldur:

```env
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

3. İki terminal aç:

```bash
npm run dev
npm run cms:dev
```

4. Siteyi `http://localhost:4321`, yönetim panelini `http://localhost:3333` üzerinden aç.

## Klasör Yapısı

```text
src/
  components/
    sections/
  content/
    agenda/
    blog/
    events/
  data/
  layouts/
  lib/
  pages/
  styles/
public/
  assets/images/
sanity/
  schemaTypes/
```

## Yönetilebilir Alanlar

- `Site Ayarları`: Marka adı, navbar, hero, hakkında, hizmetler, iş birlikleri, medya sayfası, iletişim, footer
- `Site Ayarları > Navigasyon Tasarımı`: Üst menü marka ve link font boyutları
- `Site Ayarları > Hero`: Sağ panel başlık/metin ve panel boyutu
- `Site Ayarları > İş Birlikleri > Ortak Kartları > Kart Tasarım Ayarları`: Foto boyutu, kutu yüksekliği, görsel offset, metin blok offset, font büyüklükleri
- `Blog Post`: Blog içerikleri
- `Event`: Etkinlikler
- `Agenda Item`: Ajanda / toplantı maddeleri

Sanity boşsa site mevcut `src/content/*` ve `src/data/site.ts` verileriyle çalışmaya devam eder. Sanity dolduğunda aynı alanlar panel verisiyle override edilir.

## Sanity Geçişi

Schema dosyaları `sanity/schemaTypes` altında hazırdır. `src/lib/site-data.ts` ve `src/lib/content.ts` katmanları sayesinde ana site hem yerel fallback içerikle hem de Sanity verisiyle çalışır.
