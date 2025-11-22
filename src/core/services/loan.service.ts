import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/loan.model';

@Injectable({
    providedIn: 'root'
})
export class LoanService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject('ENV') private env: any) {
        this.apiUrl = `${this.env.apiUrl}/emprestimos`;
    }

    renovar(id: number): Observable<Emprestimo> {
        return this.http.put<Emprestimo>(`${this.apiUrl}/${id}/renovar`, {});
    }

    devolver(id: number): Observable<Emprestimo> {
        return this.http.put<Emprestimo>(`${this.apiUrl}/${id}/devolver`, {});
    }
}
