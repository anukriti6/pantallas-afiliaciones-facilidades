import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {ICompanyAdc} from 'src/app/services/adc/companyAdcInterface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ICreditLineAdc} from '../../services/adc/creditLineInterface';
import {IFacilityAdc} from '../../services/adc/facilityAdcInterface';

@Component({
  selector: 'app-company-adc',
  templateUrl: './company-adc.component.html'
})
export class CompanyAdcComponent implements OnInit {
  @Input() company: ICompanyAdc | null = null;

  displayedCreditLinesColumns: string[] = ['id', 'approved_quota', 'available_quota', 'approval_date', 'expiration_date'];
  firstHeadersRow: string[] = ['facilities'];
  secondHeadersRow: string[] = ['name', 'long-term', 'short-term'];
  thirdHeadersRow: string[] = ['approved_long_term', 'available_long_term', 'approved_short_term',
    'available_short_term', 'blocked_short_term', 'used_short_term'];
  displayedFacilitiesColumns: string[] = ['name', 'approved_long_term', 'available_long_term', 'approved_short_term',
    'available_short_term', 'blocked_short_term', 'used_short_term'];
  statuses: string[] = ['Activo', 'Inactivo', 'Bloqueado'];
  creditLines: ICreditLineAdc[] = [];
  facilities: IFacilityAdc[] = [];
  @Output() Clean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.company) {
      if (this.company?.credit_lines.length > 0) {
        this.creditLines = this.company?.credit_lines;
      }
      if (this.company?.facilities.length > 0) {
        this.facilities = this.company?.facilities;
      }
    }

  }

  clean(): void {
    this.Clean.emit(true);
  }

}
