import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';

export const LIBRARY_ROUTES: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: BookFormComponent },
    { path: 'books/edit/:id', component: BookFormComponent },
    { path: 'loans', component: LoanListComponent },
    { path: 'loans/new', component: LoanFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/profile', component: UserFormComponent }, // Nova rota
    { path: 'authors', component: AuthorListComponent },
    { path: 'authors/new', component: AuthorFormComponent },
    { path: 'authors/edit/:id', component: AuthorFormComponent }
];
