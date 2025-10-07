"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.findUser = findUser;
// Example hardcoded users (replace with DB lookup later)
exports.users = [
    {
        email: "admin@test.com",
        password: "1234",
        user: {
            id: "1",
            email: "admin@test.com",
            role: "admin",
            name: "Alice Admin",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        email: "user@test.com",
        password: "1234",
        user: {
            id: "2",
            email: "user@test.com",
            role: "user",
            name: "Bob User",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
    },
    {
        email: "manager@test.com",
        password: "1234",
        user: {
            id: "3",
            email: "manager@test.com",
            role: "manager",
            name: "Charlie Manager",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
    },
];
function findUser(email, password) {
    return (exports.users.find((u) => u.email === email && u.password === password)
        ?.user || null);
}
