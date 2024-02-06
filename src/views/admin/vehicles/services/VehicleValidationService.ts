import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  useForm,
  FieldErrors,
  Control
} from 'react-hook-form';
import * as Yup from 'yup';

import { IVehicle } from '../models/Vehicle';
import { IModel } from '../../models/models/Model';
import { Fuel } from '../models/enums/FuelEnum';
import { Transmission } from '../models/enums/TransmissionEnum';

export default function VehicleValidationService(
  vehicle: IVehicle
): [UseFormHandleSubmit<IVehicle>, FieldErrors<IVehicle>, Control<IVehicle>] {
  const VehicleValidationSchema: Yup.ObjectSchema<IVehicle> =
    Yup.object().shape({
      id: Yup.number().default(vehicle.id),
      modelId: Yup.number()
        .default(vehicle.modelId)
        .required('O modelo é obrigatorio!'),
      model: Yup.object<IModel | undefined>()
        .shape({
          name: Yup.string().default(''),
          id: Yup.number().default(0),
          markId: Yup.number().default(0)
        })
        .default(undefined),
      year: Yup.number().default(vehicle.year),
      color: Yup.string()
        .default(vehicle.color)
        .required('A cor é obrigatória!'),
      observations: Yup.string().default(vehicle.observations),
      mileage: Yup.number().default(vehicle.mileage),
      price: Yup.number().default(vehicle.price),
      fuelType: Yup.mixed<Fuel>()
        .oneOf(Object.values(Fuel))
        .required('A tipo de combustível é obrigatório!')
        .default(vehicle.fuelType),
      version: Yup.string()
        .default(vehicle.version)
        .required('A versão é obrigatória!'),
      doors: Yup.number().default(vehicle.doors),
      transmission: Yup.mixed<Transmission>()
        .oneOf(Object.values(Transmission))
        .required('A trasmissão é obrigatória!')
        .default(vehicle.transmission),
      engineSize: Yup.number().default(vehicle.engineSize),
      power: Yup.number().default(vehicle.power),
      opportunity: Yup.boolean().default(vehicle.opportunity),
      sold: Yup.boolean().default(vehicle.opportunity)
    });

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IVehicle>({
    resolver: yupResolver(VehicleValidationSchema)
  });

  return [handleSubmit, errors, control];
}
