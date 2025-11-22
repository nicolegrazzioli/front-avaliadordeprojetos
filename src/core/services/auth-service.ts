import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from '../../environment/environment';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // constantes para salvar no navegador
  private readonly TOKEN_KEY = 'auth_token';
  // url: http://localhost:8080/biblioteca3.0/login
  private readonly API_URL = `${env.apiUrl}/login`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  //recebe email e senha do formulario
  login(email: string, senha: string): Observable<any> {
    // java: {"login":"email@ahfuisehlgi","senha":"123"}
    const payload = { login: email, senha: senha };
    return this.httpClient.post<any>(this.API_URL, payload).pipe(
      //executa ação escondida
      tap(response => {
        //response eh o objeto DadosToken do java
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // gerenciar token
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // verifica se o usuario esta logado (token salvo)
  isLogged(): boolean {
    const token = this.getToken();
    return !!token; //retorna true se tiver token, se nao false
  }

  //ler dados do usuario
  getUser(): Usuario | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      //2a parte do token
      const payloadBase64 = token.split('.')[1];
      //decodifica base64 para string json
      const payloadJson = atob(payloadBase64);
      //trandorma em objeto javascript
      const decoded = JSON.parse(payloadJson);

      //mapeia dados do token para model usuario
      //JWT colcoa email no sub e permissao em ROLE
      return {
        emailUs: decoded.sub, //sujeito (login/email)
        permissao: decoded.ROLE?.[0] || decoded.ROLE, //permissao, java manda lista de ROLEs
        nomeUs: decoded.sub //nao tem nome no token, entao usa email
      } as Usuario;

    } catch (e) {
      console.error('Erro ao decodificar o token JWT:', e);
      return null;
    }
  }

  // private userFromToken(token: string): Usuario | null {
  //   try {
  //     const payload = token.split('.')[1];
  //     if (!payload) return null;
  //     const decoded = JSON.parse(atob(payload));
  //     console.log('Decoded JWT payload:', decoded);
  //     return {
  //       id: decoded.sub ?? undefined,
  //       email: decoded.sub ?? undefined,
  //       role: decoded.ROLE ?? undefined
  //     } as Usuario;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // redirect() {
  //   this.route.queryParams.subscribe(params => {
  //     const returnUrl = params['returnUrl'] || '/home';
  //     this.router.navigateByUrl(returnUrl);
  //   });
  // }
}
