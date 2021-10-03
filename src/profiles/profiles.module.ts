import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfilesResolver } from './profiles.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('PROFILE_SERVICE_API'),
      }),
    }),
  ],
  providers: [ProfilesResolver],
})
export class ProfilesModule {}
