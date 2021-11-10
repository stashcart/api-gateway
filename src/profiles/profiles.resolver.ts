import { HttpService } from '@nestjs/axios';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { map } from 'rxjs';
import { JwtAuth } from 'src/_common/decorators/jwt-auth.decorator';
import { UserId } from 'src/_common/decorators/user-id.decorator';
import { attachUserId } from 'src/_common/utils/attach-user-id';
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

  @Query(() => Profile)
  @JwtAuth()
  myProfile(@UserId() userId: string) {
    return this.httpService
      .get(`/profiles/${userId}`)
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => Profile)
  @JwtAuth()
  patchProfile(
    @UserId() userId: string,
    @Args('patchProfileInput') patchProfileInput: PatchProfileInput,
  ) {
    return this.httpService
      .patch(`/profiles/${userId}`, patchProfileInput, attachUserId(userId))
      .pipe(map(({ data }) => data));
  }
}
