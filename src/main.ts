import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: '',
    });
  }

  await app.listen(3000);
}
bootstrap()
  .then(() => console.log('Application started'))
  .catch((err) => console.log(err));
