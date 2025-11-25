// livro + livroDTO

import { Autor } from './author.model';

export interface Livro {
  idLiv?: number;
  tituloLiv: string;
  isbnLiv: string;
  anoPublicacaoLiv: number;
  disponivelLiv?: boolean;
  ativoLiv?: boolean;
  autores?: Autor[]; // GET -- objetos Autor
  autoresIds?: number[]; // POST / PUT -- IDs
}