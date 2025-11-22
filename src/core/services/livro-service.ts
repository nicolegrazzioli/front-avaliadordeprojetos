import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  // endpoint Java: @RequestMapping("/livros")
  private readonly API_URL = `${env.apiUrl}/livros`;

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Livro[]> {
    // Java: @GetMapping 
    return this.httpClient.get<Livro[]>(this.API_URL);
  }

  listarTodos(): Observable<Livro[]> {
    // Java: @GetMapping("/all")
    return this.httpClient.get<Livro[]>(`${this.API_URL}/all`);
  }

  buscarPorId(id: number): Observable<Livro[]> {
    // Java: @GetMapping("/{id}")
    return this.httpClient.get<Livro[]>(`${this.API_URL}/${id}`);
  }

  salvar(livro: Livro): Observable<Livro> {
    // Java: @PostMapping("/registrar") 
    // objeto livro tem que ter um array com os IDs dos autores (livroDTO)
    return this.httpClient.post<Livro>(`${this.API_URL}/registrar`, livro);
  }

  atualizar(livro: Livro): Observable<Livro> {
    // Java: @PutMapping("/{id}") 
    return this.httpClient.put<Livro>(`${this.API_URL}/${livro.idLiv}`, livro);
  }

  excluir(id: number): Observable<void> {
    // Java: @DeleteMapping("/{id}") 
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}