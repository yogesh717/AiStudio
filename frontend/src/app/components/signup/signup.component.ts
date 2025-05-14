import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-signup',
  imports: [  ReactiveFormsModule,
                 CommonModule,

              HttpClientModule
            ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {



  signupForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.value).subscribe({
        next: (res: any) => {
          this.auth.setToken(res.token);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error.message || 'Signup failed';
        }
      });
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}


//   signupForm: FormGroup;
//   error: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private router: Router
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       this.auth.register(this.signupForm.value).subscribe({
//         next: (res: any) => {
//           this.auth.setToken(res.token);
//           this.router.navigate(['/login']);
//         },
//         error: (err) => {
//           this.error = err.error.message || 'Signup failed';
//         }
//       });
//     }
//   }
// }







