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
import {ICompanyAdc} from '../../services/adc/companyAdcInterface';
import {AdcService} from '../../services/adc/adc.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assign-product-specialists',
  templateUrl: './assign-product-specialists.component.html',
})


export class AssignProductSpecialistsComponent implements OnInit {

  data: any = {
    company: null,
    specialist: null
  };
  doClean = false;
  specialists: ISpecialist[] = [];
  matched = false;
  types: string[] = ['Activo', 'Inactivo'];
  headers: string[] = ['select', 'ruc', 'name'];

  companies: ICompanyAdc[] = [];

  filteredCompanyNames: string[] = [];
  filteredSpecialistNames: string[] = [];
  companyNames: string[] = ['Telas S.A.', 'Flores del Valle', 'Coca Cola S.A.', 'Renault', 'KFC', 'El Rosado'];
  specialistNames: string[] = ['Rocafuerte Díaz Juan Daniel', 'Silva Fernandez Pedro Fernando',
    'Perez Maldonado Diana Solange', 'Campos Kent Leonel Dario', 'Sanchez Andrade Katherine Andrea',
    'Roldos Carrera Sofia Daniela', 'Lopez Green Ivan Carlos'];

  selection = new SelectionModel<ICompanyAdc>(true, []);
  dataSource: MatTableDataSource<ICompanyAdc>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private specialistsService: SpecialistsService, private companyService: AdcService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.companies);
    this.filteredCompanyNames = this.companyNames.sort();
    this.filteredSpecialistNames = this.specialistNames.sort();
  }

  ngOnInit(): void {
  }

  search(): void {
    console.log('data', this.data);
    if (this.data.company) {
      this.router.navigate(['assign-product-specialists-modify']).then(r => console.log(r));
    } else {
      this.searchCompanies();
    }
  }

  cleanSearch(): void {
    this.companies = [];
    this.dataSource = new MatTableDataSource(this.companies);
    this.data = {
      company: null,
      specialist: null
    };
    this.filteredCompanyNames = this.companyNames.sort();
    this.filteredSpecialistNames = this.specialistNames.sort();
  }

  changeCompanySearch(): void {
    if (this.data.company !== null && this.data.company !== '') {
      this.filteredCompanyNames =
        this.companyNames.filter((item) => item.toLowerCase().includes(this.data.company.toLowerCase())).sort();
    } else {
      this.filteredCompanyNames = this.companyNames.sort();
    }
  }

  changeSpecialistSearch(): void {
    if (this.data.specialist !== null && this.data.specialist !== '') {
      this.filteredSpecialistNames =
        this.specialistNames.filter((item) => item.toLowerCase().includes(this.data.specialist.toLowerCase())).sort();
    } else {
      this.filteredSpecialistNames = this.specialistNames.sort();
    }
  }

  searchCompanies(): void {
    this.companyService.getCompaniesAdcData().subscribe(
      (data: ICompanyAdc[]) => {
        this.companies = data;
        if (this.data.company) {
          this.companies = data.filter(c => c.name.toLowerCase() === this.data.company.toLowerCase());
        }
        this.companies.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.dataSource = new MatTableDataSource(this.companies);
      }
    );
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

  clean(clean: boolean): void {
    this.doClean = clean;
    /*this.searchError = null;*/
    this.specialists = [];
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.companies.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.companies);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ICompanyAdc): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}


