export const projects = [
  {
    id: 'gold-management',
    title: 'Gold Management System',
    description:
      'Accounting and inventory management system for gold trading businesses, providing features for tracking transactions, managing inventory, and generating reports.',
    technologies: ['Laravel', 'React.js', 'MySQL'],
    imageClass: 'd-block w-100',
    images: [
      '/assets/images/projects/gold/login.svg',
      '/assets/images/projects/gold/dashboard.svg',
      '/assets/images/projects/gold/batch.svg',
    ],
    links: {
      demo: null,
      github: null,
    },
  },
  {
    id: 'stayhub',
    title: 'StayHub',
    description:
      'StayHub is a platform that provides a convenient and user-friendly way for users to book accommodations and facilities.',
    technologies: ['Express.js', 'React.js', 'MongoDB'],
    imageClass: 'd-block w-100',
    images: [
      '/assets/images/projects/stayhub/login.png',
      '/assets/images/projects/stayhub/landing.png',
      '/assets/images/projects/stayhub/maps.png',
    ],
    links: {
      demo: { url: 'https://kost-stayhub.vercel.app/' },
      github: { url: 'https://github.com/mochammadsk/stayhub-frontend' },
    },
  },
  {
    id: 'nunwayo',
    title: 'NunWaYo',
    description:
      'Point of Sale (POS) application for managing sales, inventory, and customer transactions in a retail environment.',
    technologies: ['Express.js', 'React.js', 'MySQL'],
    imageClass: 'd-block w-65 mx-auto',
    images: [
      '/assets/images/projects/nunwayo/login.png',
      '/assets/images/projects/nunwayo/dashboard.png',
      '/assets/images/projects/nunwayo/branch.png',
    ],
    links: {
      demo: null,
      github: null,
    },
  },
];
