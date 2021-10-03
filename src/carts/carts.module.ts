import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartsResolver } from './carts.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('CART_SERVICE_API'),
      }),
    }),
  ],
  providers: [CartsResolver],
})
export class CartsModule {}
