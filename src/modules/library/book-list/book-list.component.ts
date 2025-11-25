import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../../core/services/book.service';
import { AuthService } from '../../../core/services/auth.service';
import { Livro } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Livros</h2>
        <button mat-raised-button color="primary" routerLink="new" *ngIf="isAdmin">
          <mat-icon>add</mat-icon> Novo Livro
        </button>
      </div>

      <table mat-table [dataSource]="books" class="w-100 mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let book"> {{book.idLiv}} </td>
        </ng-container>

        <ng-container matColumnDef="titulo">
          <th mat-header-cell *matHeaderCellDef> Título </th>
          <td mat-cell *matCellDef="let book"> {{book.tituloLiv}} </td>
        </ng-container>

        <ng-container matColumnDef="autor">
          <th mat-header-cell *matHeaderCellDef> Autores </th>
          <td mat-cell *matCellDef="let book"> 
            <span *ngFor="let autor of book.autores; let last = last">
              {{autor.nomeAut}}{{last ? '' : ', '}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="isbn">
          <th mat-header-cell *matHeaderCellDef> ISBN </th>
          <td mat-cell *matCellDef="let book"> {{book.isbnLiv}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Ações </th>
          <td mat-cell *matCellDef="let book">
            <ng-container *ngIf="isAdmin">
              <button mat-icon-button color="primary" [routerLink]="['edit', book.idLiv]">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="delete(book)">
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
export class BookListComponent implements OnInit {
  books: Livro[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'autor', 'isbn', 'actions'];

  isAdmin = false;

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.permissao === 'ROLE_ADMIN';
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.findAll().subscribe(data => this.books = data);
  }

  delete(book: Livro) {
    if (confirm(`Deseja excluir o livro "${book.tituloLiv}"?`)) {
      this.bookService.delete(book.idLiv!).subscribe(() => this.loadBooks());
    }
  }
}
