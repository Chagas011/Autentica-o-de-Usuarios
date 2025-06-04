import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  lastName: z.string().min(1, "Digite seu sobrenome"),
  email: z.string().email("E-mail invalido").min(1, "Digite um e-mail valido"),
  password: z.string().min(8, "Sua senha deve ter no minimo 8 Caracteres"),
});
export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
