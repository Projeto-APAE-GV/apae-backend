import { PartialType } from '@nestjs/swagger';
import { CreatePermissaoPerguntaDto } from './create-permissoes.dto';

export class UpdatePermissaoPerguntaDto extends PartialType(CreatePermissaoPerguntaDto) {}