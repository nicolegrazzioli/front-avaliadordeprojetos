import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { Emprestimo } from '../../../core/models/loan.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Empréstimos</h2>
        <button mat-raised-button color="primary" routerLink="/library/loans/new">
          <mat-icon>add</mat-icon> Novo Empréstimo
        </button>
      </div>

      <table mat-table [dataSource]="loans" class="mat-elevation-z8 w-100">
        <!-- Livro Column -->
        <ng-container matColumnDef="livro">
          <th mat-header-cell *matHeaderCellDef> Livro </th>
          <td mat-cell *matCellDef="let loan"> {{loan.livroEmp?.tituloLiv}} </td>
        </ng-container>

        <!-- Usuario Column -->
        <ng-container matColumnDef="usuario">
          <th mat-header-cell *matHeaderCellDef> Usuário </th>
          <td mat-cell *matCellDef="let loan"> {{loan.usuarioEmp?.nomeUs}} </td>
        </ng-container>

        <!-- Data Emprestimo Column -->
        <ng-container matColumnDef="dataEmprestimo">
          <th mat-header-cell *matHeaderCellDef> Data Empréstimo </th>
          <td mat-cell *matCellDef="let loan"> {{loan.dataEmprestimoEmp | date:'dd/MM/yyyy'}} </td>
        </ng-container>

        <!-- Data Devolucao Prevista Column -->
        <ng-container matColumnDef="dataDevolucaoPrevista">
          <th mat-header-cell *matHeaderCellDef> Previsão Devolução </th>
          <td mat-cell *matCellDef="let loan"> {{loan.dataDevolucaoPrevistaEmp | date:'dd/MM/yyyy'}} </td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let loan"> 
            <span [class]="'badge ' + getStatusClass(loan)">
              {{ getDisplayStatus(loan) }}
            </span>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Ações </th>
          <td mat-cell *matCellDef="let loan">
            <button mat-button color="primary" 
                    *ngIf="(loan.statusEmp === 'ATIVO' || loan.statusEmp === 'ATRASADO') && !isLate(loan)"
                    (click)="renovar(loan)">
              Renovar
            </button>
            <button mat-button color="warn" 
                    *ngIf="loan.statusEmp === 'ATIVO' || loan.statusEmp === 'ATRASADO'"
                    (click)="devolver(loan)">
              Devolver
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .badge { padding: 8px; border-radius: 4px; color: white; }
    .bg-success { background-color: #28a745; }
    .bg-warning { background-color: #ffc107; color: black; }
    .bg-danger { background-color: #dc3545; }
    .bg-secondary { background-color: #6c757d; }
  `]
})
export class LoanListComponent implements OnInit {
  loans: Emprestimo[] = [];
  displayedColumns: string[] = ['livro', 'usuario', 'dataEmprestimo', 'dataDevolucaoPrevista', 'status', 'actions'];

  constructor(
    private loanService: EmprestimoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.listar().subscribe({
      next: (data) => this.loans = data,
      error: (err) => console.error('Erro ao listar empréstimos', err)
    });
  }

  isLate(loan: Emprestimo): boolean {
    if (loan.statusEmp === 'ATRASADO') return true;
    if (loan.statusEmp === 'ATIVO' && loan.dataDevolucaoPrevistaEmp) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Assuming format is yyyy-MM-dd or ISO. If it's dd/MM/yyyy need parsing.
      // Backend usually sends ISO.
      const dueDate = new Date(loan.dataDevolucaoPrevistaEmp);
      dueDate.setHours(0, 0, 0, 0);

      // If due date is invalid, assume not late or handle error
      if (isNaN(dueDate.getTime())) return false;

      return today > dueDate;
    }
    return false;
  }

  getDisplayStatus(loan: Emprestimo): string {
    if (this.isLate(loan) && loan.statusEmp !== 'CONCLUIDO') return 'ATRASADO';
    return loan.statusEmp || '';
  }

  getStatusClass(loan: Emprestimo): string {
    const status = this.getDisplayStatus(loan);
    switch (status) {
      case 'ATIVO': return 'bg-success';
      case 'ATRASADO': return 'bg-danger';
      case 'CONCLUIDO': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  renovar(loan: Emprestimo) {
    if (loan.idEmp) {
      this.loanService.renovar(loan.idEmp).subscribe({
        next: () => {
          this.snackBar.open('Empréstimo renovado com sucesso!', 'Fechar', { duration: 3000 });
          this.loadLoans();
        },
        error: () => this.snackBar.open('Erro ao renovar empréstimo.', 'Fechar', { duration: 3000 })
      });
    }
  }

  devolver(loan: Emprestimo) {
    if (loan.idEmp) {
      this.loanService.devolver(loan.idEmp).subscribe({
        next: () => {
          this.snackBar.open('Livro devolvido com sucesso!', 'Fechar', { duration: 3000 });
          this.loadLoans();
        },
        error: () => this.snackBar.open('Erro ao devolver livro.', 'Fechar', { duration: 3000 })
      });
    }
  }
}
