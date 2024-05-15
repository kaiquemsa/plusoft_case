import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  isActive = false;

  isLoggedIn = false;

  formSignUp!: FormGroup;

  formSignIn!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formSignUp = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), Validators.required]],
      password: ['', Validators.required],
    });

    this.formSignIn = this._formBuilder.group({
      email: ['', [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), Validators.required]],
      password: ['', Validators.required],
    })
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  onSubmit() {
    if (this.isActive) {
      if (this.formSignUp.valid) {
        this.httpRequest.signUp(this.formSignUp.value).subscribe(
          user => {
            this.toastr.success('Register with success!', 'Success', {
              closeButton: true
            });
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/admin-screen']);
          },
          error => {
            this.toastr.error('Sign-up error!', 'Error', {
              closeButton: true
            });
          }
        );
      }
    } else {
      if (this.formSignIn.valid) {
        this.httpRequest.AuthUser(this.formSignIn.value).subscribe(
          user => {
            this.toastr.success('You are authenticated!', 'Success', {
              closeButton: true
            });
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/admin-screen']);
          },
          error => {
            this.toastr.error('You are not authenticated!', 'Error', {
              closeButton: true
            });
          }
        );
      }
    }
  }

}
