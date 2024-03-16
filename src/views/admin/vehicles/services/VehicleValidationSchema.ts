import * as Yup from 'yup';

import { IVehicle, IVehicleImage } from '../models/Vehicle';
import { IModel } from '../../vehicle-models/models/Model';
import { Fuel } from '../models/enums/FuelEnum';
import { Transmission } from '../models/enums/TransmissionEnum';

export const VehicleValidationSchema: Yup.ObjectSchema<IVehicle> =
  Yup.object().shape({
    id: Yup.number().default(0),
    modelId: Yup.number()
      .default(0)
      .test(
        'O modelo é obrigatorio!',
        'O modelo é obrigatorio!',
        (value) => value > 0
      )
      .required('O modelo é obrigatorio!'),
    model: Yup.object<IModel | undefined>()
      .shape({
        name: Yup.string().default(''),
        id: Yup.number().default(0),
        markId: Yup.number()
          .default(0)
          .test(
            'A marca é obrigatoria!',
            'A marca é obrigatoria!',
            (value) => value > 0
          )
          .required('A marca é obrigatoria!')
      })
      .default(undefined),
    year: Yup.number().default(0),
    color: Yup.string().default('').required('A cor é obrigatória!'),
    observations: Yup.string().default(''),
    mileage: Yup.number().default(0),
    price: Yup.number().default(0),
    fuelType: Yup.mixed<Fuel>()
      .oneOf(Object.values(Fuel) as number[])
      .required('A tipo de combustível é obrigatório!')
      .default(Fuel.DIESEL),
    version: Yup.string().default('').required('A versão é obrigatória!'),
    doors: Yup.number().default(0),
    transmission: Yup.mixed<Transmission>()
      .oneOf(Object.values(Transmission) as number[])
      .required('A trasmissão é obrigatória!')
      .default(Transmission.MANUAL),
    engineSize: Yup.number().default(0),
    power: Yup.number().default(0),
    opportunity: Yup.boolean().default(false),
    sold: Yup.boolean().default(false),
    vehicleImages: Yup.array()
      .of(
        Yup.object<IVehicleImage>().shape({
          id: Yup.number().default(0),
          url: Yup.string().default('').required('A cor é obrigatória!'),
        })
      )
      .default([])
  });

export type IVehicleValidationSchema = Yup.InferType<
  typeof VehicleValidationSchema
>;
