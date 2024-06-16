import { z } from 'zod';
import { roleValidationSchema } from '../../roles/services/RoleValidationSchema';

export const userValidationSchema = z.object({
    firstName: z.string().trim().min(1, 'O primeiro nome é obrigatório!'),
    lastName: z.string().trim().min(1, 'O ultimo nome é obrigatório!'),
    email: z.string().trim().min(1, 'O email é obrigatório!').email('O email é inválido!'),
    phoneNumber: z.string().trim().min(1, 'O contacto é obrigatório!'),
    darkMode: z.boolean().default(false),
    roles: z.array(roleValidationSchema).min(1, 'O cargo é obrigatório!').default([]),
    image: z.string().nullable().default(null),
    password: z.string().nullable().default(null),
    token: z.string().nullable().default(null),
    id: z.coerce.number().default(0)
});

export type IUserValidationSchema = z.infer<typeof userValidationSchema>;