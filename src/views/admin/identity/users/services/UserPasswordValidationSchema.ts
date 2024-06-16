import { z } from 'zod';

export const userPasswordValidationSchema = z.object({
    email: z.string().trim().min(1, 'O email é obrigatório!').email('O email é inválido!'),
    password: z.string().trim()
      .min(1,'A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!'),
    confirmPassword: z.string().trim()
      .min(1, 'A nova palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!')
}).refine(data => data.password === data.confirmPassword, {
  message: "As palavras-passe não são iguais!",
  path: ["confirmPassword"]
});

export type IUserPasswordValidationSchema = z.infer<typeof userPasswordValidationSchema>;