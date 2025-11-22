import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid">
      <h2>Usuários</h2>
      <p>Funcionalidade de usuários será implementada aqui.</p>
    </div>
  `
})
export class UserListComponent { }
