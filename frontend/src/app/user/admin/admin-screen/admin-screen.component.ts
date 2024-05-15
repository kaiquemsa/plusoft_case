import { HttpRequestService } from './../../../shared/services/http-request.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GadgetsInterface } from '../../../shared/interface/gadgets.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';
import { SoldInterface } from '../../../shared/interface/sold.interface';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatMenuModule,
  MatTooltipModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatCheckboxModule,
];


@Component({
  selector: 'app-admin-screen',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [FormsModule, ReactiveFormsModule, MATERIAL_MODULES, CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule, HttpClientModule, MatTabsModule],
  templateUrl: './admin-screen.component.html',
  styleUrl: './admin-screen.component.scss'
})
export class AdminScreenComponent implements OnInit{
  gadgetsData: MatTableDataSource<GadgetsInterface> = new MatTableDataSource<GadgetsInterface>([]);
  soldData: MatTableDataSource<SoldInterface> = new MatTableDataSource<SoldInterface>([]);

  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'quantity',
    'img',
    'availability',
    'edit',
    'exclude'
  ];
  displayedColumnsSold: string[] = [
    'name',
    'description',
    'price',
    'quantity',
    'img',
    'availability',
  ];
  formGroup: any;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  selectedItem: string = '';

  constructor(
    private httpRequest: HttpRequestService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit () {
    this.getAllGadgets()
    this.getAllSold()
  }

  getAllGadgets() {
    this.httpRequest.getGadgets().subscribe((data: any) => {
      this.gadgetsData.data = data;
    });
  }

  getAllSold() {
    this.httpRequest.getSold().subscribe((data: any) => {
      this.soldData.data = data;
    });
  }

  excludeItem(id:string) {
    this.httpRequest.deleteGadgets(id).subscribe(response => {
      this.toastr.success('Delete item success!', 'Success', {
        closeButton: true
      });
      window.location.reload();
      this.router.navigate(['/admin-screen']);
    }, error => {
      this.toastr.error('Error deleting item!', 'Error', {
        closeButton: true
      });
      this.router.navigate(['/admin-screen']);
    });
  }

  filterGadgetsByName(searchTerm: string) {
    this.gadgetsData.filter = searchTerm.trim().toLowerCase();
    this.gadgetsData._updateChangeSubscription();
  }


  filterSoldGadgetsByName(searchTerm: string) {
    this.soldData.filter = searchTerm.trim().toLowerCase();
    this.soldData._updateChangeSubscription();
  }

}
