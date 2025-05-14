import { z } from "zod";

export const SignUpValidatorSchema = z.object({
    email: z.string().min(1, 'Campo e-mail é obrigatório.').email('Digite um e-mail válido.'),
    name: z.string().trim().min(1, "O campo nome é obrigatório"),
    password: z.string().trim().min(6, "O campo senha deve ter no mínimo 6 caracteres incluindo letras e números").refine(value => {
        
        if(!/[A-Z]/.test(value)) return false;
        if(!/[a-z]/.test(value)) return false;
        if(!/[0-9]/.test(value)) return false;
        if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return false;

        return true;

    }, {message: "A senha deve ser formada por: pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial."})
});

export type SignUpFormData = z.infer<typeof SignUpValidatorSchema>