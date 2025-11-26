import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { DadosUsuarioCompleto } from '../../../core/models/user.model';
import { UserPermissionDialogComponent } from '../user-permission-dialog/user-permission-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuários</h2>
      </div>

      <table mat-table [dataSource]="users" class="w-100 mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let user"> {{user.idUs}} </td>
        </ng-container>

        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef> Nome </th>
          <td mat-cell *matCellDef="let user"> {{user.nomeUs}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let user"> {{user.emailUs}} </td>
        </ng-container>

        <ng-container matColumnDef="senha">
          <th mat-header-cell *matHeaderCellDef> Senha </th>
          <td mat-cell *matCellDef="let user"> *** </td>
        </ng-container>

        <ng-container matColumnDef="ativo">
          <th mat-header-cell *matHeaderCellDef> Ativo </th>
          <td mat-cell *matCellDef="let user"> {{user.ativoUs ? 'Sim' : 'Não'}} </td>
        </ng-container>

        <ng-container matColumnDef="permissao">
          <th mat-header-cell *matHeaderCellDef> Permissão </th>
          <td mat-cell *matCellDef="let user"> {{user.permissao}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Ações </th>
          <td mat-cell *matCellDef="let user">
            <!-- Só mostra ações se o usuário é ROLE_USUARIO e o logado é admin -->
            <ng-container *ngIf="user.permissao === 'ROLE_USUARIO' && isAdmin">
              <button mat-icon-button color="primary" (click)="editPermission(user)" title="Editar permissão">
                <mat-icon>edit</mat-icon>
              </button>
            </ng-container>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: DadosUsuarioCompleto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'ativo', 'permissao', 'actions'];
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.permissao === 'ROLE_ADMIN';

    // Se não for admin, redireciona direto para o perfil
    if (!this.isAdmin && user?.idUs) {
      this.router.navigate(['/library/users/profile']);
    } else if (this.isAdmin) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.findAllComplete().subscribe(data => this.users = data);
  }

  editPermission(user: DadosUsuarioCompleto) {
    const dialogRef = this.dialog.open(UserPermissionDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Recarrega a lista
      }
    });
  }
}
