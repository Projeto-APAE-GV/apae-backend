import {
    PipeTransform,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  import { ZodSchema } from 'zod';
  
  @Injectable()
  export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema<any>) {}
  
    transform(value: any) {
      const result = this.schema.safeParse(value);
      if (!result.success) {
        throw new BadRequestException({
          message: 'Erro de validação',
          error: result.error.errors.map((e) => ({
            campo: e.path.join('.'),
            mensagem: e.message,
          })),
        });
      }
      return result.data;
    }
  }
  