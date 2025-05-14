import { z } from "zod";

export const CreateProductServerValidator = z.object({
    banner: z.any().optional(), // ou z.unknown()
    category_id: z.string().trim().min(1, {message: "Escolha uma categoria válida."}),
    name: z.string().trim().min(1, "O nome do produto é obrigatório"),
    price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "O preço deve ser um número válido maior que zero.",
    }).refine(value =>{

      value = value.trim();

        // Detecta e converte formatos válidos
        const commaCount = (value.match(/,/g) || []).length;
        const dotCount = (value.match(/\./g) || []).length;

        // Caso com "." e "," — assume padrão brasileiro
        if (dotCount > 0 && commaCount === 1) { 
            value = value.replace(/\./g, "").replace(",", ".");
        }
        // Caso com "," e sem "." — assume padrão brasileiro simples
        else if (commaCount === 1 && dotCount === 0) {
            value = value.replace(",", ".");
        }
        // Caso com "." e sem "," — assume padrão americano
        else if (dotCount === 1 && commaCount === 0) {
            // ok, nada a fazer
        }
        // Se tiver múltiplos separadores, consideramos inválido
        else {
            return false;
        }

        return value;
    },{message: "As casas decimais devem estar separados por ponto(.)."}),
    description: z
    .string()
    .trim()
    .min(1, { message: "A descrição do produto é obrigatória." }),
});

export type CreateProductServerData = z.infer<typeof CreateProductServerValidator>;