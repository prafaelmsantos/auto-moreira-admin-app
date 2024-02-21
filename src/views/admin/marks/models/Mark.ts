import { marks_marks_nodes } from "./graphQL/types/marks";


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

export enum MarkKeys {
    id = "id",
    name= "name"
}
