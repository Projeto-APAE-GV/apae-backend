import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissoesPerguntaService } from './permissoes-pergunta.service';
import { CreatePermissaoPerguntaDto } from './dto/create-permissoes.dto';
import { UpdatePermissaoPerguntaDto } from './dto/update-permissoes.dto';

@Controller('permissoes-pergunta')
export class PermissoesPerguntaController {
  constructor(
    private readonly permissoesPerguntaService: PermissoesPerguntaService,
  ) {}

  @Post()
  create(@Body() createPermissaoPerguntaDto: CreatePermissaoPerguntaDto) {
    return this.permissoesPerguntaService.create(createPermissaoPerguntaDto);
  }

  @Get()
  findAll() {
    return this.permissoesPerguntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permissoesPerguntaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePermissaoPerguntaDto: UpdatePermissaoPerguntaDto,
  ) {
    return this.permissoesPerguntaService.update(id, updatePermissaoPerguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.permissoesPerguntaService.remove(id);
  }
}