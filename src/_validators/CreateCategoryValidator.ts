import { z } from "zod";


export const CreateCategoryValidator = z.object({
    name: z.string().trim().min(1, "O campo de categoria é obrigatório."),
});

export type CreateCategoryData = z.infer<typeof CreateCategoryValidator>