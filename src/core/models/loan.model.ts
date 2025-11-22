import { Livro } from './book.model';
import { Usuario } from './user.model';

export interface Emprestimo {
    id?: number;
    livro: Livro;
    usuario: Usuario;
    dataEmprestimo: string;
    dataDevolucaoPrevista: string;
    dataDevolucaoReal?: string;
    status: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';
}
