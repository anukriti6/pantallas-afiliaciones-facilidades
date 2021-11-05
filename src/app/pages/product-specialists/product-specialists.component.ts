import {Component, OnInit, ViewChild} from '@angular/core';
import {SpecialistsService} from '../../services/specialist/specialists.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {DialogComponent} from '../../components/dialogs/dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ISpecialist} from '../../services/specialist/SpecialistInterface';

@Component({
  selector: 'app-product-specialists',
  templateUrl: './product-specialists.component.html',
})


export class ProductSpecialistsComponent implements OnInit {
  doClean = false;
  specialists: ISpecialist[] = [];
  matched = false;
  types: string[] = ['Activo', 'Inactivo'];
  headers: string[] = ['code', 'names', 'user', 'email', 'status', 'actions'];
  selection = new SelectionModel<ISpecialist>(true, []);
  dataSource: MatTableDataSource<ISpecialist>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  constructor(private specialistsService: SpecialistsService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.specialists);
  }

  ngOnInit(): void {
    this.searchSpecialists();
  }

  openModal(type: string): void {
    const selected = this.selection.selected.length;
    switch (type) {
      case 'success':
        const successDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: '¿Está seguro de aprobar?',
            body: (selected > 1 ? 'Serán aprobadas ' : 'Será aprobada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Aprobar'
          }
        });

        successDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result) {
            this.snackBar.openFromComponent(NotifierComponent, {
              data: {
                message: 'Aprobación exitosa',
                dismiss: 'Cerrar',
                type: 'Alerta'
              },
              duration: 1300,
              panelClass: 'alert-success'
            });
          }
        });

        break;
      case 'error':

        const errorDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: '¿Está seguro de rechazar?',
            body: (selected > 1 ? 'Serán rechazadas ' : 'Será rechazada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Rechazar'
          }
        });

        errorDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result) {
            this.snackBar.openFromComponent(NotifierComponent, {
              data: {
                message: 'Rechazo exitoso',
                dismiss: 'Cerrar',
                type: 'Alerta'
              },
              duration: 1300,
              panelClass: 'alert-danger'
            });
          }
        });

        break;
      default:
        console.log('default');
        break;

    }
  }

  searchSpecialists(): void {
    this.specialistsService.getSpecialists().subscribe(
      (data: ISpecialist[]) => {
        this.specialists = data;
        this.dataSource = new MatTableDataSource(this.specialists);
        console.log('data', data);
        console.log('specialists', this.specialists);
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    /*this.searchError = null;*/
    this.specialists = [];
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.specialists.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.specialists);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ISpecialist): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}


