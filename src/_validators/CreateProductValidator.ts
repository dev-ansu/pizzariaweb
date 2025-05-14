import { z } from "zod";

export const CreateProductValidator = z.object({
  banner: z
    .instanceof(FileList, {message:"O arquivo é obrigatório."})
    .refine((file) => file.length > 0, {
      message: "O arquivo é obrigatório.",
    })
    .refine((file) => file[0]?.size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB.",
    })
    .refine((file) =>
      ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file[0]?.type),
      {
        message: "Apenas arquivos PNG, JPEG, JPG e WEBP são aceitos.",
      }
    ),
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

export type CreateProductData = z.infer<typeof CreateProductValidator>;