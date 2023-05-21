import { mongodbUri } from '../common/helper/database/database.helper';

export default function appConfig() {
  return {
    app: {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      description: process.env.npm_package_description,
      host: process.env.HOST,
      port: process.env.PORT,
    },
    logging: {
      global: {
        level: process.env.LOGGING_GLOBAL_LEVEL,
        time_format: process.env.LOGGING_GLOBAL_TIME_FORMAT,
        colorize: process.env.LOGGING_GLOBAL_COLORIZE,
        pretty_print: process.env.LOGGING_GLOBAL_PRETTYPRINT,
      },
      console: {
        enable: process.env.LOGGING_CONSOLE_ENABLE,
        level: process.env.LOGGING_CONSOLE_LEVEL,
      },
      server: {
        level: process.env.LOGGING_SERVER_LEVEL,
        collection: process.env.LOGGING_SERVER_COLLECTION,
        file: process.env.LOGGING_SERVER_FILE,
        store_host: process.env.LOGGING_SERVER_STORE_HOST,
      },
      crash: {
        enable: process.env.LOGGING_CRASH_ENABLE,
        level: process.env.LOGGING_CRASH_LEVEL,
        collection: process.env.LOGGING_CRASH_COLLECTION,
        file: process.env.LOGGING_CRASH_FILE,
        store_host: process.env.LOGGING_CRASH_STORE_HOST,
      },
      rejection: {
        enable: process.env.LOGGING_REJECTION_ENABLE,
        level: process.env.LOGGING_REJECTION_LEVEL,
        collection: process.env.LOGGING_REJECTION_COLLECTION,
        file: process.env.LOGGING_REJECTION_FILE,
        store_host: process.env.LOGGING_REJECTION_STORE_HOST,
      },
      access: {
        level: process.env.LOGGING_ACCESS_LEVEL,
        collection: process.env.LOGGING_ACCESS_COLLECTION,
        file: process.env.LOGGING_ACCESS_FILE,
        store_host: process.env.LOGGING_ACCESS_STORE_HOST,
      },
      transports: {
        sentry: {
          enable: process.env.LOGGING_TRANSPORTS_SENTRY_ENABLE,
        },
        mongodb: {
          enable: process.env.LOGGING_TRANSPORTS_MONGODB_ENABLE,
        },
      },
    },
    database: {
      mongodb: {
        enable: process.env.DATABASE_MONGODB_ENABLE,
        uri: mongodbUri(
          process.env.MONGODB_HOST,
          parseInt(process.env.MONGODB_PORT, 10),
          process.env.MONGODB_DATABASE,
          process.env.MONGODB_USER,
          process.env.MONGODB_PASSWORD,
        ),
      },
      postgres: {
        enable: process.env.POSTGRES_ENABLE,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
      },
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
      sample_rate: process.env.SENTRY_SAMPLE_RATE,
      max_breadcrumbs: parseInt(process.env.SENTRY_MAX_BREADCRUMBS),
      debug: process.env.SENTRY_DEBUG,
      environment: process.env.NODE_ENV,
      server_name: process.env.npm_package_name,
      release: process.env.npm_package_version,
      log_level: process.env.SENTRY_LOG_LEVEL,
    },
  };
}
