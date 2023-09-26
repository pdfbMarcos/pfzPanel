import create from "./http-service";

export interface Log {
  id: number;
  acao: string;
  mensagem: string;
  data_processamento: string;
  id_recebimento: string;
  identificador: string;
  status: string;
}

export default create("/logs");
