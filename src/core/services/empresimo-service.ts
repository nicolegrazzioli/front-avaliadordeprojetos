import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  // endpoint Java: @RequestMapping("/emprestimos") -- url base
  private readonly API_URL = `${env.apiUrl}/emprestimos`;

  constructor(private httpClient: HttpClient) { } //para requisições HTTP

  buscarPorId(id: number): Observable<Emprestimo> {
    // Java: @GetMapping("/{id}")
    return this.httpClient.get<Emprestimo>(`${this.API_URL}/${id}`);
  }

  listar(): Observable<Emprestimo[]> {
    // Java: @GetMapping 
    return this.httpClient.get<Emprestimo[]>(this.API_URL);
  }

  // java espera um emprestimoDTO com idLivro e idUsuario
  registrar(idLivro: number, idUsuario: number): Observable<Emprestimo> {
    // Java: @PostMapping("/registrar") 
    const dto = {
      livroEmp: idLivro,
      usuarioEmp: idUsuario
    };
    return this.httpClient.post<Emprestimo>(`${this.API_URL}/registrar`, dto);
  }

  devolver(id: number): Observable<Emprestimo> {
    // Java: @PutMapping("/{id}") 
    return this.httpClient.put<Emprestimo>(`${this.API_URL}/${id}/devolver`, {/*corpo vazio*/ });
  }

  renovar(id: number): Observable<Emprestimo> {
    // Java: @PutMapping("/{id}/renovar") 
    return this.httpClient.put<Emprestimo>(`${this.API_URL}/${id}/renovar`, {});
  }
}