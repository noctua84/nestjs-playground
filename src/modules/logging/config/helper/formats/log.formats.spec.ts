import {
  accessLogFormat,
  consoleLogFormat,
  logFormat,
  sentryFormat,
} from './log.formats';
import { Format, FormatWrap } from 'logform';

describe('logFormat', () => {
  let formatter: Format;

  beforeEach(() => {
    formatter = logFormat;
  });

  it('should be an instance of Format and have the properties transform and Format', () => {
    expect(formatter).toBeDefined();
    expect(formatter).toHaveProperty('transform');
    expect(formatter).toHaveProperty('Format');
  });

  it('should include a timestamp and JSON formatting', () => {
    const info = { message: 'Test message', level: 'info' };
    const formattedInfo = formatter.transform(info, {});
    expect(formattedInfo).toHaveProperty('timestamp');
    expect(formattedInfo).toHaveProperty('message', 'Test message');
  });
});

describe('consoleLogFormat', () => {
  let logFormat: Format;

  beforeEach(() => {
    logFormat = consoleLogFormat;
  });

  it('should be an instance of Format and have the properties transform and Format', () => {
    expect(logFormat).toBeDefined();
    expect(logFormat).toHaveProperty('transform');
    expect(logFormat).toHaveProperty('Format');
  });
});

describe('sentryFormat', () => {
  let formatter: FormatWrap;

  beforeEach(() => {
    formatter = sentryFormat;
  });

  it('should be defined with necessary properties', () => {
    expect(formatter).toBeDefined();
    expect(formatter).toHaveProperty('Format');
  });
});

describe('accessLogFormat', () => {
  let formatter: Format;

  beforeEach(() => {
    formatter = accessLogFormat;
  });

  it('should be an instance of Format and have the properties transform and Format', () => {
    expect(formatter).toBeDefined();
    expect(formatter).toHaveProperty('transform');
    expect(formatter).toHaveProperty('Format');
  });

  it('should format log messages correctly', () => {
    const message =
      '192.168.0.1 - john [2023-05-10 12:34:56 +0000] "GET /test HTTP/1.1" 200 123 "https://example.com" "Mozilla/5.0", Session: abc123, Duration: 45ms';

    const formattedLog = formatter.transform(
      { message: message, level: 'info' },
      {},
    );
    expect(formattedLog).toHaveProperty('message', message);
    expect(formattedLog).toHaveProperty('timestamp');
  });
});
