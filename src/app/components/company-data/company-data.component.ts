import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {ICompanyData} from 'src/app/services/company/companyDataInterface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {IProduct} from '../../services/company/productInterface';
import {IRegional} from '../../services/company/regionalInterface';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html'
})
export class CompanyDataComponent implements OnInit {
  @Input() company: ICompanyData | null = null;
  naturalCivilStatus: string | null = null;
  emails: string[] = [];
  civilStatus: string | null = null;
  naturalSpouseId: number | null = null;
  naturalSpouseName: string | null = null;
  errorEmail: string | null = null;
  errorEmails: string | null = null;
  errorEmail1: string | null = null;
  errorEmails1: string | null = null;
  email: string | null = null;
  email1: string | null = null;
  companyPhone: string | null = null;
  idLegalRepresentative: number | null = null;

  status: string | null = null;
  editRegional = false;
  editProduct = false;
  selectedProduct: IProduct =
    {
      id: 0,
      name: '',
      description: '',
      currency: '',
      capital_term: 0,
      status: 'ACTIVO',
      confirmation_deadline: 0,
      interest: 0,
      term_type: '',
      code: '',
      expiration_criteria: '',
      payment_period: '',
      business_GAF_code: '',
      product_GAF_code: '',
      effective_term: 0,
      operation_term: 0,
      debits_by_regional: true,
      commission_charge: false,
      insurance_charge: true,
      with_recourse: false,
      needs_credit: true
    };
  selectedRegional: IRegional = {
    id: 0,
    name: '',
    product: '',
    identification: '',
    address: '',
    phone: '',
    status: 'Activo'
  };
  displayedProductColumns: string[] = ['id', 'product', 'description', 'currency', 'status', 'actions'];
  displayedRegionalColumns: string[] = ['id', 'product', 'regional', 'status', 'actions'];
  statuses: string[] = ['Activo', 'Inactivo', 'Bloqueado'];
  products: IProduct[] = [];
  regionals: IRegional[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Output() Clean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.company) {
      if (this.company?.products.length > 0) {
        this.products = this.company?.products;
      }
      if (this.company?.regionals.length > 0) {
        this.regionals = this.company?.regionals;
      }
    }

  }

  saveRegional(): void {
    this.editRegional = false;
    this.selectedRegional = {
      id: 0,
      name: '',
      product: '',
      identification: '',
      address: '',
      phone: '',
      status: 'Activo'
    };
  }

  cleanRegional(): void {
    this.selectedRegional = {
      id: 0,
      name: '',
      product: '',
      identification: '',
      address: '',
      phone: '',
      status: 'Activo'
    };
  }

  editThisRegional(regional: IRegional): void {
    this.selectedRegional = regional;
    this.editRegional = true;
  }

  cancelRegional(): void {
    this.editRegional = false;
    this.selectedRegional = {
      id: 0,
      name: '',
      product: '',
      identification: '',
      address: '',
      phone: '',
      status: 'Activo'
    };
  }

  saveProduct(): void {
    this.editProduct = false;
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      currency: '',
      capital_term: 0,
      status: 'ACTIVO',
      confirmation_deadline: 0,
      interest: 0,
      term_type: '',
      code: '',
      expiration_criteria: '',
      payment_period: '',
      business_GAF_code: '',
      product_GAF_code: '',
      effective_term: 0,
      operation_term: 0,
      debits_by_regional: true,
      commission_charge: false,
      insurance_charge: true,
      with_recourse: false,
      needs_credit: true
    };
  }

  cleanProduct(): void {
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      currency: '',
      capital_term: 0,
      status: 'ACTIVO',
      confirmation_deadline: 0,
      interest: 0,
      term_type: '',
      code: '',
      expiration_criteria: '',
      payment_period: '',
      business_GAF_code: '',
      product_GAF_code: '',
      effective_term: 0,
      operation_term: 0,
      debits_by_regional: true,
      commission_charge: false,
      insurance_charge: true,
      with_recourse: false,
      needs_credit: true
    };
  }

  editThisProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.editProduct = true;
  }

  cancelProduct(): void {
    this.editProduct = false;
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      currency: '',
      capital_term: 0,
      status: 'ACTIVO',
      confirmation_deadline: 0,
      interest: 0,
      term_type: '',
      code: '',
      expiration_criteria: '',
      payment_period: '',
      business_GAF_code: '',
      product_GAF_code: '',
      effective_term: 0,
      operation_term: 0,
      debits_by_regional: true,
      commission_charge: false,
      insurance_charge: true,
      with_recourse: false,
      needs_credit: true
    };
  }

  clean(): void {
    this.Clean.emit(true);
  }

  emailEntry(): void {
    const element = document.getElementById('emails');
    this.errorEmails = null;
    if (this.email != null) {
      if (this.validateEmail(this.email)) {
        this.errorEmail = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      } else {
        this.errorEmail = 'Formato de correo Electrónico incorrecto';
        if (element) {
          element.style.borderColor = '#FF0000';
        }
      }
    } else {
      this.errorEmail = null;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
    if (this.email === '') {
      this.errorEmail = null;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  emailEntry1(): void {
    const element = document.getElementById('emails2');
    this.errorEmails1 = null;
    if (this.email1 != null) {
      if (this.validateEmail(this.email1)) {
        this.errorEmail1 = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      } else {
        this.errorEmail1 = 'Formato de correo Electrónico incorrecto';
        if (element) {
          element.style.borderColor = '#FF0000';
        }
      }
    } else {
      this.errorEmail1 = null;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
    if (this.email1 === '') {
      this.errorEmail1 = null;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  validateEmail(email: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
  }

  addEmail(event: MatChipInputEvent): void {
    // @ts-ignore
    if (this.company.emails1.length < 10) {
      if (event.value != null) {
        let emailExists = false;
        // @ts-ignore
        for (let i = 0; i < this.company.emails1.length; i++) {
          // @ts-ignore
          if (this.company.emails1.length[i] === event.value) {
            emailExists = true;
            this.errorEmails = 'El correo ingresado ya está registrado';
          }
        }
        if (!emailExists) {
          if (this.email != null) {
            if (this.validateEmail(event.value)) {
              // @ts-ignore
              this.company.emails1.push(event.value);
              this.email = null;
              this.errorEmails = null;
              // @ts-ignore
              console.log('Emails: ', this.company.emails1);
            }
          }
        }
      }
    } else {
      this.errorEmails = 'No se pueden registrar más correos';
    }
  }

  addEmail1(event: MatChipInputEvent): void {
    // @ts-ignore
    if (this.company.emails2.length < 10) {
      if (event.value != null) {
        let emailExists = false;
        // @ts-ignore
        for (let i = 0; i < this.company.emails2.length; i++) {
          // @ts-ignore
          if (this.company.emails2[i] === event.value) {
            emailExists = true;
            this.errorEmails1 = 'El correo ingresado ya está registrado';
          }
        }
        if (!emailExists) {
          if (this.email1 != null) {
            if (this.validateEmail(event.value)) {
              // @ts-ignore
              this.company.emails2.push(event.value);
              this.email1 = null;
              this.errorEmails1 = null;
              // @ts-ignore
              console.log('Emails: ', this.company.emails2);
            }
          }
        }
      }
    } else {
      this.errorEmails1 = 'No se pueden registrar más correos';
    }
  }
}
