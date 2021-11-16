import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  verifyAccessToken(accessToken: string): Promise<string> {
    return firstValueFrom(
      this.httpService
        .post('/auth/verify', { accessToken })
        .pipe(map(({ data }) => data)),
    );
  }
}
