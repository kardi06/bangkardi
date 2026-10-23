/**
 * Site-wide facts. Edit here, not in components.
 * Empty string = not set yet; the UI hides that link instead of showing a dead one.
 */
export const site = {
  name: 'Kardiansyah',
  shortName: 'Kardi',
  role: 'Senior Full-Stack Engineer',
  location: 'Jakarta, Indonesia (GMT+7)',
  title: 'Kardi, senior full-stack engineer',
  description:
    'Senior full-stack engineer with 9+ years shipping SaaS and data platforms with Node.js, TypeScript, NestJS, React and Next.js on AWS and Azure.',
  email: 'kardi.ib@gmail.com',
  links: {
    // Owner may switch LinkedIn to a shorter custom URL later; update here only.
    linkedin: 'https://www.linkedin.com/in/kardi-ansyah-64aa9b102/',
    github: 'https://github.com/kardi06',
    // TODO(owner): link to the CV site (cv.<domain>) or a PDF placed in apps/gateway/public/.
    cv: '',
  },
} as const;
