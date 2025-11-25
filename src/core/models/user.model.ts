export interface Usuario {
  idUs?: number;  
  nomeUs: string;
  emailUs: string;
  senhaUs?: string; // senha opcional pq quando lista usuario nao mostra a senha
  ativoUs?: boolean;
  permissao?: string; // 'ROLE_ADMIN' ou 'ROLE_USUARIO'
}

// DadosUsuario.java
export interface DadosUsuario {
  id: number;
  email: string;
  permissao: string;
}