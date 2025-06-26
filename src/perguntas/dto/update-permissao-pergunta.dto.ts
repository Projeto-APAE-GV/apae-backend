import { PartialType } from '@nestjs/swagger';
import { CreatePermissaoPerguntaDto } from './create-permissao-pergunta.dto';

export class UpdatePermissaoPerguntaDto extends PartialType(CreatePermissaoPerguntaDto) {}