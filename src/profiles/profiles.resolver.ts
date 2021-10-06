import { HttpService } from '@nestjs/axios';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { map } from 'rxjs';
import { JwtAuth } from 'src/_common/decorators/jwt-auth.decorator';
import { UserId } from 'src/_common/decorators/user-id.decorator';
import { onBehalfOf } from 'src/_common/utils/on-behalf-of';
import { PatchProfileInput } from './inputs/patch-profile.input';
import { Profile } from './models/profile.model';

@Resolver()
export class ProfilesResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => Profile)
  profile(@Args('id') id: string) {
    return this.httpService
      .get(`/profiles/${id}`)
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => Profile)
  @JwtAuth()
  patchProfile(
    @UserId() userId: string,
    @Args('patchProfileInput') patchProfileInput: PatchProfileInput,
  ) {
    return this.httpService
      .patch(`/profiles/${userId}`, patchProfileInput, onBehalfOf(userId))
      .pipe(map(({ data }) => data));
  }
}
