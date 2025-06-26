import {Controller,Get,Post,Patch,Delete,Body,Param,ParseIntPipe,UseGuards,Req,} from '@nestjs/common';
import { AssistidosService } from './assistidos.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';


@Controller('assistidos')
export class AssistidosController {
  constructor(private readonly svc: AssistidosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'secretaria', 'psicologa')
  async create(@Body() dto: CreateAssistidoDto) {
    return this.svc.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssistidoDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  @Get(':id/perguntas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'secretaria', 'psicologa', 'assistente')
  async getPerguntas(
    @Param('id', ParseIntPipe) id: number,
  ) {
  }
}