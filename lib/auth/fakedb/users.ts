import { UserPayload } from "@/types/auth/auth.type";

// Example hardcoded users (replace with DB lookup later)
export const users: {
  email: string;
  password: string;
  user: UserPayload;
}[] = [
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

export function findUser(email: string, password: string) {
  return (
    users.find((u) => u.email === email && u.password === password)
      ?.user || null
  );
}
