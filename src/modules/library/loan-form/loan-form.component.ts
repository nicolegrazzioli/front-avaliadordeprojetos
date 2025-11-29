import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { BookService } from '../../../core/services/book.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { Livro } from '../../../core/models/book.model';
import { Usuario } from '../../../core/models/user.model';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  ],
  template: `
    <div class="container mt-4">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Novo Empréstimo</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            
            <!-- User Selection -->
            <div class="row mb-3">
              <div class="col-md-12">
                <mat-form-field class="w-100" *ngIf="isAdmin; else userReadonly">
                  <mat-label>Usuário</mat-label>
                  <mat-select formControlName="usuarioId">
                    <mat-option *ngFor="let user of users" [value]="user.idUs">
                      {{ user.nomeUs }} ({{ user.emailUs }})
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="form.get('usuarioId')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
                
                <ng-template #userReadonly>
                  <mat-form-field class="w-100">
                    <mat-label>Usuário</mat-label>
                    <input matInput [value]="currentUser?.nomeUs" disabled>
                  </mat-form-field>
                </ng-template>
              </div>
            </div>

            <!-- Book Selection -->
            <div class="row mb-3">
              <div class="col-md-12">
                <mat-form-field class="w-100">
                  <mat-label>Livro</mat-label>
                  <mat-select formControlName="livroId">
                    <mat-option *ngFor="let book of books" [value]="book.idLiv">
                      {{ book.tituloLiv }}
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="form.get('livroId')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button mat-button type="button" routerLink="/library/loans">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Registrar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoanFormComponent implements OnInit {
  form: FormGroup;
  books: Livro[] = [];
  users: Usuario[] = [];
  currentUser: Usuario | null = null;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private loanService: EmprestimoService,
    private bookService: BookService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuarioId: ['', Validators.required],
      livroId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.isAdmin = this.currentUser?.permissao === 'ROLE_ADMIN';

    if (!this.isAdmin && this.currentUser?.idUs) {
      this.form.patchValue({ usuarioId: this.currentUser.idUs });
    }

    this.loadBooks();
    if (this.isAdmin) {
      this.loadUsers();
    }
  }

  loadBooks() {
    this.bookService.findAll().subscribe(books => {
      // Filter available and active books
      this.books = books.filter(b => b.ativoLiv && b.disponivelLiv);
    });
  }

  loadUsers() {
    this.userService.findAllActive().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { livroId, usuarioId } = this.form.value;
      this.loanService.registrar(livroId, usuarioId).subscribe({
        next: () => this.router.navigate(['/library/loans']),
        error: (err) => console.error('Erro ao registrar empréstimo', err)
      });
    }
  }
}
