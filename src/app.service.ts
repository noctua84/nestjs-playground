import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // This method is used to test Sentry.
  getSentryTest(): string {
    // TODO: This needs to be implemented to test Sentry.
    return 'Sentry tested successfully!';
  }
}
