import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <mat-card class="p-4" style="width: 400px;">
        <mat-card-header class="mb-3">
          <mat-card-title>Login Biblioteca</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="w-100 mb-2">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="Ex: admin@email.com">
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field class="w-100 mb-3">
              <mat-label>Senha</mat-label>
              <input matInput type="password" formControlName="senha">
              <mat-error *ngIf="loginForm.get('senha')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="loginForm.invalid">
              Entrar
            </button>
            <div *ngIf="error" class="text-danger mt-2 text-center">
              {{ error }}
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  protected onSubmit() {
    if (this.loginForm.valid) {
      const emailFormValue = this.loginForm.get('email')?.value;
      const senhaFormValue = this.loginForm.get('senha')?.value;

      const dadosLogin = {
        login: emailFormValue,
        senha: senhaFormValue
      };

      this.authService.login(dadosLogin).subscribe({
        next: () => {
          this.router.navigate(['/library/books']);
        },
        error: (err) => {
          this.error = 'Usuário ou senha incorretos';
          console.error(err);
        }
      });
    }
  }
}
