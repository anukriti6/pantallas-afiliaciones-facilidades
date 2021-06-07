import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-search-id',
  templateUrl: './search-id.component.html',
  styleUrls: ['./search-id.component.scss','../../app.component.scss']
})
export class SearchIdComponent implements OnInit {
  doClean: boolean = false;
  @Input() set clean(clean: boolean) {

    this.doClean = clean;
    this.cleanFields(this.doClean);

 }
 get clean(): boolean {

     return this.doClean;

 }
  @Input() searchError: string | null = null;
  @Output() idSend = new EventEmitter<number>();
  typeIds: string[] = ['RUC', 'Cédula de identidad'];
  typeId:string | null = null;
  id: number | null = null;
  errorId: string | null = null;
  constructor() { }

  ngOnInit(): void {
    this.typeId = this.typeIds[0];
  }
  validateId(length: number) {
    if (this.id != null ){
      if (this.id.toString().length < length  || this.id.toString().length > length) {
        this.errorId = 'La longitud de la identificación debe ser de '+length+' caracteres';
      } else {
        this.errorId = null;
      }
    }
  }
  changedSelection() {
    this.id = null;
    this.errorId = null;
  }
  search() {
    if (this.id != null) {
      this.idSend.emit(this.id);
    }
  }
  cleanFields(clean: boolean) {
    if (clean) {
      this.id = null;
    }
  }
}
