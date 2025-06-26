import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateRespostaDto {
  @ApiProperty()
  @IsInt()
  id_assistido: number;

  @ApiProperty()
  @IsInt()
  id_pergunta: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  resposta_texto?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  resposta_numero?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  resposta_data?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  resposta_boolean?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nome_arquivo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  caminho_arquivo?: string;
}