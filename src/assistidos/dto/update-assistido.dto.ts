import { PartialType } from '@nestjs/swagger';
import { CreateAssistidoDto } from './create-assistido.dto';

export class UpdateAssistidoDto extends PartialType(CreateAssistidoDto) {}