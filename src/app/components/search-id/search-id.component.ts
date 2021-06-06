import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-id',
  templateUrl: './search-id.component.html',
  styleUrls: ['./search-id.component.scss','../../app.component.scss']
})
export class SearchIdComponent implements OnInit {
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
    //search
  }

}
