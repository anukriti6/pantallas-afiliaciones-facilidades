import {Component, OnInit} from '@angular/core';
import {EasinessService} from 'src/app/services/easiness/easiness.service';
import {IEasinessData} from 'src/app/services/easiness/easinessDataInterface';

@Component({
  selector: 'app-relate-easinesses',
  templateUrl: './relate-easinesses.component.html',
})
export class RelateEasinessesComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  fullEasinessData: IEasinessData[] = [];
  currEasinessData: IEasinessData | null = null;
  matched = false;

  constructor(private easinessService: EasinessService) {
  }

  ngOnInit(): void {

  }

  searchId(id: number): void {
    this.easinessService.getIds().subscribe(
      (data) => {
        this.fullEasinessData = data;
        if (this.fullEasinessData.length) {
          for (let i = 0; i < this.fullEasinessData.length; i++) {
            if (this.fullEasinessData[i].idNumber === id) {
              this.matched = true;
              this.currEasinessData = this.fullEasinessData[i];
              this.searchError = null;
            }
          }
          if (!this.matched) {
            this.searchError = 'Usuario no encontrado. Intente nuevamente';
            this.currEasinessData = null;
          }
        }
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.currEasinessData = null;
  }
}
