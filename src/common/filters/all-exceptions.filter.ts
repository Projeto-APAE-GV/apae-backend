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
          message = 'Um registro com essa chave já existe';
          detail = (exception.meta?.field_name as string) || 'Campo relacionado';
          break;
        case 'P2025':
          message = 'Registro não encontrado';
          detail = exception.message;
          break;
        default:
          message = 'Erro de banco de dados';
          detail = exception.message;
      }
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