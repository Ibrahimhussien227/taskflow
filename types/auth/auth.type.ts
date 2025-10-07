import { InferType } from "yup";

import { loginSchema } from "@/components/auth/form/login.validation";

export type UserPayload = {
  id: string;
  email: string;
  role: "admin" | "user" | "manager";
  name: string;
  avatar: string;
};

export type LoginFormInputs = InferType<typeof loginSchema>;
