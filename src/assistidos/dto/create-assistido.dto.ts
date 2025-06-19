export class CreateAssistidoDto {
  nome: string;
  cpf?: string;
  rg?: string;
  data_nascimento?: Date;
  sexo?: 'M' | 'F' | 'Outro';
  estado_civil?: string;
  telefone?: string;
  email?: string;
  endereco_completo?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  parentesco_responsavel?: string;
  telefone_responsavel?: string;
  status_ativo?: boolean;
  observacoes_gerais?: string;
}
