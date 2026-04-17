import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPostEntry {
  slug: string;
  source: 'local';
  data: {
    title: string;
    description: string;
    excerpt: string;
    category: string;
    date: Date;
    featuredImage: string;
    featuredImageAlt: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  localEntry?: CollectionEntry<'blog'>;
}

export interface EventEntry {
  slug: string;
  source: 'local';
  data: {
    title: string;
    description: string;
    city: string;
    venue: string;
    address?: string;
    startDate: Date;
    endDate?: Date;
    timeLabel: string;
    status: 'upcoming' | 'completed';
    featured: boolean;
    registrationUrl?: string;
    mapUrl?: string;
    mapEmbedUrl?: string;
  };
}

export interface AgendaEntry {
  slug: string;
  source: 'local';
  data: {
    title: string;
    description: string;
    date: Date;
    location: string;
    audience: string;
    relatedEventSlug?: string;
    featured: boolean;
  };
}

function mapLocalBlogPost(post: CollectionEntry<'blog'>): BlogPostEntry {
  return {
    slug: post.slug,
    source: 'local',
    localEntry: post,
    data: {
      title: post.data.title,
      description: post.data.description,
      excerpt: post.data.excerpt,
      category: post.data.category,
      date: post.data.date,
      featuredImage: post.data.featuredImage,
      featuredImageAlt: post.data.featuredImageAlt,
      seoTitle: post.data.seoTitle,
      seoDescription: post.data.seoDescription,
    },
  };
}

function mapLocalEvent(event: CollectionEntry<'events'>): EventEntry {
  return {
    slug: event.slug,
    source: 'local',
    data: {
      title: event.data.title,
      description: event.data.description,
      city: event.data.city,
      venue: event.data.venue,
      address: event.data.address,
      startDate: event.data.startDate,
      endDate: event.data.endDate,
      timeLabel: event.data.timeLabel,
      status: event.data.status,
      featured: event.data.featured,
      registrationUrl: event.data.registrationUrl,
      mapUrl: event.data.mapUrl,
      mapEmbedUrl: event.data.mapEmbedUrl,
    },
  };
}

function mapLocalAgendaItem(item: CollectionEntry<'agenda'>): AgendaEntry {
  return {
    slug: item.slug,
    source: 'local',
    data: {
      title: item.data.title,
      description: item.data.description,
      date: item.data.date,
      location: item.data.location,
      audience: item.data.audience,
      relatedEventSlug: item.data.relatedEventSlug,
      featured: item.data.featured,
    },
  };
}

export async function getPublishedBlogPosts(limit?: number) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts
    .sort((left, right) => right.data.date.getTime() - left.data.date.getTime())
    .map(mapLocalBlogPost);
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostEntry | null> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const post = posts.find((entry) => entry.slug === slug);
  return post ? mapLocalBlogPost(post) : null;
}

export async function getAllBlogPostSlugs() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getFeaturedEvents(limit?: number) {
  const events = await getCollection('events', ({ data }) => data.featured);
  const sorted = events
    .sort((left, right) => left.data.startDate.getTime() - right.data.startDate.getTime())
    .map(mapLocalEvent);
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

export async function getFeaturedAgendaItems(limit?: number) {
  const items = await getCollection('agenda', ({ data }) => data.featured);
  const sorted = items
    .sort((left, right) => left.data.date.getTime() - right.data.date.getTime())
    .map(mapLocalAgendaItem);
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderPortableTextHtml(blocks: any[] | undefined) {
  if (!Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block?._type !== 'block') {
        return '';
      }

      const text = Array.isArray(block.children)
        ? block.children.map((child: any) => escapeHtml(child?.text ?? '')).join('')
        : '';

      if (!text.trim()) {
        return '';
      }

      switch (block.style) {
        case 'h2':
          return `<h2>${text}</h2>`;
        case 'h3':
          return `<h3>${text}</h3>`;
        case 'blockquote':
          return `<blockquote>${text}</blockquote>`;
        default:
          return `<p>${text}</p>`;
      }
    })
    .join('');
}
