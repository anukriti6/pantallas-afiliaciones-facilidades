export interface IProviderInvoice {
  id: number;
  ruc: string;
  company: string;
  provider_id: string;
  client_provider: string;
  advance_provider_cuota: number;
  advance_value: number;
  solca: number;
  invoice_number: string;
  invoice_amount: string;
  start_date: number;
  advance_date: number;
  payment_date: number;
  status: string;

}
