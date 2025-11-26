import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/loan.model';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  // endpoint Java: @RequestMapping("/emprestimos") -- url base
  private readonly API_URL = `${env.apiUrl}/emprestimos`;

  constructor(private httpClient: HttpClient) { }

  buscarPorId(id: number): Observable<Emprestimo> {
    return this.httpClient.get<Emprestimo>(`${this.API_URL}/${id}`);
  }

  listar(): Observable<Emprestimo[]> {
    // Backend filters by token user automatically
    return this.httpClient.get<Emprestimo[]>(this.API_URL);
  }

  registrar(idLivro: number, idUsuario: number): Observable<Emprestimo> {
    const dto = {
      livroEmp: idLivro,
      usuarioEmp: idUsuario
    };
    return this.httpClient.post<Emprestimo>(`${this.API_URL}/registrar`, dto);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.httpClient.put<Emprestimo>(`${this.API_URL}/${id}/devolver`, {});
  }

  renovar(id: number): Observable<Emprestimo> {
    return this.httpClient.put<Emprestimo>(`${this.API_URL}/${id}/renovar`, {});
  }
}