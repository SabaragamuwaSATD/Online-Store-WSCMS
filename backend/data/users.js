import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Tharindu Dasun',
        email: 'tharindu@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Chathuni nupe',
        email: 'chathuni@emailnpm .com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;