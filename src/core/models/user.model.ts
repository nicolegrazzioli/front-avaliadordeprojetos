export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha?: string; // Optional for updates/listing
    perfil?: 'ADMIN' | 'USUARIO';
    dataCadastro?: string;
}

export interface DadosUsuario {
    id: number;
    nome: string;
    email: string;
    perfil: string;
}
