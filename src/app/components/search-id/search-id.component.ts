import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-search-id',
  templateUrl: './search-id.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SearchIdComponent implements OnInit {
  doClean = false;

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
  typeId: string | null = null;
  id: number | null = null;
  errorId: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.typeId = this.typeIds[0];
  }

  validateId(length: number): void {
    const element = this.typeId === this.typeIds[0] ? document.getElementById('idRuc') : document.getElementById('id');
    if (this.id != null) {
      if (this.id.toString().length < length || this.id.toString().length > length) {
        this.errorId = 'La longitud de la identificación debe ser de ' + length + ' caracteres';
        if (element) {
          element.style.borderColor = '#FF0000';
        }
      } else {
        this.errorId = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      }
    } else {
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  changedSelection(): void {
    this.id = null;
    this.errorId = null;
  }

  search(): void {
    if (this.id != null) {
      this.idSend.emit(this.id);
    }
  }

  cleanFields(clean: boolean): void {
    if (clean) {
      this.id = null;
    }
  }
}
