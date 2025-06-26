export class CreateCategoriaDto {
  nome_categoria: string;
  descricao?: string;
  ordem_exibicao?: number;
  ativa?: boolean;
  criada_por?: number;
}