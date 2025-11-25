import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AutorService } from '../../../core/services/autor-service';

@Component({
    selector: 'app-author-form',
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
          <mat-card-title>{{ isEdit ? 'Editar' : 'Novo' }} Autor</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Nome</mat-label>
                  <input matInput formControlName="nomeAut">
                  <mat-error *ngIf="form.get('nomeAut')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Nacionalidade</mat-label>
                  <input matInput formControlName="nacionalidadeAut">
                  <mat-error *ngIf="form.get('nacionalidadeAut')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <mat-form-field class="w-100">
                  <mat-label>Data Nascimento</mat-label>
                  <input matInput type="date" formControlName="dataNascimentoAut">
                  <mat-error *ngIf="form.get('dataNascimentoAut')?.hasError('required')">Obrigatório</mat-error>
                </mat-form-field>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-3">
              <button mat-button type="button" routerLink="/library/authors">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AuthorFormComponent implements OnInit {
    form: FormGroup;
    isEdit = false;
    id: number | null = null;

    constructor(
        private fb: FormBuilder,
        private autorService: AutorService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            nomeAut: ['', Validators.required],
            nacionalidadeAut: ['', Validators.required],
            dataNascimentoAut: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.isEdit = true;
            this.autorService.listar().subscribe(autores => {
                const autor = autores.find(a => a.idAut === this.id);
                if (autor) {
                    this.form.patchValue(autor);
                }
            });
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const formValue = this.form.value;
            const operation = this.isEdit
                ? this.autorService.atualizar({ ...formValue, idAut: this.id })
                : this.autorService.salvar(formValue);

            operation.subscribe(() => {
                this.router.navigate(['/library/authors']);
            });
        }
    }
}
