import { IRegional } from './regionalInterface';
import { IProduct } from './productInterface';
export interface ICompanyData {
  id: number;
  name: string;
  id_number: number;
  id_type: string;
  activity: string;
  taxpayer_type: string;
  address: string;
  phone: string;
  payment_account_1: string;
  payment_account_2: string;
  disbursement_account: string;
  legal_representative: string;
  charge_legal_representative: string;
  has_regional: boolean;
  status: string;
  emails1: string[];
  emails2: string[];
  regionals: IRegional[];
  products: IProduct[];
}
