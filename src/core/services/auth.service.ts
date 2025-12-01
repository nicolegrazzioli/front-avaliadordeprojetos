import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { env } from '../../environment/environment';
import { DadosAutenticacao, DadosToken } from '../models/auth.model';
import { Usuario } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';
    private apiUrl = `${env.apiUrl}/login`;

    constructor(private http: HttpClient, private router: Router) {
        console.log('- auth.service.ts')
    }

    login(dados: DadosAutenticacao): Observable<DadosToken> {
        return this.http.post<DadosToken>(this.apiUrl, dados).pipe(
            tap(response => this.setToken(response.token))
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getUser(): Usuario | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const decoded = JSON.parse(payloadJson);

            return {
                emailUs: decoded.sub,
                permissao: decoded.ROLE?.[0] || decoded.ROLE,
                nomeUs: decoded.nome || decoded.sub,
                idUs: decoded.id
            } as Usuario;

        } catch (e) {
            console.error('Erro ao decodificar token:', e);
            return null;
        }
    }
}
