import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  verifyToken(authToken: string): Promise<string> {
    return firstValueFrom(
      this.httpService
        .post('/auth/verify', { authToken })
        .pipe(map(({ data }) => data)),
    );
  }
}
