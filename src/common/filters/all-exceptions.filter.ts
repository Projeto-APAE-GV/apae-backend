import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Erro interno no servidor';
    let detail: string | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseData = exception.getResponse();
      message = typeof responseData === 'string' ? responseData : (responseData as any).message;
      detail = (responseData as any).error || null;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;

      switch (exception.code) {
        case 'P2002':
          message = 'Um registro com esse campo já existe';
          if (Array.isArray(exception.meta?.target)) {
            detail = (exception.meta.target as string[]).join(', ');
          } else if (typeof exception.meta?.target === 'string') {
            detail = exception.meta.target;
          } else {
            detail = 'Campo desconhecido'; 
          }
          break;
        case 'P2003':
          message = 'Erro de chave estrangeira - registro relacionado não encontrado';
          detail = (exception.meta?.field_name as string) || 'Campo relacionado';
          break;
        case 'P2025':
          message = 'Registro não encontrado';
          detail = exception.message;
          break;
        case 'P2014':
          message = 'Erro de relacionamento - operação não permitida';
          detail = exception.message;
          break;
        case 'P2015':
          message = 'Registro relacionado não encontrado';
          detail = exception.message;
          break;
        case 'P2016':
          message = 'Erro de interpretação de consulta';
          detail = exception.message;
          break;
        case 'P2017':
          message = 'Erro de relacionamento entre registros';
          detail = exception.message;
          break;
        case 'P2018':
          message = 'Registro conectado não encontrado';
          detail = exception.message;
          break;
        case 'P2019':
          message = 'Erro de entrada inválida';
          detail = exception.message;
          break;
        case 'P2020':
          message = 'Valor fora do intervalo permitido';
          detail = exception.message;
          break;
        case 'P2021':
          message = 'Tabela não existe no banco de dados';
          detail = exception.message;
          break;
        case 'P2022':
          message = 'Coluna não existe na tabela';
          detail = exception.message;
          break;
        case 'P2023':
          message = 'Erro de tipo de dados na coluna';
          detail = exception.message;
          break;
        case 'P2024':
          message = 'Timeout na conexão com o banco de dados';
          detail = exception.message;
          break;
        case 'P2026':
          message = 'Versão do banco de dados não suportada';
          detail = exception.message;
          break;
        case 'P2027':
          message = 'Múltiplos erros ocorreram durante a execução';
          detail = exception.message;
          break;
        default:
          message = 'Erro de banco de dados';
          detail = exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Dados inválidos fornecidos';
      
      const errorMessage = exception.message;
      if (errorMessage.includes('Invalid value for argument')) {
        const match = errorMessage.match(/Invalid value for argument `([^`]+)`:(.+)/);
        if (match) {
          const fieldName = match[1];
          const fieldError = match[2].trim();
          detail = `Campo '${fieldName}': ${fieldError}`;
        } else {
          detail = errorMessage;
        }
      } else if (errorMessage.includes('Unknown argument')) {
        const match = errorMessage.match(/Unknown argument `([^`]+)`/);
        if (match) {
          detail = `Argumento desconhecido: ${match[1]}`;
        } else {
          detail = errorMessage;
        }
      } else if (errorMessage.includes('Missing a required value')) {
        const match = errorMessage.match(/Missing a required value at `([^`]+)`/);
        if (match) {
          detail = `Campo obrigatório ausente: ${match[1]}`;
        } else {
          detail = errorMessage;
        }
      } else {
        detail = errorMessage;
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro desconhecido do banco de dados';
      detail = exception.message;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro de inicialização do banco de dados';
      detail = exception.message;
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro crítico do banco de dados';
      detail = exception.message;
    } else if (exception instanceof TypeError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro de tipo de dados';
      detail = exception.message;
    } else if (exception instanceof SyntaxError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro de sintaxe';
      detail = exception.message;
    } else if (exception instanceof ReferenceError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro de referência';
      detail = exception.message;
    } else if (exception instanceof RangeError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Valor fora do intervalo permitido';
      detail = exception.message;
    } else if (exception instanceof Error) {

      const errorMessage = exception.message.toLowerCase();
      
      if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Dados inválidos';
      } else if (errorMessage.includes('not found') || errorMessage.includes('não encontrado')) {
        status = HttpStatus.NOT_FOUND;
        message = 'Recurso não encontrado';
      } else if (errorMessage.includes('unauthorized') || errorMessage.includes('não autorizado')) {
        status = HttpStatus.UNAUTHORIZED;
        message = 'Não autorizado';
      } else if (errorMessage.includes('forbidden') || errorMessage.includes('proibido')) {
        status = HttpStatus.FORBIDDEN;
        message = 'Acesso negado';
      } else if (errorMessage.includes('timeout') || errorMessage.includes('timeout')) {
        status = HttpStatus.REQUEST_TIMEOUT;
        message = 'Timeout na requisição';
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Erro interno no servidor';
      }
      
      detail = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      detail,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}