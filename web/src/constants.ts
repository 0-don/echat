
export const __prod__ = 'production' === process.env.NODE_ENV;


export const GRAPHQL_SERVER_URL = __prod__
  ? '/graphql'
  : process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL!;

export const PERS = [
  { id: 1, name: 'Game' },
  { id: 2, name: '15 Min' },
  { id: 3, name: '30 Min' },
  { id: 4, name: '45 Min' },
  { id: 5, name: '60 Min' },
];

export const LEVELS = [
  { id: 1, name: 'Newbie' },
  { id: 2, name: 'Moderate' },
  { id: 3, name: 'Average' },
  { id: 4, name: 'Above Average' },
  { id: 5, name: 'Professional' },
  { id: 6, name: 'Master' },
  { id: 7, name: 'Legend' },
];

export const SCHEDULES = [
  {
    id: 1,
    name: 'Monday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 2,
    name: 'Tuesday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 3,
    name: 'Wednesday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 4,
    name: 'Thursday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 5,
    name: 'Friday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 6,
    name: 'Saturday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
  {
    id: 7,
    name: 'Sunday',
    from: new Date(0, 0, 0, 9, 30),
    to: new Date(0, 0, 0, 18, 30),
    available: true,
  },
];

export const GENDERS = [
  { id: 1, name: 'Female' },
  { id: 2, name: 'Male' },
  { id: 3, name: 'Other' },
];
