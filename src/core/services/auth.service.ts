import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DadosAutenticacao, DadosToken } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';

    constructor(private http: HttpClient, @Inject('ENV') private env: any) { }

    login(dados: DadosAutenticacao): Observable<DadosToken> {
        return this.http.post<DadosToken>(`${this.env.apiUrl}/login`, dados).pipe(
            tap(response => this.setToken(response.token))
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
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
}
