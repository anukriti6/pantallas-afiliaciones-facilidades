import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
})
export class InvoiceTypeComponent implements OnInit {
  doClean = false;

  @Input() set clean(clean: boolean) {

    this.doClean = clean;
    this.cleanFields(this.doClean);
  }

  get clean(): boolean {
    return this.doClean;
  }
  @Output() type = new EventEmitter<string|null>();
  types: string[] = ['individual', 'massive'];
  selected: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  select(event: any): void {
    console.log(event);
    console.log(this.selected);
    if (this.selected) {
      this.type.emit(this.selected);
    }
  }

  cleanFields(clean: boolean): void {
    if (clean) {
      this.selected = null;
      this.type.emit(this.selected);
    }
  }
}
