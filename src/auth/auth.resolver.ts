import { HttpService } from '@nestjs/axios';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { map } from 'rxjs';
import { LoginArgs } from './args/login.args';
import { GoogleAuthInput } from './inputs/google-auth.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
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

  @Mutation(() => AuthResponse)
  authWithGoogle(@Args('googleAuthInput') googleAuthInput: GoogleAuthInput) {
    return this.httpService
      .post('/auth/google', googleAuthInput)
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => AuthResponse)
  refreshTokenPair(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ) {
    return this.httpService
      .post('/auth/refresh', refreshTokenInput)
      .pipe(map(({ data }) => data));
  }
}
