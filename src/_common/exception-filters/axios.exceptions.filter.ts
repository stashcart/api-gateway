import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch()
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError) {
    if (error.isAxiosError) {
      throw new HttpException(
        error.response?.data ?? 'Unexpected error during request to service',
        Number(error.response?.status) || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
