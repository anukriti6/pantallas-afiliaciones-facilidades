import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEasinessData } from 'src/app/services/easiness/easinessDataInterface';

@Component({
  selector: 'app-create-edit-easiness',
  templateUrl: './create-edit-easiness.component.html',
  styleUrls: ['./create-edit-easiness.component.scss']
})
export class CreateEditEasinessComponent implements OnInit {
  @Input() easiness: IEasinessData = {
    id: 0,
    idNumber: 1111111111,
    related: false,
    easiness: [{
      id: 0,
      name: '',
      quotes: {
        approved: 0,
        available: 0,
        blocked: 0,
        used: 0
      },
      status: '',
      related: false
    }]
  };
  isEditingArray: boolean[] =[];
  isRelatedArray: boolean[] = [];
  @Output() easinessData = new EventEmitter<IEasinessData>();
  @Output() Clean = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.easiness.easiness.length; i++) {
      this.isEditingArray.push(false);
      this.isRelatedArray.push(this.easiness.easiness[i].related);
    }
  }
  editStatus(index: number) {
    this.isEditingArray[index] = !this.isEditingArray[index];
  }
  save() {
    let globalRelated = false;
    for (let i = 0; i < this.easiness.easiness.length; i++) {
      this.easiness.easiness[i].related = this.isRelatedArray[i];
      if (this.easiness.easiness[i].related) {
        globalRelated = this.easiness.easiness[i].related;
      }
    }
    this.easiness.related = globalRelated;
  }
  clean() {
    this.Clean.emit(true);
  }

}
