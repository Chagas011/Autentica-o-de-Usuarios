import { z } from "zod";

export const schema = z.object({
  email: z.string().email("E-mail invalido").min(1, "Digite um e-mail valido"),
  password: z.string().min(8, "Sua senha deve ter no minimo 8 Caracteres"),
});
export interface UserLogin {
  email: string;
  password: string;
}
