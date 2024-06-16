import { z } from 'zod';

export const roleValidationSchema = z.object({
    name: z.string().trim().min(1, 'O nome é obrigatório!'),
    isDefault: z.boolean().default(false),
    isReadOnly: z.boolean().default(false),
    id: z.coerce.number().default(0)
});

export type IRoleValidationSchema = z.infer<typeof roleValidationSchema>;