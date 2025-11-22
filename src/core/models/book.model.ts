export interface Livro {
    id?: number;
    titulo: string;
    autor: string;
    isbn: string;
    dataPublicacao?: string;
    categoria?: string;
    quantidadeExemplares?: number;
    ativo?: boolean;
}

export interface LivroDTO {
    titulo: string;
    autor: string;
    isbn: string;
    dataPublicacao?: string;
    categoria?: string;
    quantidadeExemplares?: number;
}
