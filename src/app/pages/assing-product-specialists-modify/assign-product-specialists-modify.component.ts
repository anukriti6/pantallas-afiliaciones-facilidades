import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../services/company/company.service';
import {ICompanyAdc} from '../../services/adc/companyAdcInterface';
import {AdcService} from '../../services/adc/adc.service';

@Component({
  selector: 'app-assign-product-specialists-modify',
  templateUrl: './assign-product-specialists-modify.component.html',
})


export class AssignProductSpecialistsModifyComponent implements OnInit, OnDestroy {

  specialist: ISpecialist | undefined;
  name: string | null = null;
  sub: Subscription | undefined;
  doClean = false;
  specialists: ISpecialist[] = [];
  matched = false;
  types: string[] = ['Activo', 'Inactivo'];
  headers: string[] = [ 'code', 'names', 'user', 'email', 'status', 'actions'];
  companies: ICompanyAdc[] = [];

  selection = new SelectionModel<ISpecialist>(true, []);
  dataSource: MatTableDataSource<ISpecialist>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private specialistsService: SpecialistsService, private companyService: AdcService, public dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.specialists);
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.name = params.get('id');
      this.searchSpecialists();
    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['assign-product-specialists']).then(r => console.log(r));
  }

  relate(): void {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: 'Datos guardados exitosamente',
        dismiss: 'Cerrar',
        type: 'Alerta'
      },
      duration: 1300,
      panelClass: 'alert-success'
    });

    setTimeout(() => {
      this.onBack();
    }, 1500);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
                message: 'Rechazo Exitoso',
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

  searchSpecialist(): void {
    this.specialistsService.getSpecialists().subscribe(
      (data: ISpecialist[]) => {
        this.specialist = data.find(s => s.names === this.name);
      }
    );
  }

  searchSpecialists(): void {
    this.specialistsService.getSpecialists().subscribe(
      (data: ISpecialist[]) => {
        this.specialists = data;
        this.specialists.sort((a, b) => {
          if (a.names > b.names) {
            return 1;
          }
          if (a.names < b.names) {
            return -1;
          }
          return 0;
        });
        this.dataSource = new MatTableDataSource(this.specialists);
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    /*this.searchError = null;*/
    this.companies = [];
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


