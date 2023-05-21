import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const expectedResult = 'Hello World!';
      expect(appService.getHello()).toEqual(expectedResult);
    });
  });

  describe('getSentryTest', () => {
    it('should return "Sentry tested successfully!"', () => {
      const expectedResult = 'Sentry tested successfully!';
      expect(appService.getSentryTest()).toEqual(expectedResult);
    });
  });
});
