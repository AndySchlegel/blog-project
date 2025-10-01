export const categories = [
  'Next.js',
  'React',
  'CSS',
  'Tooling',
  'Architecture',
  'Community'
];

export const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt:
      'Learn the basics of Next.js and build your first application with the App Router.',
    content: `Next.js is a powerful React framework that enables you to build\nproduction-ready applications with ease. It provides features like\nserver-side rendering, static site generation, and API routes out of the box.\n\nIn this tutorial, we\'ll explore the fundamentals of Next.js and\nbuild a simple blog application from scratch.`,
    date: '2024-01-15',
    author: 'John Doe',
    category: 'Next.js',
    image: '/images/nextjs-intro.svg'
  },
  {
    id: 2,
    title: 'Understanding Server Components',
    excerpt:
      'Deep dive into React Server Components in Next.js 13+ and how they change data fetching.',
    content: `React Server Components (RSC) let you keep heavy logic on the server\nwhile sending a lightweight payload to the browser.\n\nThey pair nicely with streaming and Suspense to unlock great performance\nwithout sacrificing developer experience.`,
    date: '2024-01-16',
    author: 'Jane Smith',
    category: 'Architecture',
    image: '/images/server-components.svg'
  },
  {
    id: 3,
    title: 'API Routes Best Practices',
    excerpt:
      'Learn how to build robust APIs with Next.js API routes and handle common pitfalls.',
    content: `API Routes in Next.js let you build backend endpoints inside your\nfrontend application. Use them for contact forms, dashboards, webhooks,\nand more.\n\nRemember to handle errors gracefully and sanitize user input before\nprocessing data.`,
    date: '2024-01-17',
    author: 'Bob Johnson',
    category: 'Tooling',
    image: '/images/api-routes.svg'
  },
  {
    id: 4,
    title: 'Styling Strategies for React Apps',
    excerpt:
      'Compare global CSS, CSS Modules, and Tailwind to decide which tool fits your team best.',
    content: `Teams rarely use a single styling strategy. Combine global CSS for\nresets, CSS Modules for component encapsulation, and utility frameworks\nfor rapid prototyping.\n\nPick the right tool for the job and document your design tokens clearly.`,
    date: '2024-01-20',
    author: 'Sarah Connor',
    category: 'CSS',
    image: '/images/styling-strategies.svg'
  },
  {
    id: 5,
    title: 'Collaborating Effectively on Frontend Teams',
    excerpt:
      'Organise your project structure to keep components discoverable and testable.',
    content: `Clear project structure is a force multiplier for teams. Create\ndedicated folders for components, utilities, and feature areas.\n\nUse linting and formatting to keep the codebase consistent and easy to onboard.`,
    date: '2024-01-25',
    author: 'Alex Lee',
    category: 'Community',
    image: '/images/team-collaboration.svg'
  },
  {
    id: 6,
    title: 'From Pages Router to App Router',
    excerpt:
      'Migrating legacy apps? Here is a checklist to move from the Pages Router to the App Router.',
    content: `Migration becomes manageable when you break it down.\nStart with shared layouts, move API routes, then convert pages to\nserver components gradually.\n\nDocument every change so the rest of the team can follow along.`,
    date: '2024-02-02',
    author: 'Nina Patel',
    category: 'Next.js',
    image: '/images/app-router-migration.svg'
  }
];

export function getPostById(id) {
  return mockPosts.find((post) => String(post.id) === String(id));
}

export function getPaginatedPosts(page = 1, perPage = 6) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const totalPages = Math.ceil(mockPosts.length / perPage);

  return {
    items: mockPosts.slice(start, end),
    currentPage: page,
    totalPages
  };
}
