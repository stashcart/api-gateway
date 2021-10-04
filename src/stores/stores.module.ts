import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StoresResolver } from './stores.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('CART_SERVICE_API'),
      }),
    }),
  ],
  providers: [StoresResolver],
})
export class StoresModule {}
