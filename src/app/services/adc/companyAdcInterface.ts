import { ICreditLineAdc } from './creditLineInterface';
import { IFacilityAdc } from './facilityAdcInterface';
export interface ICompanyAdc {
  id: number;
  name: string;
  id_number: number;
  status: string;
  credit_lines: ICreditLineAdc[];
  facilities: IFacilityAdc[];
}
