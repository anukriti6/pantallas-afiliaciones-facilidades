import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {IAccount} from 'src/app/services/provider/accountInterface';
import {ILegalProvider} from 'src/app/services/provider/legalProviderInterface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {INaturalProvider} from 'src/app/services/provider/naturalProviderInterface';
import { IAnchorCompany } from 'src/app/services/provider/anchorCompanyInterface';

@Component({
  selector: 'app-provider-data',
  templateUrl: './provider-data.component.html',
  styleUrls: ['./provider-data.component.scss']
})
export class ProviderDataComponent implements OnInit {
  @Input() naturalProviderData: INaturalProvider | null = null;
  @Input() legalProviderData: ILegalProvider | null = null;
  @Input() anchorCompanies: IAnchorCompany[] = [];
  naturalCivilStatus: string | null = null;
  emails: string[] = [];
  paymentAccount: IAccount | null = null;
  civilStatus: string | null = null;
  naturalSpouseId: number | null = null;
  naturalSpouseName: string | null = null;
  errorEmail: string | null = null;
  errorEmails: string | null = null;
  email: string | null = null;
  companyPhone: string | null = null;
  idLegalRepresentative: number | null = null;
  legalRepresentativeName: string | null = null;
  legalRepresentativePosition: string | null = null;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Output() Clean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.naturalProviderData !=  null  && this.legalProviderData == null){
      if (this.naturalProviderData.emails.length) {
        for (let i = 0; i < this.naturalProviderData.emails.length; i++) {
          this.emails.push(this.naturalProviderData.emails[i]);
        }
      }
      this.civilStatus = this.naturalProviderData.civilStatus;
      this.paymentAccount = this.naturalProviderData.currentPaymentAccount;
      this.naturalSpouseId = this.naturalProviderData.spouse.idNumber;
      this.naturalSpouseName = this.naturalProviderData.spouse.name;
    } else if ( this.naturalProviderData ==  null  && this.legalProviderData != null ) {
      if (this.legalProviderData.emails.length) {
        for (let i = 0; i < this.legalProviderData.emails.length; i++) {
          this.emails.push(this.legalProviderData.emails[i]);
        }
      }
      this.civilStatus = this.legalProviderData.legalRepresentative.civilStatus;
      this.idLegalRepresentative = this.legalProviderData.legalRepresentative.id;
      this.legalRepresentativeName = this.legalProviderData.legalRepresentative.name;
      this.legalRepresentativePosition = this.legalProviderData.legalRepresentative.position;
      this.paymentAccount = this.legalProviderData.currentPaymentAccount;
      this.companyPhone = this.legalProviderData.phone;
    }
  }

  clean(): void {
    this.Clean.emit(true);
  }

  changedPaymentAccount(): void {
    console.log(this.paymentAccount);
  }

  emailEntry(): void {
    const element = this.naturalProviderData != null ? document.getElementById('naturalEmails') : document.getElementById('legalEmails');
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
    if (this.email == '') {
      this.errorEmail = null;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  validateEmail(email: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (regexp.test(email)) {
        return true;
      }
      return false;
  }
  anchorId(event: number) {
    if (this.naturalProviderData != null && this.legalProviderData == null) {
      this.naturalProviderData.idAnchoredCompany = event;
    } else if (this.naturalProviderData == null && this.legalProviderData != null) {
      this.legalProviderData.idAnchoredCompany = event;
    }
  }
  addEmail(event: MatChipInputEvent): void {
    if (this.emails.length < 10) {
      if (event.value != null) {
        let emailExists = false;
        for (let i = 0; i < this.emails.length; i++) {
          if (this.emails[i] === event.value) {
            emailExists = true;
            this.errorEmails = 'El correo ingresado ya está registrado en este proveedor';
          }
        }
        if (!emailExists) {
          if (this.email != null) {
            if (this.validateEmail(event.value)) {
              this.emails.push(event.value);
              this.email = null;
              this.errorEmails = null;
              console.log('Emails: ', this.emails);
            }
          }
        }
      }
    } else {
      this.errorEmails = 'No se pueden registrar más correos para este proveedor';
    }
  }
}
