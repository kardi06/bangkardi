/**
 * Single source of truth for everything the sites list.
 * Gateway, CV, labs, tools and notes read from here. Never retype a project elsewhere.
 * Facts below come from the owner's CV. Do not add claims that are not in the CV.
 */

export type ProjectKind = 'case-study' | 'lab' | 'tool' | 'note' | 'novel';

/** idea = not started, draft = exists but not public, live = linkable */
export type ProjectStatus = 'idea' | 'draft' | 'live';

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  /** Write-up page. When set, the gateway shows a "Read the write-up" link. */
  article?: string;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  title: string;
  /** Free text shown to humans, e.g. "2025 – Jul 2026" */
  period: string;
  /** Where it happened, e.g. "Voyage, contract" */
  context: string;
  summary: string;
  stack: string[];
  featured: boolean;
  status: ProjectStatus;
  links: ProjectLinks;
}

export const projects: Project[] = [
  {
    id: 'voyage-search',
    kind: 'case-study',
    title: 'Took a half-built analytics product to production',
    period: '2025 – Jul 2026',
    context: 'Voyage, senior full-stack engineer (contract)',
    summary:
      'Took over a product an outside vendor had spent about 2 years on and carried it from roughly 60% complete to release in about 4 months, working directly under the CTO. Built Elasticsearch search over about 1M social media posts, and fixed counts capped at 10,000 and emotion aggregations limited to 10 buckets so results matched the source data.',
    stack: ['Elasticsearch', 'React', 'GraphQL', 'TypeScript'],
    featured: true,
    status: 'draft',
    links: {},
  },
  {
    id: 'myconnect-release-pipeline',
    kind: 'case-study',
    title: 'Releases without downtime, and errors that surface',
    period: 'Apr 2026 – now',
    context: 'MyConnect.ai, full-stack engineer',
    summary:
      'Rebuilt the frontend release pipeline on Azure App Service with staging slots, health checks and a production swap. That removed roughly 5 to 10 minutes of downtime per deploy and allows up to 4 releases a day. Introduced Sentry across backend, frontend and background jobs, which surfaced 100+ previously untracked errors per month.',
    stack: ['Azure App Service', 'AWS', 'Sentry', 'Node.js', 'React'],
    featured: true,
    status: 'draft',
    links: {},
  },
  {
    id: 'muneris-log-platform',
    kind: 'case-study',
    title: 'A security log platform for a government agency',
    period: '2024 – 2025',
    context: 'Softnet, software engineer',
    summary:
      'Muneris turns the standard ELK Stack into a purpose-built monitoring application. It parses logs from F5, FireEye, Palo Alto and other network hardware at millions of logs per day, with dashboards, a traffic map and threat validation by severity. Retention is tiered: 3 months for low and normal severity, up to 1 year for high and critical. It brought in about IDR 1.5 billion in revenue.',
    stack: ['ELK Stack', 'Linux servers'],
    featured: true,
    status: 'draft',
    links: {},
  },
  {
    id: 'seat-booking',
    kind: 'case-study',
    title: 'Bookings that stay correct under duplicates and failed payments',
    period: 'Personal project',
    context: 'Seat booking system',
    summary:
      'A trial class booking system that stays correct under duplicate bookings and payment failures, using row-level locking, idempotency keys and 18 integration tests against a real PostgreSQL database.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    featured: true,
    status: 'draft',
    links: {},
  },
];

export const byKind = (kind: ProjectKind): Project[] =>
  projects.filter((p) => p.kind === kind);
