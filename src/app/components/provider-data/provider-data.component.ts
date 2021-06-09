import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAccount } from 'src/app/services/provider/accountInterface';
import { ILegalProvider } from 'src/app/services/provider/legalProviderInterface';
import { INaturalProvider } from 'src/app/services/provider/naturalProviderInterface';
@Component({
  selector: 'app-provider-data',
  templateUrl: './provider-data.component.html',
  styleUrls: ['./provider-data.component.scss', '../../app.component.scss']
})
export class ProviderDataComponent implements OnInit {
  @Input() naturalProviderData: INaturalProvider = {
    id: 0,
    name: '',
    type: '',
    idNumber: 1111111111,
    activity: '',
    nationality: '',
    address: '',
    phone: '',
    mobilePhone: '',
    emails: [],
    paymentAccounts: [{type: '', account: 123123123}],
    currentPaymentAccount: {type: '', account: 123123123},
    civilStatus: '',
    spouse: {idNumber: 1122334321, name: ''}
  };
  naturalCivilStatus: string  | null = null;
  naturalEmail: string | null = null;
  naturalEmails: string[] = [];
  naturalPaymentAccount: IAccount | null = null;
  naturalSpouseId: number  | null = null;
  naturalSpouseName: string  | null = null;
  errorEmail: string | null = null;
  errorEmails: string | null = null;
  @Output() Clean = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {
    if (this.naturalProviderData.civilStatus != '') {
      this.naturalCivilStatus = this.naturalProviderData.civilStatus;
    }
    if (this.naturalProviderData.emails.length) {
      for (let i = 0; i < this.naturalProviderData.emails.length; i ++) {
        this.naturalEmails.push(this.naturalProviderData.emails[i]);
      }
    }
    this.naturalPaymentAccount = this.naturalProviderData.currentPaymentAccount;
    this.naturalSpouseId = this.naturalProviderData.spouse.idNumber;
    this.naturalSpouseName = this.naturalProviderData.spouse.name;
  }
  clean() {
    this.Clean.emit(true);
  }
  changedPaymentAccount() {
    console.log(this.naturalPaymentAccount);
  }
  emailEntry(type: string) {
    let element = this.naturalProviderData.type == 'natural' ? document.getElementById('naturalEmails') : document.getElementById('legalEmails');
    this.errorEmails = null;
    if (type == 'natural') {
      if (this.naturalEmail != null) {
        if (this.validateEmail(this.naturalEmail)) {
          this.errorEmail = null;
          if (element) {
            element.style.borderColor = '#c1c1c1';
          }
        } else {
          this.errorEmail = "Formato de correo Electrónico incorrecto";
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
      if (this.naturalEmail == '') {
        this.errorEmail = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      }
    }
  }
  keyPressed(event: any, type: string ) {
    console.log("Evento: ",event);
    if (type == 'natural') {
      if (event.code === 13) {
        console.log("Tecla Enter Presionada")
        if (this.naturalEmail != null) {
          if (this.validateEmail(this.naturalEmail)) {
            this.naturalEmails.push(this.naturalEmail);
          }
        }
      }
    }
  }
  validateEmail(email: string) {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(email)) {
      return true;
    }
    return false;
  }
  addEmail(type: string ){
    if (type == 'natural') {
      if (this.naturalEmails.length < 10) {
        if (this.naturalEmail != null) {
          let emailExists = false;
          for (let i = 0; i < this.naturalEmails.length; i ++) {
            if (this.naturalEmails[i] == this.naturalEmail) {
              emailExists = true;
              this.errorEmails = 'El correo ingresado ya está registrado en este proveedor';
            }
          }
          if (!emailExists) {
            this.naturalEmails.push(this.naturalEmail);
            this.naturalEmail = null;
            this.errorEmails = null;
          }
        }
      } else {
        this.errorEmails = 'No se pueden registrar más correos para este proveedor';
      }
    }
  }
}
