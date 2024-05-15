import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GadgetsInterface } from '../../../shared/interface/gadgets.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-admin-screen-manage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MATERIAL_MODULES, CommonModule,RouterLink,RouterLinkActive, HttpClientModule],
  templateUrl: './admin-screen-manage.component.html',
  styleUrl: './admin-screen-manage.component.scss'
})
export class AdminScreenManageComponent {
  formGroup!: FormGroup;
  gadget: GadgetsInterface[] = [];
  gadgetsData: GadgetsInterface[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.buildFormGroup();
  }

  ngOnInit () {

    const id = this.route.snapshot.paramMap.get('id');


    this.httpRequest.getGadgets().subscribe((data: GadgetsInterface[]) => {
      const gadget = data.find((gadget:any) => gadget.id === id);

      if (gadget) {
        this.formGroup.patchValue(gadget);

        this.formGroup.get('name')?.setValue(gadget.name);
        this.formGroup.get('description')?.setValue(gadget.description);
        this.formGroup.get('price')?.setValue(gadget.price);
        this.formGroup.get('quantity')?.setValue(gadget.quantity);
        this.formGroup.get('availability')?.setValue(gadget.availability);
        this.formGroup.get('img')?.setValue(gadget.img);
      }
    });

  }

  private buildFormGroup(gadgets?: GadgetsInterface): void {
    this.formGroup = this._formBuilder.group({
      id: [
        gadgets?.id ? gadgets.id : '',
        gadgets?.id ? Validators.required : '',
      ],
      name: [
        gadgets?.name ? gadgets.name : '',
        Validators.required,
      ],
      description: [
        gadgets?.description ? gadgets.description : '',
        Validators.required,
      ],
      price: [
        gadgets?.price ? gadgets.price : '',
        [Validators.maxLength(4), Validators.required],
      ],
      quantity: [
        gadgets?.quantity ? gadgets.quantity : '',
        Validators.required,
      ],
      availability: [
        gadgets?.availability ? gadgets.availability : false,
        Validators.required,
      ],
      img: [
        gadgets?.img ? gadgets.img : '',
        Validators.required,
      ],
    },
    );
  }

  postSuggestion() {
    if (this.formGroup.get('name')?.value) {
      const name = this.formGroup.get('name')?.value;

      const promptDescription = `Descreva o produto ${name}, destacando suas principais características, benefícios e possíveis aplicações, mas seja breve.`

      const messageObject = { message: promptDescription };

      this.httpRequest.postAISuggestion(messageObject).subscribe(response => {
        this.formGroup.get('description')?.setValue(response.message);
        this.toastr.success('Description suggestion!', 'Success', {
          closeButton: true
        });
      }, error => {
        this.toastr.error('Error description suggestion!');
      });
    }
  }

  postSuggestionGadgets() {
    this.toastr.info('Loading suggestion...', 'Wait a moment', {
      closeButton: true,
      timeOut: 30000
    });

    const prompt = `Gostaria de uma sugestão de um produto tecnológico para venda. Por favor, siga o seguinte template nome: ; descrição: ; preço: ; quantidade: ; url de imagem: ; imagem pegue do site freepik, exemplo da estrutura da url (https://img.freepik.com/free-photo/produto.jpg) e não precisa anexar. Separe obrigatoriamente por ponto e vírgula, como mostra o template.`

    const messageObject = { message: prompt };

    this.httpRequest.postAISuggestion(messageObject).subscribe(response => {
      this.toastr.clear();

      this.toastr.success('Gadget suggestion!', 'Success', {
        closeButton: true
      });

      const parts = response.message.replace(/\*\*/g, '').split(';').map((part: any) => part.trim());
      const fields: any = {};

      parts.forEach((part: any) => {
        if (part.toLowerCase().startsWith('url de imagem')) {
          fields['img'] = part.substring(part.indexOf('https')).trim();
        } else {
          let [key, value] = part.split(':').map((p: any) => p.trim());

          switch (key.toLowerCase()) {
            case 'nome':
              key = 'name';
              break;
            case 'preço':
              key = 'price';
              value = parseFloat(value.replace('R$', '').replace(',', '').replace('00','').split(',')[0].trim());
              break;
            case 'descrição':
              key = 'description';
              break;
            case 'quantidade' || 'quantidade em estoque':
              key = 'quantity';
              value = value.replace('em estoque', '').replace('unidades', '').trim();
              break;
          }
          if (key && value) {
            fields[key] = value;
          }
        }
      });

      Object.keys(fields).forEach(key => {
        const control = this.formGroup.get(key);
        if (control) {
          control.setValue(fields[key]);
          this.formGroup.get('availability')?.setValue(true);
        }
      });

    }, error => {
      this.toastr.clear();

      this.toastr.error('Error suggestion!');
    });
  }


  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === undefined || id === null) {
      if (this.formGroup.valid) {
        this.httpRequest.postGadgets(this.formGroup.value).subscribe(response => {
          this.toastr.success('Create item success!', 'Success', {
            closeButton: true
          });
          this.router.navigate(['/admin-screen']);
        }, error => {
          this.toastr.error('Error creating item!');
        });
      }
    }
    else {
      this.httpRequest.updateGadgets(this.formGroup.value).subscribe(response => {
        this.toastr.success('Update item success!', 'Success', {
          closeButton: true
        });
        this.router.navigate(['/admin-screen']);
      }, error => {
        this.toastr.error('error updating item!');
      });
    }
  }

}
