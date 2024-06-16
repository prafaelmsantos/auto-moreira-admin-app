import { z } from 'zod';

export const markValidationSchema = z.object({
    name: z.string().trim().min(1, 'O nome é obrigatório!'),
    id: z.coerce.number().default(0)
});

export type IMarkValidationSchema = z.infer<typeof markValidationSchema>;