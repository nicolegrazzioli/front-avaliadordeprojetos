import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../core/services/book.service';

@Component({
    selector: 'app-book-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule
    ],
    template: `
    <div class="container mt-4">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEdit ? 'Editar' : 'Novo' }} Livro</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Título</mat-label>
                  <input matInput formControlName="titulo">
                  <mat-error *ngIf="form.get('titulo')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Autor</mat-label>
                  <input matInput formControlName="autor">
                  <mat-error *ngIf="form.get('autor')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>ISBN</mat-label>
                  <input matInput formControlName="isbn">
                  <mat-error *ngIf="form.get('isbn')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Categoria</mat-label>
                  <input matInput formControlName="categoria">
                </mat-form-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Data Publicação</mat-label>
                  <input matInput formControlName="dataPublicacao" placeholder="YYYY-MM-DD">
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Quantidade Exemplares</mat-label>
                  <input matInput type="number" formControlName="quantidadeExemplares">
                </mat-form-field>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-3">
              <button mat-button type="button" routerLink="/library/books">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class BookFormComponent implements OnInit {
    form: FormGroup;
    isEdit = false;
    id: number | null = null;

    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            titulo: ['', Validators.required],
            autor: ['', Validators.required],
            isbn: ['', Validators.required],
            categoria: [''],
            dataPublicacao: [''],
            quantidadeExemplares: [1]
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.isEdit = true;
            this.bookService.findById(this.id).subscribe(book => {
                this.form.patchValue(book);
            });
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const operation = this.isEdit
                ? this.bookService.update(this.id!, this.form.value)
                : this.bookService.create(this.form.value);

            operation.subscribe(() => {
                this.router.navigate(['/library/books']);
            });
        }
    }
}
