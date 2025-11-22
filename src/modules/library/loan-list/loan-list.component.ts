import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loan-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid">
      <h2>Empréstimos</h2>
      <p>Funcionalidade de empréstimos será implementada aqui.</p>
    </div>
  `
})
export class LoanListComponent { }
