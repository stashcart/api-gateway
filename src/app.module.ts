import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './_common/strategies/jwt.strategy';
import { ProfilesModule } from './profiles/profiles.module';
import { CartsModule } from './carts/carts.module';
import { StoresModule } from './stores/stores.module';
import { AxiosExceptionFilter } from './_common/exception-filters/axios.exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    ProfilesModule,
    CartsModule,
    StoresModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: AxiosExceptionFilter,
    },
  ],
})
export class AppModule {}
