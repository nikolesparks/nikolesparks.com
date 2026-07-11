// Structured data (JSON-LD) source of truth.
//
// Two site-wide entities are injected into the <head> of every page via
// Layout.astro: the practice (ProfessionalService / MedicalBusiness) and the
// person (Nikole Sparks). Service and FAQ pages append their own nodes to the
// same @graph so everything resolves against one set of @id references.
//
// @id values are stable identifiers and must not change casually — external
// tools and Google's entity graph key off them. When licensure changes from
// AMFT to LMFT, update jobTitle/name but keep the @id values intact.

import { site } from './site';

const practiceId = 'https://nikolesparks.com/#practice';
const personId = 'https://nikolesparks.com/#nikole-sparks';
const newportOfficeId = 'https://nikolesparks.com/#newport-beach-office';
const fullertonOfficeId = 'https://nikolesparks.com/#fullerton-office';

// Absolute URLs for brand imagery (files live in /public).
const shareCard = `${site.url}/nikole-sharecard.jpg`;
const portrait = `${site.url}/nikole-website.webp`;

// Off-site profiles that establish entity identity (sameAs).
const sameAs = [
  'https://www.psychologytoday.com/us/therapists/nikole-sparks-fullerton-ca/1408542',
  'https://www.therapyden.com/therapist/nikole-sparks-newport-beach-ca',
];

// The practice. Types merge the ProfessionalService blueprint with the
// MedicalBusiness node from the SEO manual; real address/phone/email come from
// site.ts so there is a single source of truth for contact details.
export const practiceNode = {
  '@type': ['MedicalBusiness', 'ProfessionalService'],
  '@id': practiceId,
  name: 'Nikole Sparks, AMFT',
  description:
    'Depth-oriented, attachment-based individual and couples therapy in Newport Beach and Fullerton, CA, and online throughout California.',
  url: site.url,
  telephone: '+19499425301',
  email: site.email,
  priceRange: '$$',
  image: shareCard,
  // The two offices are modeled as separate branch entries (below) rather than a
  // single merged address, so each location can rank on its own in local search.
  location: [{ '@id': newportOfficeId }, { '@id': fullertonOfficeId }],
  areaServed: [
    { '@type': 'City', name: 'Newport Beach' },
    { '@type': 'City', name: 'Fullerton' },
    { '@type': 'City', name: 'Orange County' },
    { '@type': 'State', name: 'California' },
  ],
  sameAs,
};

// Physical office #1 — Newport Beach. A LocalBusiness branch of the practice.
export const newportOfficeNode = {
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': newportOfficeId,
  name: 'Nikole Sparks, AMFT — Newport Beach',
  parentOrganization: { '@id': practiceId },
  url: site.url,
  telephone: '+19499425301',
  email: site.email,
  priceRange: '$$',
  image: shareCard,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1300 Quail Street, Suite 206',
    addressLocality: 'Newport Beach',
    addressRegion: 'CA',
    postalCode: '92660',
    addressCountry: 'US',
  },
  hasMap:
    'https://maps.google.com/?q=1300+Quail+Street+Suite+206+Newport+Beach+CA+92660',
  areaServed: [
    { '@type': 'City', name: 'Newport Beach' },
    { '@type': 'AdministrativeArea', name: 'Orange County' },
  ],
};

// Physical office #2 — Fullerton. A LocalBusiness branch of the practice.
export const fullertonOfficeNode = {
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': fullertonOfficeId,
  name: 'Nikole Sparks, AMFT — Fullerton',
  parentOrganization: { '@id': practiceId },
  url: site.url,
  telephone: '+19499425301',
  email: site.email,
  priceRange: '$$',
  image: shareCard,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1619 East Chapman Ave',
    addressLocality: 'Fullerton',
    addressRegion: 'CA',
    postalCode: '92831',
    addressCountry: 'US',
  },
  hasMap:
    'https://maps.google.com/?q=1619+East+Chapman+Ave+Fullerton+CA+92831',
  areaServed: [
    { '@type': 'City', name: 'Fullerton' },
    { '@type': 'AdministrativeArea', name: 'Orange County' },
  ],
};

// The therapist.
export const personNode = {
  '@type': 'Person',
  '@id': personId,
  name: 'Nikole Sparks',
  jobTitle: 'Associate Marriage and Family Therapist',
  description:
    'Nikole Sparks, AMFT 150080, is a depth-oriented, attachment-based therapist offering individual and couples therapy in Newport Beach, Fullerton, and online throughout California. Supervised by Dr. Michele Willingham, PSY 15849.',
  url: `${site.url}/about/`,
  email: site.email,
  telephone: '+19499425301',
  image: portrait,
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Fuller Graduate School of Psychology',
      description: 'M.S. Marriage & Family Therapy',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Talbot School of Theology',
      description: 'M.A. Spiritual Formation & Soul Care',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Biola University',
      description: 'B.F.A. Design',
    },
  ],
  worksFor: { '@id': practiceId },
  knowsAbout: [
    'Psychodynamic Therapy',
    'Depth-Oriented Therapy',
    'Attachment-Based Therapy',
    'Anxiety Treatment',
    'Depression Treatment',
    'Christian Therapy',
    'Religious Trauma',
    'Couples Therapy',
    'Premarital Counseling',
    'Grief Therapy',
  ],
  sameAs,
};

// Standard channel list reused across service nodes: two offices + telehealth.
const officeChannels = [
  {
    '@type': 'ServiceChannel',
    serviceLocation: {
      '@type': 'Place',
      name: 'Newport Beach Office',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Newport Beach',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
  },
  {
    '@type': 'ServiceChannel',
    serviceLocation: {
      '@type': 'Place',
      name: 'Fullerton Office',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fullerton',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
  },
  { '@type': 'ServiceChannel', name: 'Telehealth throughout California' },
];

const serviceAreaServed = [
  { '@type': 'City', name: 'Newport Beach' },
  { '@type': 'City', name: 'Fullerton' },
  { '@type': 'AdministrativeArea', name: 'Orange County' },
  { '@type': 'State', name: 'California' },
];

// Service nodes are provided by the practice (task 3). The person is already
// linked to the practice via worksFor, so the practice is the correct provider.
export const individualTherapyService = {
  '@type': 'Service',
  '@id': 'https://nikolesparks.com/services/individual-therapy#service',
  name: 'Individual Therapy',
  alternateName: 'Depth Therapy for Anxiety, Depression, and Trauma',
  description:
    'Individual psychodynamic therapy for adults in Newport Beach, Fullerton, and across California via telehealth. Specializes in anxiety, depression, relational trauma, and exploring the root causes of over-responsibility and emotional distress.',
  url: 'https://nikolesparks.com/services/individual-therapy',
  serviceType: 'Psychotherapy',
  provider: { '@id': practiceId },
  areaServed: serviceAreaServed,
  availableChannel: officeChannels,
  audience: { '@type': 'Audience', audienceType: 'Adults' },
};

export const couplesTherapyService = {
  '@type': 'Service',
  '@id': 'https://nikolesparks.com/services/couples-therapy#service',
  name: 'Couples Therapy',
  alternateName: 'Relationship Counseling for Couples',
  description:
    'Couples therapy in Fullerton, Newport Beach, and Orange County for partners seeking help with communication, conflict, emotional distance, trust, and relationship patterns. Telehealth available throughout California.',
  url: 'https://nikolesparks.com/services/couples-therapy',
  serviceType: 'Couples Therapy',
  provider: { '@id': practiceId },
  areaServed: serviceAreaServed,
  availableChannel: officeChannels,
  audience: { '@type': 'Audience', audienceType: 'Couples' },
};

export const premaritalCounselingService = {
  '@type': 'Service',
  '@id': 'https://nikolesparks.com/services/premarital-counseling#service',
  name: 'Premarital Counseling',
  alternateName: 'Prepare & Enrich Premarital Counseling',
  description:
    'Attachment-focused premarital counseling in Newport Beach and Fullerton, and online throughout California, built around the Prepare & Enrich assessment. Explore communication, expectations, family history, and conflict before marriage.',
  url: 'https://nikolesparks.com/services/premarital-counseling',
  serviceType: 'Premarital Counseling',
  provider: { '@id': practiceId },
  areaServed: serviceAreaServed,
  availableChannel: officeChannels,
  audience: { '@type': 'Audience', audienceType: 'Couples' },
  offers: [
    {
      '@type': 'Offer',
      name: 'The Marriage Prep Package',
      description: '8 sessions plus the Prepare & Enrich assessment.',
      price: '1315',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'The Complete Premarital Program',
      description: '12 sessions plus the Prepare & Enrich assessment.',
      price: '1955',
      priceCurrency: 'USD',
    },
  ],
};

export const anxietyTherapyService = {
  '@type': 'Service',
  '@id': 'https://nikolesparks.com/services/therapy-for-anxiety#service',
  name: 'Anxiety Therapy',
  alternateName: 'Depth-Oriented Therapy for Anxiety',
  description:
    'Depth-oriented, psychodynamic therapy for anxiety in Newport Beach and Fullerton, and online throughout California. Understand what your anxiety is responding to, rather than only managing symptoms.',
  url: 'https://nikolesparks.com/services/therapy-for-anxiety',
  serviceType: 'Anxiety Therapy',
  provider: { '@id': practiceId },
  areaServed: serviceAreaServed,
  availableChannel: officeChannels,
  audience: { '@type': 'Audience', audienceType: 'Adults' },
};

export const creativesTherapyService = {
  '@type': 'Service',
  '@id': 'https://nikolesparks.com/services/therapy-for-creatives#service',
  name: 'Therapy for Creatives',
  alternateName: 'Therapy for Creative Burnout and Imposter Syndrome',
  description:
    'Depth therapy for burnout, imposter syndrome, perfectionism, and creative blocks in Newport Beach and Fullerton, and online throughout California, from a therapist who spent over a decade as a designer.',
  url: 'https://nikolesparks.com/services/therapy-for-creatives',
  serviceType: 'Therapy for Creatives',
  provider: { '@id': practiceId },
  areaServed: serviceAreaServed,
  availableChannel: officeChannels,
  audience: { '@type': 'Audience', audienceType: 'Adults' },
};

// Build a FAQPage node from a page's visible FAQ items so the structured data
// always matches what visitors actually see (a Google rich-results requirement).
// `items` is the same [{ q, a[] }] shape the Faq component renders.
export function faqPage(
  items: { q: string; a: string[] }[],
  opts: { id?: string; url?: string } = {},
) {
  const clean = (s: string) =>
    s
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .trim();

  return {
    '@type': 'FAQPage',
    ...(opts.id ? { '@id': opts.id } : {}),
    ...(opts.url ? { url: opts.url } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: clean(item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.map(clean).join(' '),
      },
    })),
  };
}

// Wrap page-specific nodes into a single graph alongside the site-wide
// practice + person entities.
export function pageGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      practiceNode,
      newportOfficeNode,
      fullertonOfficeNode,
      personNode,
      ...nodes,
    ],
  };
}
