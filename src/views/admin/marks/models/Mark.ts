import { marks_marks_nodes } from '../../../../queries/types/marks';

export interface IMark {
  id: number;
  name: string;
}

export function convertToMark(mark: marks_marks_nodes): IMark {
  return {
    id: mark.id,
    name: String(mark.name)
  };
}
