export const projects = [
  {
    id: 'stayhub',
    title: 'StayHub',
    description:
      'StayHub is a platform that provides a convenient and user-friendly way for users to book accommodations and facilities.',
    technologies: ['Laravel', 'React.js', 'MySQL'],
    imageClass: 'd-block w-100',
    images: [
      '/assets/images/projects/stayhub/landing-pages.svg',
      '/assets/images/projects/stayhub/login.svg',
      '/assets/images/projects/stayhub/dashboard.svg',
    ],
    links: {
      demo: { url: 'https://kost-stayhub.vercel.app/', label: 'Live Demo' },
      github: { url: 'https://github.com/mochammadsk/stayhub-frontend' },
    },
  },
  {
    id: 'nunwayo',
    title: 'NunWaYo',
    description:
      'Online food ordering platform featuring user authentication, order management, and real-time tracking.',
    technologies: ['Node.js', 'Express.js', 'MySQL'],
    imageClass: 'd-block w-65 mx-auto',
    images: [
      '/assets/images/projects/nunwayo/dashboard.svg',
      '/assets/images/projects/nunwayo/order.svg',
      '/assets/images/projects/nunwayo/map.svg',
    ],
    links: {
      demo: {
        url: 'https://play.google.com/store/apps/details?id=com.nunwayo_customer',
        label: 'Live Demo',
      },
      github: null,
    },
  },
];
