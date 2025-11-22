import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { UserListComponent } from './user-list/user-list.component';

export const LIBRARY_ROUTES: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: BookFormComponent },
    { path: 'books/edit/:id', component: BookFormComponent },
    { path: 'loans', component: LoanListComponent },
    { path: 'users', component: UserListComponent }
];
