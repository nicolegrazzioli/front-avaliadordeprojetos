import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../../core/services/user.service';
import { DadosUsuarioCompleto, UpdatePermissionDTO } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-permission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>Editar Permissões - {{data.nomeUs}}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <div class="mb-3">
          <mat-checkbox formControlName="ativoUs">
            Usuário Ativo
          </mat-checkbox>
        </div>

        <mat-form-field class="w-100">
          <mat-label>Permissão</mat-label>
          <mat-select formControlName="permissao">
            <mat-option value="ROLE_USUARIO">Usuário</mat-option>
            <mat-option value="ROLE_ADMIN">Admin</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="form.invalid">
        Salvar
      </button>
    </mat-dialog-actions>
  `
})
export class UserPermissionDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DadosUsuarioCompleto
  ) {
    this.form = this.fb.group({
      ativoUs: [data.ativoUs, Validators.required],
      permissao: [data.permissao, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.form.valid) {
      const dto: UpdatePermissionDTO = this.form.value;
      this.userService.updatePermission(this.data.idUs, dto).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
