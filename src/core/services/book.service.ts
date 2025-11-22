import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, LivroDTO } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject('ENV') private env: any) {
        this.apiUrl = `${this.env.apiUrl}/livros`;
    }

    findAll(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.apiUrl);
    }

    findById(id: number): Observable<Livro> {
        return this.http.get<Livro>(`${this.apiUrl}/${id}`);
    }

    create(livro: LivroDTO): Observable<Livro> {
        return this.http.post<Livro>(`${this.apiUrl}/registrar`, livro);
    }

    update(id: number, livro: LivroDTO): Observable<Livro> {
        return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
