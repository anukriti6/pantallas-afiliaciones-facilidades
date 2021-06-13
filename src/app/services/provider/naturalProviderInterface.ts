import {IAccount} from './accountInterface';
import {ISpouse} from './spouseInterface';

export interface INaturalProvider {
  id: number;
  name: string;
  type: string;
  idNumber: number;
  activity: string;
  nationality: string;
  address: string;
  phone: string;
  mobilePhone: string;
  emails: string[];
  paymentAccounts: IAccount[];
  currentPaymentAccount: IAccount;
  civilStatus: string;
  spouse: ISpouse;
  idAnchoredCompany: number | null;
}
