import { User } from '../models/user';

/** @ts-ignore */
export const UserMockFull: User = {
  _id: '123',
  firstName: 'Toto',
  lastName: 'Pizza',
  email: 'toto@yopmail.com',
  isAdmin: false,
  history: [{
    text: 'Test',
    /** @ts-ignore */
    date: '08/11/2022',
  }],
  permissions: {
    selection: true,
    preview: true,
    history: true,
    translation: true,
    capture: true,
    quickCapture: true,
  },
};

/** @ts-ignore */
export const UserMockWithoutHistory: User = {
  _id: '123',
  firstName: 'Toto',
  lastName: 'Pizza',
  email: 'toto@yopmail.com',
  isAdmin: false,
  history: [],
  permissions: {
    selection: true,
    preview: true,
    history: true,
    translation: true,
    capture: true,
    quickCapture: true,
  },
};
