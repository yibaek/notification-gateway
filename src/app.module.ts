import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvUtil } from './util/env.util';
import { CommonModule } from './common/common.module';
import { GatewayModule } from './gateway/gateway.module';
import commonConfig from './config/common.config';
import gcpConfig from './config/gcp.config';
import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
import { join } from 'path';
import { HttpRequestMiddleware } from './common/middleware/http-request.middleware';
import { ProvidersModule } from './provider/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: EnvUtil.getEnvPath(),
      load: [commonConfig, gcpConfig],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ko-KR',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, '..', 'public', '/i18n/'),
        watch: true,
      },
      logging: false,
      resolvers: [AcceptLanguageResolver],
    }),
    CommonModule,
    ProvidersModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HttpRequestMiddleware).forRoutes('*');
  }
}
