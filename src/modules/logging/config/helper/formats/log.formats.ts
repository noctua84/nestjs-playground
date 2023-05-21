import { format } from 'winston';
import { Format, FormatWrap } from 'logform';

const { combine, timestamp, json, errors, colorize, prettyPrint, printf } =
  format;

/**
 * This format is the default format for logs.
 * It uses the JSON format.
 */
export const logFormat: Format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  json(),
);

/**
 * This format is used for console logs.
 * It logs the timestamp, the error stack trace, uses colors and pretty prints the log.
 */
export const consoleLogFormat: Format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  colorize({ colors: { info: 'green', error: 'red', warn: 'yellow' } }),
  prettyPrint({ colorize: true }),
);

/**
 * This format is used for Sentry logs.
 * It follows the Sentry format.
 */
export const sentryFormat: FormatWrap = format((info) => {
  const { path, label, ...extra } = info;

  return {
    ...extra,
    tags: {
      path: path || 'unknown',
      request_id: label,
    },
  };
});

/**
 * This format is used for access logs.
 * It follows the Apache Common Log Format.
 * In addition, it also logs the session ID and response time.
 */
export const accessLogFormat: Format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
  printf((info): string => {
    const {
      timestamp,
      ip,
      user,
      method,
      url,
      httpVersion,
      status,
      contentLength,
      referrer,
      userAgent,
      responseTime,
      session,
    } = info;

    return `${ip} - ${user} [${timestamp}] "${method} ${url} HTTP/${httpVersion}" ${status} ${contentLength} "${referrer}" "${userAgent}", Session: ${session}, Duration: ${responseTime}ms`;
  }),
);
