import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStore, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { MdbCarouselItemComponent } from 'mdb-angular-ui-kit/carousel';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { GadgetsInterface } from '../../shared/interface/gadgets.interface';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const MATERIAL_COMPONENTS = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatTooltipModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatFabButton,
  MatDialogModule
];

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [
    CommonModule,
    MdbCarouselModule,
    FontAwesomeModule,
    NgbModule,
    ...MATERIAL_COMPONENTS,
    MatButtonModule
  ],
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.scss',
  providers: [NgbCarouselConfig, MdbCarouselComponent, MdbCarouselItemComponent]
})
export class UserScreenComponent implements OnInit {
  gadgets: GadgetsInterface[] | undefined;
  imageGroups: GadgetsInterface[][] = [];
  soldProduct?: GadgetsInterface;

  faStar = faStar;
  faStore = faStore;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTiktok = faTiktok;
  faWhatsapp = faWhatsapp;
  faHouse = faHouse;

  constructor(
    private config: NgbCarouselConfig,
    private mdbCarousel: MdbCarouselComponent,
    private mdbCarouselItem: MdbCarouselItemComponent,
    private httpRequest: HttpRequestService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    mdbCarousel.interval = 10000;
    mdbCarouselItem.active = true;
  }

  ngOnInit(): void {
    this.httpRequest.getGadgets().subscribe((data: GadgetsInterface[]) => {
      this.gadgets = data;
      if (this.gadgets !== undefined) {
        for (let i = 0; i < this.gadgets.length; i += 3) {
          this.imageGroups.push(this.gadgets.slice(i, i + 3));
        }
      }
    });
  }

  buyProduct(product:any) {
    if (product.quantity > 0) {
      const newBody = {
        id: product.id,
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        quantity: product.quantity - 1,
        availability: product.availability,
      }

      this.httpRequest.updateGadgets(newBody).subscribe();

      this.httpRequest.postSold(product).subscribe(response => {
        this.toastr.success('Purchase successfully!', 'Success', {
          closeButton: true
        });
      }, error => {
        this.toastr.error('error updating item!');
      });
    } else {
      this.toastr.error('Unavailable product!');
    }
  }

}
