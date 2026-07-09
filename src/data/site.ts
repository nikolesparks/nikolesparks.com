// Single source of truth for site-wide content: navigation, contact details,
// office locations, and licensing. Editing these values updates every page.

export const site = {
  name: 'Nikole Sparks',
  title: 'Nikole Sparks, AMFT — Depth Therapy in Orange County',
  description:
    'Depth-oriented, psychodynamic, attachment-based psychotherapy for adults, teens, and couples. In-person in Newport Beach & Fullerton, or online throughout California.',
  url: 'https://nikolesparks.com',
  role: 'Associate Marriage & Family Therapist',
  license: 'AMFT no. 150080',
  supervisor: 'Supervised by Dr. Michele Willingham, PSY 15849',
  email: 'info@nikolesparks.com',
  phone: '949.942.5301',
  phoneHref: 'tel:9499425301',
};

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'Services', href: '/services/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Contact', href: '/contact/' },
];

export const offices = [
  {
    name: 'Fullerton',
    lines: ['1619 East Chapman Ave', 'Fullerton, CA 92831'],
  },
  {
    name: 'Newport Beach',
    lines: ['1300 Quail Street, Suite 206', 'Newport Beach, CA 92660'],
  },
];

// The four consultation steps reused across most pages.
export const consultSteps = [
  'Discuss what brings you to therapy',
  'Talk about how I might help',
  'Answer any questions you have',
  "See if we're a good fit",
];
