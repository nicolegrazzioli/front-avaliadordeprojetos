import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { RegisterDTO } from '../../../core/models/user.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <mat-card class="p-4" style="width: 400px;">
        <mat-card-header class="mb-3">
          <mat-card-title>Criar Conta</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            
            <mat-form-field class="w-100 mb-2">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="nomeUs">
              <mat-error *ngIf="form.get('nomeUs')?.hasError('required')">Obrigatório</mat-error>
            </mat-form-field>

            <mat-form-field class="w-100 mb-2">
              <mat-label>Email</mat-label>
              <input matInput formControlName="emailUs">
              <mat-error *ngIf="form.get('emailUs')?.hasError('required')">Obrigatório</mat-error>
              <mat-error *ngIf="form.get('emailUs')?.hasError('email')">Email inválido</mat-error>
            </mat-form-field>

            <mat-form-field class="w-100 mb-2">
              <mat-label>Senha</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="senhaUs">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="form.get('senhaUs')?.hasError('required')">Obrigatório</mat-error>
            </mat-form-field>

            <mat-form-field class="w-100 mb-3">
              <mat-label>Confirmar Senha</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmarSenha">
              <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="form.hasError('senhasDiferentes')">As senhas não conferem</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" class="w-100 mb-2" type="submit" [disabled]="form.invalid">
              Criar Conta
            </button>
            
            <div class="text-center">
              <a routerLink="/login" mat-button color="accent">Voltar para Login</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
    form: FormGroup;
    hidePassword = true;
    hideConfirmPassword = true;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            nomeUs: ['', Validators.required],
            emailUs: ['', [Validators.required, Validators.email]],
            senhaUs: ['', Validators.required],
            confirmarSenha: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        const senha = g.get('senhaUs')?.value;
        const confirmacao = g.get('confirmarSenha')?.value;

        if (senha && confirmacao && senha !== confirmacao) {
            return { 'senhasDiferentes': true };
        }
        return null;
    }

    onSubmit() {
        if (this.form.valid) {
            const formValue = this.form.value;

            const dto: RegisterDTO = {
                nomeUs: formValue.nomeUs,
                emailUs: formValue.emailUs,
                senhaUs: formValue.senhaUs,
                ativoUs: true,
                permissao: 'ROLE_USUARIO'
            };

            this.userService.registerPublic(dto).subscribe({
                next: () => {
                    this.snackBar.open('Conta criada com sucesso! Faça login.', 'Fechar', { duration: 3000 });
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error(err);
                    this.snackBar.open('Erro ao criar conta. Tente novamente.', 'Fechar', { duration: 3000 });
                }
            });
        }
    }
}
