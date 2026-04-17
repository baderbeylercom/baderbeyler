import {
  aboutContent,
  blogContent,
  collaborationsContent,
  contactContent,
  eventsContent,
  footerContent,
  heroContent,
  mediaPageContent,
  motionStories,
  navAppearance,
  navLinks,
  newsletterContent,
  pageDots,
  servicesContent,
  siteConfig,
} from '../data/site';

export interface SiteData {
  siteConfig: typeof siteConfig;
  navAppearance: typeof navAppearance;
  navLinks: typeof navLinks;
  pageDots: typeof pageDots;
  heroContent: typeof heroContent;
  motionStories: typeof motionStories;
  aboutContent: typeof aboutContent;
  servicesContent: typeof servicesContent;
  collaborationsContent: typeof collaborationsContent;
  eventsContent: typeof eventsContent;
  blogContent: typeof blogContent;
  mediaPageContent: typeof mediaPageContent;
  newsletterContent: typeof newsletterContent;
  contactContent: typeof contactContent;
  footerContent: typeof footerContent;
}

const defaultSiteData: SiteData = {
  siteConfig,
  navAppearance,
  navLinks,
  pageDots,
  heroContent,
  motionStories,
  aboutContent,
  servicesContent,
  collaborationsContent,
  eventsContent,
  blogContent,
  mediaPageContent,
  newsletterContent,
  contactContent,
  footerContent,
};

export async function getSiteData(): Promise<SiteData> {
  return structuredClone(defaultSiteData);
}
