import { ILegalRepresentative } from './legalRepresentativeInterface';
import { IAccount } from './accountInterface';
export interface ILegalProvider {
  id: number;
  name: string;
  type: string;
  idNumber: number;
  activity: string;
  address: string;
  phone: string;
  emails: string[];
  paymentAccounts: IAccount[];
  currentPaymentAccount: IAccount;
  legalRepresentative: ILegalRepresentative;
  idAnchoredCompany: number | null;
}
