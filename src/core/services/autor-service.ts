import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/environment'; 
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  // endpoint Java: @RequestMapping("/autores")
  private readonly API_URL = `${env.apiUrl}/autores`;

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Autor[]> {
    // Java: @GetMapping 
    return this.httpClient.get<Autor[]>(this.API_URL);
  }

  salvar(autor: Autor): Observable<Autor> {
    // Java: @PostMapping("/registrar") 
    return this.httpClient.post<Autor>(`${this.API_URL}/registrar`, autor);
  }

  atualizar(autor: Autor): Observable<Autor> {
    // Java: @PutMapping("/{id}") 
    return this.httpClient.put<Autor>(`${this.API_URL}/${autor.idAut}`, autor);
  }

  excluir(id: number): Observable<void> {
    // Java: @DeleteMapping("/{id}") 
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}