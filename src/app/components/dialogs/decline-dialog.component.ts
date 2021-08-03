import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  total: number;
}

@Component({
  selector: 'app-decline-dialog',
  templateUrl: 'decline-dialog.component.html',
})
export class DeclineDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeclineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

