import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'workflow';
  /*Dummy Data for view testing. Replace with real data from DB in backend development*/
  /*Dummy Data for view "relacionar facilidades"*/

  /*Dummy Data for providers*/
  providers: any[] = [{
    id: 1,
    name: 'Terrafertil',
    type: 'legal',
    idNumber: 1799999999999,
    activity: 'Productos alimenticios',
    address: 'Av. de Prueba y prueba SN',
    phone: '022987654',
    emails: ['test1@domain.com', 'test2@domain.com'],
    paymentAccounts: [
      {type:'Corriente', account: 2100008535 },
      {type:'Corriente', account: 2100012336 },
      {type:'Ahorros', account: 2100012336 }
    ],
    currentPaymentAccount: {type:'Corriente', account: 2100008535 },
    legalRepresentative: {
      id: 1799999999999,
      name: 'Ana María Carvajal Carvajal',
      position: 'Gerente General',
      civilStatus: 'Soltero'
    }
  }, {
    id: 2,
    name: 'Juan José Pérez Pérez',
    type: 'natural',
    idNumber: 1712345678,
    activity: 'Producción industrial',
    nationality: 'Ecuatoriana',
    address: 'Av. de Prueba y prueba SN',
    phone: '022987654',
    mobilePhone: '0987654312',
    emails: ['user1@domain.com', 'user2@domain.com'],
    paymentAccounts: [
      {type:'Corriente', account: 2100103235 },
      {type:'Corriente', account: 2100012336 },
      {type:'Ahorros', account: 2100011336 }
    ],
    currentPaymentAccount: {type:'Ahorros', account: 2100011336 },
    civilStatus: 'Casado',
    spouse: {
      idNumber: 1712534678,
      name: 'Ana María Cárdenas Montero'
    }
  }];
  /*Dummy Data for anchor companies*/
  anchorCompanies: any[] = [{
    id: 1,
    idNumber: 1709876543212,
    name: 'Empresa X',
    regionalName: 'Nombre de regional',
    interest: 10.22,
    resource: false,
    status: 'Activo',
    anchored: true
  }];
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 770px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  clickedLink() {}
}
