import { z } from 'zod';

export const resetPasswordValidationSchema = z.object({
    email: z.string().trim().min(1, 'O email é obrigatório!').email('O email é inválido!')
});

export type IResetPasswordValidationSchema = z.infer<typeof resetPasswordValidationSchema>;