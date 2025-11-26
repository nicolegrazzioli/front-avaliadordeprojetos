import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { UpdateProfileDTO } from '../../../core/models/user.model';

@Component({
    selector: 'app-user-form',
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
    <div class="container mt-4">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Meu Perfil</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            
            <div class="row mb-3">
              <div class="col-md-4">
                <mat-form-field class="w-100">
                  <mat-label>ID</mat-label>
                  <input matInput [value]="userId" disabled>
                </mat-form-field>
              </div>
              <div class="col-md-4">
                <mat-form-field class="w-100">
                  <mat-label>Permissão</mat-label>
                  <input matInput [value]="userPermissao" disabled>
                </mat-form-field>
              </div>
              <div class="col-md-4">
                <mat-form-field class="w-100">
                  <mat-label>Status</mat-label>
                  <input matInput value="Ativo" disabled>
                </mat-form-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Nome</mat-label>
                  <input matInput formControlName="nomeUs">
                  <mat-error *ngIf="form.get('nomeUs')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="emailUs">
                  <mat-error *ngIf="form.get('emailUs')?.hasError('required')">Obrigatório</mat-error>
                  <mat-error *ngIf="form.get('emailUs')?.hasError('email')">Email inválido</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <h3>Alterar Senha</h3>
                <p class="text-muted small">Preencha apenas se desejar alterar sua senha atual.</p>
              </div>
              
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Nova Senha</mat-label>
                  <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="senhaUs">
                  <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                </mat-form-field>
              </div>
              
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Confirmar Nova Senha</mat-label>
                  <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmarSenha">
                  <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                    <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  <mat-error *ngIf="form.hasError('senhasDiferentes')">As senhas não conferem</mat-error>
                </mat-form-field>
              </div>
              <div class="col-12 mt-2">
                <p class="text-muted small">
                  Esqueceu a senha? <a href="javascript:void(0)" (click)="forgotPassword()">Clique aqui</a> para redefinir.
                </p>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar Alterações</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UserFormComponent implements OnInit {
    form: FormGroup;
    userId: number | null = null;
    userPermissao: string = '';
    hidePassword = true;
    hideConfirmPassword = true;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            nomeUs: ['', Validators.required],
            emailUs: ['', [Validators.required, Validators.email]],
            senhaUs: [''],
            confirmarSenha: ['']
        }, { validators: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        const user = this.authService.getUser();
        if (user && user.idUs) {
            this.userId = user.idUs;
            this.userPermissao = user.permissao || '';

            // Carrega dados atuais do usuário
            this.userService.findById(this.userId).subscribe(dados => {
                this.form.patchValue({
                    nomeUs: dados.nomeUs,
                    emailUs: dados.emailUs
                });
            });
        }
    }

    passwordMatchValidator(g: FormGroup) {
        const senha = g.get('senhaUs')?.value;
        const confirmacao = g.get('confirmarSenha')?.value;

        if (senha && senha !== confirmacao) {
            return { 'senhasDiferentes': true };
        }
        return null;
    }

    onSubmit() {
        if (this.form.valid && this.userId) {
            const formValue = this.form.value;

            // Monta o objeto conforme o DTO UpdateProfileDTO
            const updateDTO: UpdateProfileDTO = {
                nomeUs: formValue.nomeUs,
                emailUs: formValue.emailUs,
                senhaUs: formValue.senhaUs ? formValue.senhaUs : undefined
            };

            this.userService.updateProfile(this.userId, updateDTO).subscribe({
                next: () => {
                    this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', { duration: 3000 });
                    if (formValue.senhaUs) {
                        this.snackBar.open('Senha alterada com sucesso!', 'Fechar', { duration: 3000 });
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.snackBar.open('Erro ao atualizar perfil.', 'Fechar', { duration: 3000 });
                }
            });
        }
    }

    forgotPassword() {
        this.snackBar.open('Link enviado, verifique seu email', 'Fechar', { duration: 3000 });
    }
}