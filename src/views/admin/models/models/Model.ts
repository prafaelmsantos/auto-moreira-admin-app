import { IMark } from '../../marks/models/Mark';
import { models_models_nodes } from '../queries/types/models';

export interface IModel {
  id: number;
  name: string;
  markId: number;
  mark?: IMark;
}

export function convertToModel(model: models_models_nodes): IModel {
  return {
    id: model.id,
    name: String(model.name),
    markId: model.markId,
    mark: { id: model.markId, name: model.mark?.name ?? '' }
  };
}
