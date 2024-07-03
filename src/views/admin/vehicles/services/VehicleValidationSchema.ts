import { z } from 'zod';
import { Fuel } from '../models/enums/FuelEnum';
import { Transmission } from '../models/enums/TransmissionEnum';

export const vehicleImageValidationSchema = z.object({
  id:  z.coerce.number().default(0),
  url: z.string().trim().min(1, 'O endereço da imagem é obrigatório!'),
  isMain: z.boolean().default(false),
});

export const vehicleValidationSchema = z.object({
    modelId: z.coerce.number().int('o modelo é inválido!').positive('O modelo é obrigatório!'),
    model: z.object({
        name: z.string().default(''),
        id: z.coerce.number().default(0),
        markId: z.coerce.number().int('A marca é inválida!').positive('A marca é obrigatória!'),
      }),
    year: z.coerce.number().int('O ano é inválido!').positive('O ano é inválido!').min(1900,'O ano é inválido!'),
    color: z.string().nullable().default(null),
    observations: z.string().nullable().default(null),
    mileage: z.coerce.number().nonnegative('O nº de Kms é inválido!'),
    price: z.coerce.number().nonnegative('O preço é inválido!'),
    fuelType: z.nativeEnum(Fuel),
    version: z.string().nullable().default(null),
    doors: z.coerce.number().positive('O nº de portas é inválido!'),
    transmission: z.nativeEnum(Transmission),
    engineSize: z.coerce.number().positive('O tamanho do motor é inválido!'),
    power: z.coerce.number().positive('A potência é inválida!'),
    opportunity: z.boolean().default(false),
    sold: z.boolean().default(false),
    soldDate: z.string().nullable().default(null),
    vehicleImages: z.array(vehicleImageValidationSchema).default([]),
    id: z.coerce.number().default(0)
});

export type IVehicleValidationSchema = z.infer<typeof vehicleValidationSchema>;