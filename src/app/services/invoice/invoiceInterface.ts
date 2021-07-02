export interface IInvoice {
  id: number;
  type: string;
  regional: string;
  start_date: Date;
  authorization: string;
  value: string;
  company: string;
  provider: string;
  payment_date: Date;
  number: string;
  observations: string;
  request: string;
  identification: string;
  identification_type: string;
  status: string;

}
