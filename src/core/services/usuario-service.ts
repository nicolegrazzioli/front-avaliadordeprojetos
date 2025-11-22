import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // endpoint Java: @RequestMapping("/usuarios")
  private readonly API_URL = `${env.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient) { }

  listarAtivos(): Observable<Usuario[]> {
    // Java: @GetMapping 
    return this.httpClient.get<Usuario[]>(this.API_URL);
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