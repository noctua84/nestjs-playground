import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: configService.get('sentry.dsn'),
      tracesSampleRate: configService.get('sentry.sample_rate'),
      debug: configService.get('sentry.debug'),
      environment: configService.get('sentry.environment'),
      release: configService.get('sentry.release'),
      serverName: configService.get('sentry.server_name'),
      maxBreadcrumbs: configService.get('sentry.max_breadcrumbs'),
    });
  }

  const port = configService.get('app.port');

  await app.listen(port);
}
bootstrap()
  .then(() => console.log('Application started'))
  .catch((err) => console.log(err));
