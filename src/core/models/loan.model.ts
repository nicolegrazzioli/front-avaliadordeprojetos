import { Livro } from './book.model';
import { Usuario } from './user.model';

export interface Emprestimo {
  idEmp?: number; // ? (opcional) pq no front o user nao coloca id
  livroEmp?: Livro; // listar
  usuarioEmp?: Usuario; // listar
  dataEmprestimoEmp?: string;
  dataDevolucaoPrevistaEmp?: string;
  dataDevolucaoEfetivaEmp?: string;
  statusEmp?: 'ATIVO' | 'CONCLUIDO' | 'ATRASADO';

  // aux (cadastros -- POST)
  livroId?: number;
  usuarioId?: number;
}