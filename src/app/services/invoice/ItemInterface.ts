export interface IItem {
  id: number;
  type: string;
  regional: string;
  company: string;
  identification: string;
  identification_provider: string;
  balance: number;
  client_provider: string;
  operation_number: string;
  invoice_number: string;
  invoice_value: number;
  payment: number;
  default_days: number;
  observations: string;
  start_date: string;
  concession_date: string;
  effective_date: string;
  payment_date: string;
  expiration_date: string;
  interest: number;
  status: string;
  identification_type: string;

}
