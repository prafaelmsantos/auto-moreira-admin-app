import { z } from "zod"

export const signInValidationSchema = z.object({
    email: z.string().trim().min(1, 'O email é obrigatório!').email('O email é inválido!'),
    password: z.string().trim()
      .min(1,'A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!') 
});

export type ISignInValidationSchema = z.infer<typeof signInValidationSchema>;