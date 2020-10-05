import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'Villrad',
    email: 'villrad@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Sasho Roman',
    email: 'sashko@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
];

export default users;
