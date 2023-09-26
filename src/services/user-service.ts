import create from "./http-service";

export interface User {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  perfil: string;
  emSessao: number;
}

export default create("/users");
