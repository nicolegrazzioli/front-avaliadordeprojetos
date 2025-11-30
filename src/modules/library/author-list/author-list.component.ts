import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AutorService } from '../../../core/services/autor.service';
import { AuthService } from '../../../core/services/auth.service';
import { Autor } from '../../../core/models/author.model';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Autores</h2>
        <button mat-raised-button color="primary" routerLink="/library/authors/new" *ngIf="isAdmin">
          <mat-icon>add</mat-icon> Novo Autor
        </button>
      </div>

      <table mat-table [dataSource]="autores" class="mat-elevation-z8 w-100">
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef> Nome </th>
          <td mat-cell *matCellDef="let autor"> {{autor.nomeAut}} </td>
        </ng-container>

        <ng-container matColumnDef="nacionalidade">
          <th mat-header-cell *matHeaderCellDef> Nacionalidade </th>
          <td mat-cell *matCellDef="let autor"> {{autor.nacionalidadeAut}} </td>
        </ng-container>

        <ng-container matColumnDef="dataNascimento">
          <th mat-header-cell *matHeaderCellDef> Data Nascimento </th>
          <td mat-cell *matCellDef="let autor"> {{autor.dataNascimentoAut | date:'dd/MM/yyyy'}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Ações </th>
          <td mat-cell *matCellDef="let autor">
            <ng-container *ngIf="isAdmin">
              <button mat-icon-button color="primary" [routerLink]="['/library/authors/edit', autor.idAut]">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="delete(autor)">
                <mat-icon>delete</mat-icon>
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
export class AuthorListComponent implements OnInit {
  autores: Autor[] = [];
  displayedColumns: string[] = ['nome', 'nacionalidade', 'dataNascimento', 'actions'];
  isAdmin = false;

  constructor(
    private autorService: AutorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.permissao === 'ROLE_ADMIN';
    this.loadAutores();
  }

  loadAutores() {
    this.autorService.listar().subscribe({
      next: (data) => this.autores = data,
      error: (err) => console.error('Erro ao listar autores', err)
    });
  }

  delete(autor: Autor) {
    if (confirm(`Deseja excluir o autor ${autor.nomeAut}?`)) {
      this.autorService.excluir(autor.idAut!).subscribe({
        next: () => this.loadAutores(),
        error: (err) => alert('Erro ao excluir autor. Verifique se existem livros associados.')
      });
    }
  }
}
