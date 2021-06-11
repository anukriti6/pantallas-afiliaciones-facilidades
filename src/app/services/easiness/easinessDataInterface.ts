import { IEasinessObject } from './easinessObjectInterface';
export interface IEasinessData {
  id: number;
  idNumber: number;
  companyName: string;
  related: boolean;
  easiness: IEasinessObject[];
}
