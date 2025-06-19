import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';

@Controller('assistidos')
export class AssistidosController {
  constructor(private readonly assistidosService: AssistidosService) {}

  @Post()
  create(@Body() createAssistidoDto: CreateAssistidoDto) {
    return this.assistidosService.create(createAssistidoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assistidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAssistidoDto: UpdateAssistidoDto) {
    return this.assistidosService.update(id, updateAssistidoDto);
  }
}