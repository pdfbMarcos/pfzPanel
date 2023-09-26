import create from "./http-service";

export interface Document {
  nome: string;
  matricula: string;
  status: string;
  situacao: string;
  data_envio: string;
  data_assinatura: string;
  documento: string;
  id_recebimento: string;
  email: string;
  territorio: string;
  data_situacao: string;
  envelope_id: string;
  inconsistencia: string;
}

export default create("/documents");
