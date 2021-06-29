export interface IProduct {
  id: number;
  name: string;
  description: string;
  currency: string;
  capital_term: number;
  status: string;
  confirmation_deadline: number;
  interest: number;
  term_type: string;
  code: string;
  expiration_criteria: string;
  payment_period: string;
  business_GAF_code: string;
  product_GAF_code: string;
  effective_term: number;
  operation_term: number;
  debits_by_regional: boolean;
  commission_charge: boolean;
  insurance_charge: boolean;
  with_recourse: boolean;
  needs_credit: boolean;
}
