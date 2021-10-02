import { HttpService } from '@nestjs/axios';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { map } from 'rxjs';
import { LoginArgs } from './args/login.args';
import { RegisterInput } from './inputs/register.input';
import { AuthResponse } from './models/auth-response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => AuthResponse)
  login(@Args() loginArgs: LoginArgs) {
    return this.httpService
      .post('/auth/login', loginArgs)
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => AuthResponse)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.httpService
      .post('/auth/register', registerInput)
      .pipe(map(({ data }) => data));
  }
}
