import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, DadosUsuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject('ENV') private env: any) {
        this.apiUrl = `${this.env.apiUrl}/usuarios`;
        console.log('- user.service.ts')
    }

    findAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    findById(id: number): Observable<DadosUsuario> {
        return this.http.get<DadosUsuario>(`${this.apiUrl}/${id}`);
    }

    create(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/registrar`, usuario);
    }

    update(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
