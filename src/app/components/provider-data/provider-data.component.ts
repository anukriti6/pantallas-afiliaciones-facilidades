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
  emailListener: any = null;
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
    this.emailListener = this.naturalProviderData.type == 'natural' ? document.getElementById('naturalEmails') : document.getElementById('legalEmails');
    if(this.emailListener) {
      this.emailListener.addEventListener("keydown", this.keyPressed(event, 'natural'));
    }
  }
  clean() {
    this.Clean.emit(true);
  }
  changedPaymentAccount() {
    console.log(this.naturalPaymentAccount);
  }
  /*
  document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        alert('Enter is pressed!');
    }
  });
  */
  emailEntry(type: string) {
    if (type == 'natural') {
      if (this.naturalEmail != null) {
        if (this.validateEmail(this.naturalEmail)) {
          this.errorEmail = null;
        } else {
          this.errorEmail = "Formato de correo Electrónico incorrecto";
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
          this.naturalEmails.push(this.naturalEmail);
        }
      }
    }
  }
}
