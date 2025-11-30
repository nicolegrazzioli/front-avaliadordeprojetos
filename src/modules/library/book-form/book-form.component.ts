import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BookService } from '../../../core/services/book.service';
import { AutorService } from '../../../core/services/autor.service';
import { Autor } from '../../../core/models/author.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
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
                  <input matInput formControlName="tituloLiv">
                  <mat-error *ngIf="form.get('tituloLiv')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>ISBN</mat-label>
                  <input matInput formControlName="isbnLiv">
                  <mat-error *ngIf="form.get('isbnLiv')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Ano Publicação</mat-label>
                  <input matInput type="number" formControlName="anoPublicacaoLiv">
                  <mat-error *ngIf="form.get('anoPublicacaoLiv')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Autores</mat-label>
                  <mat-select formControlName="autoresIds" multiple>
                    <mat-option *ngFor="let autor of autores" [value]="autor.idAut">
                      {{ autor.nomeAut }}
                    </mat-option>
                  </mat-select>
                  <mat-error *ngIf="form.get('autoresIds')?.hasError('required')">Obrigatório</mat-error>
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
  autores: Autor[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      tituloLiv: ['', Validators.required],
      isbnLiv: ['', Validators.required],
      anoPublicacaoLiv: ['', Validators.required],
      autoresIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarAutores();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.bookService.findById(this.id).subscribe(book => {
        this.form.patchValue(book);
        if (book.autores) {
          this.form.patchValue({
            autoresIds: book.autores.map(a => a.idAut)
          });
        }
      });
    }
  }

  carregarAutores() {
    this.autorService.listar().subscribe({
      next: (res) => this.autores = res,
      error: (err) => console.error('Erro ao carregar autores', err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const operation = this.isEdit
        ? this.bookService.update(this.id!, formValue)
        : this.bookService.create(formValue);

      operation.subscribe(() => {
        this.router.navigate(['/library/books']);
      });
    }
  }
}
