import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('constructor', () => {
    it('app controller should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('app service should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('sentry-test', () => {
    it('should throw an exception in development mode', () => {
      process.env.NODE_ENV = 'development';
      expect(() => appController.getSentryTest()).toThrow('Sentry test error');
    });

    it('should return a message in non-development mode', () => {
      process.env.NODE_ENV = 'production';
      expect(appController.getSentryTest()).toBe(
        'Sentry test endpoint is only available in development mode',
      );
    });
  });
});
