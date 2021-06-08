import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ILegalProvider } from 'src/app/services/provider/legalProviderInterface';
import { INaturalProvider } from 'src/app/services/provider/naturalProviderInterface';

@Component({
  selector: 'app-provider-data',
  templateUrl: './provider-data.component.html',
  styleUrls: ['./provider-data.component.scss']
})
export class ProviderDataComponent implements OnInit {
  @Input() providerData: ILegalProvider | INaturalProvider = {
    id: 0,
    name: '',
    type: '',
    idNumber: 1111111111,
    activity: '',
    nationality: '',
    address: '',
    phone: '',
    mobilePhone: '',
    emails: [''],
    paymentAccounts: [{type: '', account: 123123123}],
    currentPaymentAccount: {type: '', account: 123123123},
    civilStatus: '',
    spouse: {idNumber: 1122334321, name: ''}
  };
  @Output() Clean = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {
  }
  clean() {
    this.Clean.emit(true);
  }

}
