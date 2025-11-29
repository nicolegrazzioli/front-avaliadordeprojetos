import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario, DadosUsuario, DadosUsuarioCompleto, UpdatePermissionDTO, UpdateProfileDTO, RegisterDTO } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject('ENV') private env: any) {
        this.apiUrl = `${this.env.apiUrl}/usuarios`;
        console.log('- user.service.ts')
    }

    findAll(): Observable<DadosUsuario[]> {
        return this.http.get<DadosUsuario[]>(this.apiUrl);
    }

    findAllComplete(): Observable<DadosUsuarioCompleto[]> {
        return this.http.get<DadosUsuarioCompleto[]>(`${this.apiUrl}/complete`);
    }

    findAllActive(): Observable<Usuario[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(users => users.map(u => ({
                idUs: u.id,
                nomeUs: u.nome || u.email, // Garante que tenha algo para exibir no dropdown
                emailUs: u.email,
                permissao: u.permissao,
                ativoUs: true
            })))
        );
    }

    findById(id: number): Observable<DadosUsuarioCompleto> {
        return this.http.get<DadosUsuarioCompleto>(`${this.apiUrl}/${id}`);
    }

    create(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/registrar`, usuario);
    }

    update(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    updatePermission(id: number, dto: UpdatePermissionDTO): Observable<DadosUsuarioCompleto> {
        return this.http.put<DadosUsuarioCompleto>(`${this.apiUrl}/${id}/permission`, dto);
    }

    updateProfile(id: number, dto: UpdateProfileDTO): Observable<DadosUsuarioCompleto> {
        return this.http.put<DadosUsuarioCompleto>(`${this.apiUrl}/${id}/profile`, dto);
    }

    registerPublic(dto: RegisterDTO): Observable<DadosUsuario> {
        return this.http.post<DadosUsuario>(`${this.apiUrl}/registrar`, dto);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
