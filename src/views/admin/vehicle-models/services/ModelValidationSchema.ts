import { z } from 'zod';

export const modelValidationSchema = z.object({
    name: z.string().trim().min(1, 'O nome é obrigatório!'),
    markId: z.coerce.number().int('A marca é inválida!').positive('A marca é obrigatória!'),
    id: z.coerce.number().default(0)
});

export type IModelValidationSchema = z.infer<typeof modelValidationSchema>;