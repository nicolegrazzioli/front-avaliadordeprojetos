export interface Usuario {
  idUs?: number;
  nomeUs: string;
  emailUs: string;
  senhaUs?: string; // senha opcional pq quando lista usuario nao mostra a senha
  ativoUs?: boolean;
  permissao?: string; // 'ROLE_ADMIN' ou 'ROLE_USUARIO'
}

// DadosUsuario.java (original)
export interface DadosUsuario {
  id: number;
  email: string;
  permissao: string;
}

// DadosUsuarioCompleto - usado para admin ver todos os dados
export interface DadosUsuarioCompleto {
  idUs: number;
  nomeUs: string;
  emailUs: string;
  ativoUs: boolean;
  permissao: string;
}

// DTO para admin atualizar permissão/ativo de usuário
export interface UpdatePermissionDTO {
  ativoUs: boolean;
  permissao: string;
}

// DTO para usuário atualizar próprio perfil
export interface UpdateProfileDTO {
  nomeUs: string;
  emailUs: string;
  senhaUs?: string; // opcional - apenas se quiser alterar
}

// DTO para registro público
export interface RegisterDTO {
  nomeUs: string;
  emailUs: string;
  senhaUs: string;
  ativoUs?: boolean;
  permissao?: string;
}