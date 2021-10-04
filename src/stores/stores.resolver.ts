import { HttpService } from '@nestjs/axios';
import { Query, Resolver } from '@nestjs/graphql';
import { map } from 'rxjs';
import { Store } from './models/store.model';

@Resolver()
export class StoresResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => [Store])
  stores() {
    return this.httpService.get('/stores').pipe(map(({ data }) => data));
  }
}
