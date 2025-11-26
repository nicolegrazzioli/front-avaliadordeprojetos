import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container"> 
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="(isHandset$ | async) === false">
        <mat-toolbar>Olá, {{ userName }}</mat-toolbar>
          <mat-nav-list>
          <a mat-list-item routerLink="/library/authors">Autores</a>
          <a mat-list-item routerLink="/library/books">Livros</a>
          <a mat-list-item routerLink="/library/loans">Empréstimos</a>
          <a mat-list-item routerLink="/library/users" *ngIf="isAdmin">Usuários</a>
          <a mat-list-item routerLink="/library/users/profile">Meu Perfil</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button type="button" aria-label="Toggle sidenav" mat-icon-button (click)="drawer.toggle()" *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span>Biblioteca 4.0</span>
          <span class="spacer"></span>
          <button mat-button (click)="logout()">Sair</button>
        </mat-toolbar>
        <div class="content p-4">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }
    .sidenav {
      width: 280px;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class LayoutComponent {
  isHandset$ = new Promise<boolean>(resolve => resolve(false));
  userName: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getUser();
    this.userName = user ? user.nomeUs : 'Visitante';
    this.isAdmin = user ? user.permissao === 'ROLE_ADMIN' : false;
    // this.isAdmin = user?.permissao === 'ROLE_ADMIN';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
