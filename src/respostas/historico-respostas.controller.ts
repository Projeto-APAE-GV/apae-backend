import { Controller, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { HistoricoRespostasService } from './historico-respostas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { usuarios_tipo_usuario } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HistoricoRespostaResponseDto } from './dto/historico-resposta-response.dto';

@ApiTags('Histórico de Respostas')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('historico-respostas')
export class HistoricoRespostasController {
  constructor(private svc: HistoricoRespostasService) {}

  @Get()
  @Roles(
    usuarios_tipo_usuario.admin,
    usuarios_tipo_usuario.psicologa,
    usuarios_tipo_usuario.secretaria,
    usuarios_tipo_usuario.assistente
  )
  @ApiOperation({ summary: 'Listar todo o histórico de respostas' })
  @ApiResponse({ status: 200, type: [HistoricoRespostaResponseDto] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id_resposta')
  @Roles(
    usuarios_tipo_usuario.admin,
    usuarios_tipo_usuario.psicologa,
    usuarios_tipo_usuario.secretaria,
    usuarios_tipo_usuario.assistente
  )
  @ApiOperation({ summary: 'Listar histórico de uma resposta específica' })
  @ApiParam({ name: 'id_resposta', description: 'ID da resposta' })
  @ApiResponse({ status: 200, type: [HistoricoRespostaResponseDto] })
  findByResposta(@Param('id_resposta', ParseIntPipe) id_resposta: number) {
    return this.svc.findByResposta(id_resposta);
  }
} 