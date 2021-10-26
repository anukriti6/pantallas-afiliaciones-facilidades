export interface ICompanyInvoice {
  id: number;
  ruc: string;
  company: string;
  provider_id: string;
  client_provider: string;
  start_date: string;
  solca: number;
  credit_cuota: number;
  interest_value: number;
  default_interest: number;
  invoice_number: string;
  invoice_amount: number;
  payment_date: string;
  credit_operation_number: string;
  credit_expiration_date: string;
  default_days: number;
  status: string;

}
