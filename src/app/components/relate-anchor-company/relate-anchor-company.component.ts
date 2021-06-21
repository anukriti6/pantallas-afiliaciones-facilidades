import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAnchorCompany} from 'src/app/services/provider/anchorCompanyInterface';
import {IAccount} from '../../services/provider/accountInterface';

@Component({
  selector: 'app-relate-anchor-company',
  templateUrl: './relate-anchor-company.component.html',

})
export class RelateAnchorCompanyComponent implements OnInit {
  @Input() anchorCompanies: IAnchorCompany[] = [];
  @Input() anchorId: number | null = null;
  @Input() paymentAccounts: IAccount[] | null = [];
  @Output() idAnchorSend = new EventEmitter<number>();
  curAnchorCompany: IAnchorCompany | null = null;
  selectedAnchorCompany: IAnchorCompany | null = null;
  searchType: string | null = null;
  idSearch: number | null = null;
  companySearch: string | null = null;
  filteredCompanyNames: string[] = [];
  companyNames: string[] = [];
  interest: number | null = null;
  matched = false;
  edit = false;
  status: string | null = null;
  statuses: string[] = ['Activo', 'Inactivo', 'Bloqueado'];
  displayedColumns: string[] = ['id', 'name', 'regional-name', 'rate', 'payment-account', 'email', 'status', 'actions'];
  paymentAccount: IAccount | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.searchType = 'id';
    console.log(this.anchorCompanies);
    for (let i = 0; i < this.anchorCompanies.length; i++) {
      this.companyNames.push(this.anchorCompanies[i].name);
      if (this.anchorId != null) {
        if (this.anchorCompanies[i].id === this.anchorId) {
          this.matched = true;
          this.curAnchorCompany = this.anchorCompanies[i];
          this.status = this.curAnchorCompany.status;
        }
      }
    }
    this.filteredCompanyNames = this.companyNames;
  }

  search(): void {
    for (let i = 0; i < this.anchorCompanies.length; i++) {
      if ((this.searchType === 'id' && this.anchorCompanies[i].idNumber === this.idSearch) || (this.searchType === 'company' && this.anchorCompanies[i].name === this.companySearch)) {
        this.matched = true;
        this.curAnchorCompany = this.anchorCompanies[i];
        this.status = this.curAnchorCompany.status;
      }
    }
    if (!this.matched) {
      this.curAnchorCompany = null;
      this.status = null;
    }
  }

  changedCompanySearch(): void {
    this.filteredCompanyNames = this.companyNames;
    if (this.companySearch != null && this.companySearch !== '') {
      for (let i = 0; i < this.filteredCompanyNames.length; i++) {
        if (!this.filteredCompanyNames[i].includes(this.companySearch)) {
          this.filteredCompanyNames.splice(i, 1);
        }
      }
    } else {
      this.filteredCompanyNames = this.companyNames;
    }
  }

  saveAnchor(): void {
    if (this.status != null && this.curAnchorCompany != null) {
      this.curAnchorCompany.status = this.status;
      this.idAnchorSend.emit(this.curAnchorCompany.id);
      this.curAnchorCompany.anchored = true;
    }
  }

  cancel(): void {
    this.curAnchorCompany = null;
    this.status = null;
  }
}
