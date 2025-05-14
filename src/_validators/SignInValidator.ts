import { z } from "zod";

export const SignInValidatorSchema = z.object({
    email: z.string().min(1, 'Campo e-mail é obrigatório.').email('Digite um e-mail válido.'),
    password: z.string().trim().min(1, "O campo senha é obrigatório.")
});

export type SignInFormData = z.infer<typeof SignInValidatorSchema>