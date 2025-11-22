import { Livro } from './livro';
import { Usuario } from './usuario';

export interface Emprestimo {
    id?: number;
    livro: Livro;
    usuario: Usuario;
    dataEmprestimo: string;
    dataDevolucaoPrevista: string;
    dataDevolucaoReal?: string;
    status: 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';
}
