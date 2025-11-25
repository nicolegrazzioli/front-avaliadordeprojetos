import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // endpoint Java: @RequestMapping("/usuarios")
  private readonly API_URL = `${env.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {
    console.log('- usuario-service.ts')
  }

  listarAtivos(): Observable<Usuario[]> {
    // Java: @GetMapping 
    return this.httpClient.get<any[]>(this.API_URL).pipe(
      map(users => users.map(u => ({
        idUs: u.id,
        nomeUs: u.nome || u.email, // Fallback to email if name is missing
        emailUs: u.email,
        permissao: u.permissao,
        ativoUs: true
      })))
    );
  }

  getUsuarioById(id: number): Observable<Usuario[]> {
    // Java: @GetMapping("/{id}")
    return this.httpClient.get<Usuario[]>(`${this.API_URL}/${id}`);
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    // Java: @PostMapping("/registrar") 
    return this.httpClient.post<Usuario>(`${this.API_URL}/registrar`, usuario);
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    // Java: @PutMapping("/{id}") 
    return this.httpClient.put<Usuario>(`${this.API_URL}/${usuario.idUs}`, usuario);
  }

  excluir(id: number): Observable<void> {
    // Java: @DeleteMapping("/{id}") 
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}